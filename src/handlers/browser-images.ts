import type { Bindings } from '../mcp/types';
import { pdfToImages } from '../lib/pdfco-client';
import { uploadImageToR2 } from '../lib/r2-storage';
import { officeToPdf } from './pdfco-convert';

// ============================================================================
// PDF TO IMAGES HANDLER
// ============================================================================

/**
 * Arguments for pdf_to_images tool
 */
export interface PdfToImagesArgs {
  fileUrl: string; // Publicly accessible PDF URL
  format?: 'png' | 'jpeg' | 'webp'; // Image format (default: png)
}

/**
 * Convert PDF pages to individual images (one image per page)
 *
 * IMPORTANT NOTES:
 * - Page indexing is 0-based in PDF.co API (first page = 0)
 * - Returns array of permanently stored R2 URLs
 * - PDF.co temporary URLs expire in 60 minutes (files are re-uploaded to R2)
 * - Default format is PNG for best quality
 *
 * @param args - File URL and image format
 * @param env - Worker bindings
 * @returns Array of image URLs, page count, and remaining credits
 */
export async function handlePdfToImages(
  args: PdfToImagesArgs,
  env: Bindings
): Promise<{
  imageUrls: string[];
  pageCount?: number;
  imageCount: number;
  format: string;
  warnings?: string[];
  remainingCredits?: number;
}> {
  const { fileUrl, format = 'png' } = args;

  // Validate file URL
  try {
    new URL(fileUrl);
  } catch {
    throw new Error('Invalid file URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  // Validate format
  const validFormats = ['png', 'jpeg', 'webp'];
  if (!validFormats.includes(format)) {
    throw new Error(
      `Invalid image format: ${format}. Must be one of: ${validFormats.join(', ')}`
    );
  }

  // Map format to PDF.co format (jpeg → jpg)
  const pdfcoFormat = format === 'jpeg' ? 'jpg' : format;

  // Convert PDF to images using PDF.co
  let pdfcoResponse;
  try {
    pdfcoResponse = await pdfToImages(
      {
        url: fileUrl,
        format: pdfcoFormat as 'jpg' | 'png' | 'webp',
        pages: '0-', // All pages (0-based indexing)
        renderingResolution: 150, // Higher DPI for better quality
        ...(pdfcoFormat === 'jpg' && { jpegQuality: 90 }), // High JPEG quality
        async: false,
      },
      env
    );
  } catch (error: any) {
    throw new Error(`PDF to images conversion failed: ${error.message}`);
  }

  // Check if PDF.co returned valid URLs
  if (!pdfcoResponse.urls || pdfcoResponse.urls.length === 0) {
    throw new Error(
      'PDF.co conversion succeeded but did not return image URLs. Please retry.'
    );
  }

  // Download all images from PDF.co and upload to R2
  const bucketName = (env.R2_BUCKET as any)?.name || '';
  const isDev = bucketName.includes('dev');

  const imageUrls: string[] = [];

  for (let i = 0; i < pdfcoResponse.urls.length; i++) {
    const imageUrl = pdfcoResponse.urls[i];

    // Download image from PDF.co S3
    let imageResponse: Response;
    try {
      imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        throw new Error(
          `Failed to download image ${i + 1}: HTTP ${imageResponse.status}`
        );
      }
    } catch (error: any) {
      throw new Error(
        `Failed to download image ${i + 1} from PDF.co: ${error.message}`
      );
    }

    // Get image buffer
    const imageBuffer = await imageResponse.arrayBuffer();

    // Upload to R2 with unique path
    // Map format back (jpg → jpeg for file extension consistency)
    const uploadFormat = pdfcoFormat === 'jpg' ? 'jpg' : format;
    const { publicUrl } = await uploadImageToR2(
      env.R2_BUCKET,
      imageBuffer,
      uploadFormat as 'png' | 'jpg' | 'webp',
      `pdf-to-images/page-${i + 1}`,
      isDev
    );

    imageUrls.push(publicUrl);
  }

  const warnings: string[] = [];

  // Add helpful context about page indexing and conversion
  warnings.push(
    `Converted ${imageUrls.length} PDF page(s) to ${format.toUpperCase()} images. Images are stored permanently in R2.`
  );

  if (format === 'jpeg') {
    warnings.push(
      'JPEG format selected: smaller file sizes but lossy compression. Use PNG for lossless quality.'
    );
  } else if (format === 'webp') {
    warnings.push(
      'WebP format selected: best compression efficiency with good quality.'
    );
  }

  return {
    imageUrls,
    pageCount: pdfcoResponse.pageCount,
    imageCount: imageUrls.length,
    format,
    ...(warnings.length > 0 && { warnings }),
    remainingCredits: pdfcoResponse.remainingCredits,
  };
}

// ============================================================================
// DOCUMENT TO IMAGES HANDLER
// ============================================================================

/**
 * Arguments for document_to_images tool
 */
export interface DocumentToImagesArgs {
  fileUrl: string; // Publicly accessible Office document URL
  format?: 'png' | 'jpeg' | 'webp'; // Image format (default: png)
}

// Supported Office document extensions
const SUPPORTED_DOCUMENT_EXTENSIONS = [
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
  '.csv',
  '.rtf',
  '.txt',
  '.xps',
];

/**
 * Extract file extension from URL
 * @param url - File URL
 * @returns Lowercase file extension with dot (e.g., '.pptx')
 */
function getFileExtension(url: string): string {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const ext = pathname.substring(pathname.lastIndexOf('.')).toLowerCase();
    return ext;
  } catch {
    throw new Error('Invalid file URL provided. Cannot extract file extension.');
  }
}

