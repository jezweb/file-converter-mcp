import type { R2Bucket } from '@cloudflare/workers-types';

// R2 public URLs
const R2_PUBLIC_URLS = {
  production: 'https://pub-3418eafd6df5417cb410190a4436d31a.r2.dev',
  dev: 'https://pub-cf6f1212fb854353acb8f920bd45ff9a.r2.dev',
};

// TTL configuration (disabled by default, easy to enable later)
const ENABLE_TTL = false;
const TTL_DAYS = 90;

/**
 * Detect which R2 bucket is being used (production or dev)
 * Returns the appropriate public URL base
 */
function getR2PublicUrl(isDev: boolean): string {
  return isDev ? R2_PUBLIC_URLS.dev : R2_PUBLIC_URLS.production;
}

export interface UploadResult {
  key: string;
  publicUrl: string;
  expiresAt?: Date;
}

/**
 * Upload PDF buffer to R2 storage with public access
 * @param bucket - R2 bucket binding
 * @param buffer - PDF buffer to upload
 * @param prefix - Folder prefix in bucket (default: 'converted')
 * @param isDev - Whether using dev bucket (default: false, auto-detected from ENV)
 * @returns Object with key and public URL
 */
export async function uploadPdfToR2(
  bucket: R2Bucket,
  buffer: ArrayBuffer | Buffer,
  prefix: string = 'converted',
  isDev: boolean = false
): Promise<UploadResult> {
  // Generate unique filename
  const filename = `${Date.now()}-${crypto.randomUUID()}.pdf`;
  const key = `${prefix}/${filename}`;

  // Upload to R2
  await bucket.put(key, buffer, {
    httpMetadata: {
      contentType: 'application/pdf',
    },
    customMetadata: {
      uploadedAt: new Date().toISOString(),
      ...(ENABLE_TTL && { expiresAt: getExpirationDate().toISOString() }),
    },
  });

  // Generate public URL (use correct bucket URL)
  const baseUrl = getR2PublicUrl(isDev);
  const publicUrl = `${baseUrl}/${key}`;

  return {
    key,
    publicUrl,
    ...(ENABLE_TTL && { expiresAt: getExpirationDate() }),
  };
}

/**
 * Upload image buffer to R2 storage with public access
 * @param bucket - R2 bucket binding
 * @param buffer - Image buffer to upload
 * @param format - Image format (png, jpg, webp)
 * @param prefix - Folder prefix in bucket (default: 'converted')
 * @param isDev - Whether using dev bucket (default: false)
 * @returns Object with key and public URL
 */
export async function uploadImageToR2(
  bucket: R2Bucket,
  buffer: ArrayBuffer | Buffer,
  format: 'png' | 'jpg' | 'webp',
  prefix: string = 'converted',
  isDev: boolean = false
): Promise<UploadResult> {
  // Generate unique filename
  const filename = `${Date.now()}-${crypto.randomUUID()}.${format}`;
  const key = `${prefix}/${filename}`;

  // Map format to MIME type
  const contentTypeMap = {
    png: 'image/png',
    jpg: 'image/jpeg',
    webp: 'image/webp',
  };

  // Upload to R2
  await bucket.put(key, buffer, {
    httpMetadata: {
      contentType: contentTypeMap[format],
    },
    customMetadata: {
      uploadedAt: new Date().toISOString(),
      ...(ENABLE_TTL && { expiresAt: getExpirationDate().toISOString() }),
    },
  });

  // Generate public URL (use correct bucket URL)
  const baseUrl = getR2PublicUrl(isDev);
  const publicUrl = `${baseUrl}/${key}`;

  return {
    key,
    publicUrl,
    ...(ENABLE_TTL && { expiresAt: getExpirationDate() }),
  };
}

/**
 * Generic upload function for any file type to R2 storage
 * @param bucket - R2 bucket binding
 * @param key - Full key/path in bucket (e.g., "excel-to-json/file.json")
 * @param buffer - File buffer to upload
 * @param contentType - MIME type (e.g., "application/json")
 * @param isDev - Whether using dev bucket (default: false)
 * @returns Public URL to uploaded file
 */
export async function uploadToR2(
  bucket: R2Bucket,
  key: string,
  buffer: ArrayBuffer | Buffer | Uint8Array,
  contentType: string,
  isDev: boolean = false
): Promise<string> {
  // Upload to R2
  await bucket.put(key, buffer, {
    httpMetadata: {
      contentType,
    },
    customMetadata: {
      uploadedAt: new Date().toISOString(),
      ...(ENABLE_TTL && { expiresAt: getExpirationDate().toISOString() }),
    },
  });

  // Generate public URL (use correct bucket URL)
  const baseUrl = getR2PublicUrl(isDev);
  return `${baseUrl}/${key}`;
}

/**
 * Calculate expiration date based on TTL_DAYS
 */
function getExpirationDate(): Date {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + TTL_DAYS);
  return expiry;
}
