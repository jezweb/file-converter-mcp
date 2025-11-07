import type { Ai } from '@cloudflare/workers-types';

/**
 * Supported file format definition from Workers AI
 */
export interface SupportedFormat {
  extension: string;
  mimeType: string;
}

/**
 * Markdown conversion result from Workers AI
 */
export interface ConversionResult {
  name: string;
  format: 'markdown' | 'error';
  mimeType?: string;
  tokens?: number;
  data?: string;
  error?: string;
}

/**
 * Convert document to markdown using Workers AI
 * @param ai - AI binding from Cloudflare Workers
 * @param fileName - Name of the document
 * @param fileBuffer - ArrayBuffer containing file content
 * @param mimeType - Optional MIME type (auto-detected if not provided)
 * @returns Markdown conversion result
 */
export async function convertToMarkdown(
  ai: Ai,
  fileName: string,
  fileBuffer: ArrayBuffer,
  mimeType?: string
): Promise<ConversionResult> {
  const blob = new Blob([fileBuffer], {
    type: mimeType || 'application/octet-stream',
  });

  const result = await ai.toMarkdown([
    {
      name: fileName,
      blob,
    },
  ]);

  // Result is an array, return first item
  return result[0];
}

/**
 * Get list of supported file formats from Workers AI
 * @param ai - AI binding from Cloudflare Workers
 * @returns Array of supported formats with extensions and MIME types
 */
export async function getSupportedFormats(ai: Ai): Promise<SupportedFormat[]> {
  return await ai.toMarkdown().supported();
}

/**
 * Check if a file format is supported for markdown conversion
 * @param fileExtension - File extension (e.g., '.pdf', '.docx')
 * @param supportedFormats - Array of supported formats from getSupportedFormats()
 * @returns True if format is supported
 */
export function isSupportedFormat(
  fileExtension: string,
  supportedFormats: SupportedFormat[]
): boolean {
  const normalizedExt = fileExtension.toLowerCase();
  return supportedFormats.some((f) => f.extension === normalizedExt);
}

/**
 * Get MIME type for a file extension from supported formats
 * @param fileExtension - File extension (e.g., '.pdf', '.docx')
 * @param supportedFormats - Array of supported formats
 * @returns MIME type or undefined if not found
 */
export function getMimeTypeForExtension(
  fileExtension: string,
  supportedFormats: SupportedFormat[]
): string | undefined {
  const normalizedExt = fileExtension.toLowerCase();
  const format = supportedFormats.find((f) => f.extension === normalizedExt);
  return format?.mimeType;
}
