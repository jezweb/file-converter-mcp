import type { Bindings } from '../mcp/types';
import {
  convertToMarkdown,
  getSupportedFormats,
  isSupportedFormat,
  getMimeTypeForExtension,
} from '../lib/ai-client';

// Type definition for handler arguments
export interface DocumentToMarkdownArgs {
  fileUrl: string;
  fileName?: string;
}

/**
 * Convert document (PDF, DOCX, XLSX, images) to markdown using Workers AI
 * Supports all formats listed in Workers AI documentation:
 * - PDF, DOCX, XLSX, ODS, ODT, CSV, HTML, XML
 * - Images (JPEG, PNG, WebP, SVG) - uses AI models for object detection + summarization
 *
 * @param args - File URL and optional file name
 * @param env - Worker bindings
 * @returns Markdown content, detected MIME type, and token count
 */
export async function documentToMarkdown(
  args: DocumentToMarkdownArgs,
  env: Bindings
): Promise<{
  markdown: string;
  mimeType: string;
  tokens: number;
  fileName: string;
}> {
  const { fileUrl, fileName } = args;

  // Validate URL format
  let url: URL;
  try {
    url = new URL(fileUrl);
  } catch {
    throw new Error('Invalid file URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  // Extract file name from URL if not provided
  const detectedFileName =
    fileName || url.pathname.split('/').pop() || 'document';

  // Get file extension
  const fileExtension = detectedFileName.includes('.')
    ? '.' + detectedFileName.split('.').pop()?.toLowerCase()
    : '';

  // Get supported formats from Workers AI
  const supportedFormats = await getSupportedFormats(env.AI);

  // Validate file format
  if (fileExtension && !isSupportedFormat(fileExtension, supportedFormats)) {
    const supportedExts = supportedFormats.map((f) => f.extension).join(', ');
    throw new Error(
      `Unsupported file format: ${fileExtension}. Supported formats: ${supportedExts}`
    );
  }

  // Fetch file from URL
  let fileResponse: Response;
  try {
    fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      throw new Error(`HTTP ${fileResponse.status}: ${fileResponse.statusText}`);
    }
  } catch (error: any) {
    if (error.message.includes('HTTP')) {
      throw error;
    }
    throw new Error(
      `Failed to fetch file from URL: ${error.message}. Ensure the URL is publicly accessible.`
    );
  }

  // Get file content as ArrayBuffer
  const fileBuffer = await fileResponse.arrayBuffer();

  // Get MIME type (from response header or detected from extension)
  const responseMimeType = fileResponse.headers.get('content-type');
  const detectedMimeType =
    responseMimeType || getMimeTypeForExtension(fileExtension, supportedFormats);

  // Convert to markdown
  try {
    const result = await convertToMarkdown(
      env.AI,
      detectedFileName,
      fileBuffer,
      detectedMimeType
    );

    // Check for conversion errors
    if (result.format === 'error') {
      throw new Error(
        result.error || 'Conversion failed with unknown error from Workers AI'
      );
    }

    if (!result.data) {
      throw new Error('Conversion succeeded but no markdown data returned');
    }

    return {
      markdown: result.data,
      mimeType: result.mimeType || detectedMimeType || 'application/octet-stream',
      tokens: result.tokens || 0,
      fileName: detectedFileName,
    };
  } catch (error: any) {
    // Handle Workers AI specific errors
    if (error.message.includes('quota') || error.message.includes('limit')) {
      throw new Error(
        'Workers AI quota exceeded. Please try again later or upgrade your plan.'
      );
    }
    throw new Error(`Document conversion failed: ${error.message}`);
  }
}