/**
 * Convert Office documents (DOCX, PPTX, XLSX) to images via 2-step process
 *
 * PROCESS:
 * 1. Convert Office document to PDF using officeToPdf() (Phase 6)
 * 2. Convert PDF to images using handlePdfToImages() (Phase 8)
 *
 * IMPORTANT NOTES:
 * - Two-step conversion: Office → PDF → Images
 * - Supports all Office formats from Phase 6 (DOCX, PPTX, XLSX, etc.)
 * - Returns array of permanently stored R2 URLs
 * - Ideal for presentation slide previews and document thumbnails
 *
 * @param args - File URL and image format
 * @param env - Worker bindings
 * @returns Array of image URLs, page count, and remaining credits
 */
export async function handleDocumentToImages(
  args: DocumentToImagesArgs,
  env: Bindings
): Promise<{
  imageUrls: string[];
  pageCount?: number;
  imageCount: number;
  format: string;
  sourceFileType: string;
  warnings?: string[];
  remainingCredits?: number;
}> {
  const { fileUrl, format = 'png' } = args;

  // Validate file URL
  try {
    new URL(fileUrl);
  } catch {
    throw new Error('Invalid file URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  // Extract and validate file extension
  const fileExtension = getFileExtension(fileUrl);

  if (!SUPPORTED_DOCUMENT_EXTENSIONS.includes(fileExtension)) {
    throw new Error(
      `Unsupported file type: ${fileExtension}. Supported formats: ${SUPPORTED_DOCUMENT_EXTENSIONS.join(', ')}`
    );
  }

  // Validate format
  const validFormats = ['png', 'jpeg', 'webp'];
  if (!validFormats.includes(format)) {
    throw new Error(
      `Invalid image format: ${format}. Must be one of: ${validFormats.join(', ')}`
    );
  }

  const warnings: string[] = [];

  // Step 1: Convert Office document to PDF
  warnings.push(
    `Step 1/2: Converting ${fileExtension} document to PDF...`
  );

  let pdfResult;
  try {
    pdfResult = await officeToPdf(
      {
        fileUrl,
        // Use autosize for Excel files to fit content
        ...(fileExtension.includes('.xls') && { autosize: true }),
      },
      env
    );
  } catch (error: any) {
    throw new Error(`Document to PDF conversion failed: ${error.message}`);
  }

  // Merge warnings from officeToPdf (e.g., PPTX limited support)
  if (pdfResult.warnings) {
    warnings.push(...pdfResult.warnings);
  }

  // Step 2: Convert PDF to images
  warnings.push(
    `Step 2/2: Converting PDF to ${format.toUpperCase()} images...`
  );

  let imagesResult;
  try {
    imagesResult = await handlePdfToImages(
      {
        fileUrl: pdfResult.pdfUrl,
        format,
      },
      env
    );
  } catch (error: any) {
    throw new Error(`PDF to images conversion failed: ${error.message}`);
  }

  // Merge warnings from handlePdfToImages
  if (imagesResult.warnings) {
    warnings.push(...imagesResult.warnings);
  }

  // Add final success message
  warnings.push(
    `Successfully converted ${fileExtension} document to ${imagesResult.imageCount} ${format.toUpperCase()} image(s).`
  );

  return {
    imageUrls: imagesResult.imageUrls,
    pageCount: imagesResult.pageCount,
    imageCount: imagesResult.imageCount,
    format,
    sourceFileType: fileExtension,
    warnings,
    remainingCredits: imagesResult.remainingCredits, // From final step
  };
}
