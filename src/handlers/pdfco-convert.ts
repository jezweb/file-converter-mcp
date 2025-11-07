import type { Bindings } from '../mcp/types';
import { convertOfficeToPdf } from '../lib/pdfco-client';
import { uploadPdfToR2 } from '../lib/r2-storage';

// Type definition for handler arguments
export interface OfficeToPdfArgs {
  fileUrl: string;
  worksheetIndex?: number; // Excel only: 1-based index (default: all sheets)
  autosize?: boolean; // Excel only: Auto-adjust page dimensions
}

// Supported file extensions
const SUPPORTED_EXTENSIONS = [
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

// Extensions with limited support (warn user)
const LIMITED_SUPPORT_EXTENSIONS = ['.ppt', '.pptx'];

/**
 * Extract file extension from URL
 * @param url - File URL
 * @returns Lowercase file extension with dot (e.g., '.docx')
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
 * Convert Office document to PDF using PDF.co API
 * Supports: DOCX, DOC, PPTX, PPT, XLSX, XLS, CSV, RTF, TXT, XPS
 *
 * IMPORTANT NOTES:
 * - PPTX/PPT have limited support (PDF.co may not provide assistance for issues)
 * - Office macros are disabled and will not execute during conversion
 * - For Excel files, use worksheetIndex parameter to convert specific sheet (1=first, 2=second, etc.)
 * - Output is permanently stored in R2 (PDF.co temporary URLs expire in 60 minutes)
 *
 * @param args - File URL and optional parameters
 * @param env - Worker bindings
 * @returns PDF URL, page count, file type, and remaining credits
 */
export async function officeToPdf(
  args: OfficeToPdfArgs,
  env: Bindings
): Promise<{
  pdfUrl: string;
  pageCount?: number;
  fileType: string;
  warnings?: string[];
  remainingCredits?: number;
}> {
  const { fileUrl, worksheetIndex, autosize } = args;

  // Validate file URL
  try {
    new URL(fileUrl);
  } catch {
    throw new Error('Invalid file URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  // Extract and validate file extension
  const fileExtension = getFileExtension(fileUrl);

  if (!SUPPORTED_EXTENSIONS.includes(fileExtension)) {
    throw new Error(
      `Unsupported file type: ${fileExtension}. Supported formats: ${SUPPORTED_EXTENSIONS.join(', ')}`
    );
  }

  // Check for limited support formats and add warnings
  const warnings: string[] = [];

  if (LIMITED_SUPPORT_EXTENSIONS.includes(fileExtension)) {
    warnings.push(
      `PowerPoint files (${fileExtension}) have limited support. PDF.co may not provide assistance for rendering issues or bugs. Consider using Browser Rendering for critical presentations.`
    );
  }

  // Check if file might contain macros (macro-enabled extensions)
  const macroExtensions = ['.docm', '.xlsm', '.pptm'];
  const hasLikelyMacros = macroExtensions.some((ext) => fileUrl.toLowerCase().includes(ext));

  if (hasLikelyMacros) {
    warnings.push(
      'This file appears to be macro-enabled. Office macros are disabled and will not execute during conversion.'
    );
  }

  // Validate Excel-specific parameters
  if (worksheetIndex !== undefined) {
    if (!['.xls', '.xlsx', '.csv'].includes(fileExtension)) {
      throw new Error(
        `worksheetIndex parameter is only supported for Excel files (.xls, .xlsx, .csv). Current file type: ${fileExtension}`
      );
    }

    if (!Number.isInteger(worksheetIndex) || worksheetIndex < 1) {
      throw new Error(
        'Invalid worksheetIndex. Must be a positive integer (1 for first sheet, 2 for second, etc.)'
      );
    }
  }

  // Convert Office document to PDF using PDF.co
  let pdfcoResponse;
  try {
    pdfcoResponse = await convertOfficeToPdf(
      {
        url: fileUrl,
        worksheetIndex,
        autosize,
        async: false, // Sync mode for simplicity (use async for files > 50MB)
      },
      env,
      fileExtension
    );
  } catch (error: any) {
    // Re-throw with context
    throw new Error(`Office to PDF conversion failed: ${error.message}`);
  }

  // Check if PDF.co returned a valid URL
  if (!pdfcoResponse.url) {
    throw new Error(
      'PDF.co conversion succeeded but did not return a download URL. Please retry.'
    );
  }

  // Download PDF from PDF.co S3 (expires in 60 minutes)
  let pdfResponse: Response;
  try {
    pdfResponse = await fetch(pdfcoResponse.url);
    if (!pdfResponse.ok) {
      throw new Error(
        `Failed to download converted PDF: HTTP ${pdfResponse.status}`
      );
    }
  } catch (error: any) {
    throw new Error(
      `Failed to download PDF from PDF.co: ${error.message}. The file may have expired.`
    );
  }

  // Get PDF buffer
  const pdfBuffer = await pdfResponse.arrayBuffer();

  // Upload to R2 for permanent storage
  // Detect dev mode by checking if R2 bucket name contains 'dev'
  const bucketName = env.R2_BUCKET?.name || '';
  const isDev = bucketName.includes('dev');

  const { publicUrl } = await uploadPdfToR2(
    env.R2_BUCKET,
    pdfBuffer,
    'office-to-pdf',
    isDev
  );

  return {
    pdfUrl: publicUrl,
    pageCount: pdfcoResponse.pageCount,
    fileType: fileExtension,
    ...(warnings.length > 0 && { warnings }),
    remainingCredits: pdfcoResponse.remainingCredits,
  };
}
