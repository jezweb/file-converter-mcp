import type { Bindings } from '../mcp/types';

/**
 * PDF.co API base URL
 */
const PDFCO_API_BASE = 'https://api.pdf.co/v1';

/**
 * PDF.co error codes and their meanings
 */
export const PDFCoErrorCodes = {
  400: 'Bad Request - Invalid parameters',
  401: 'Unauthorized - Invalid API key',
  402: 'Insufficient Credits - Please add credits to your account',
  403: 'Forbidden - File URL is not publicly accessible',
  404: 'Not Found - Resource does not exist',
  408: 'Timeout - Request took too long',
  414: 'URI Too Long - URL path exceeds limits',
  415: 'Unsupported Media Type - File format not supported',
  429: 'Too Many Requests - Rate limit exceeded',
  441: 'Invalid Password - Document is password-protected',
  442: 'Invalid Document - File is damaged or incorrect format',
  443: 'Security Blocked - Document security settings prevent operation',
  445: 'Timeout - File too large, use async mode',
  449: 'Invalid Page Index - Page number does not exist',
  500: 'Server Error - Internal error, please retry',
} as const;

/**
 * PDF.co API response for Excel to JSON conversion
 */
export interface PDFCoExcelToJsonResponse {
  url?: string; // S3 URL to converted JSON file
  outputLinkValidTill?: string; // ISO 8601 timestamp
  error: boolean;
  status: number;
  credits?: number;
  remainingCredits?: number;
  duration?: number;
  message?: string; // Error message if error: true
}

/**
 * PDF.co API response for Office to PDF conversion
 */
export interface PDFCoOfficeToPdfResponse {
  url?: string; // S3 URL to converted PDF file
  pageCount?: number; // Number of pages in output PDF
  name?: string; // Output filename
  outputLinkValidTill?: string; // ISO 8601 timestamp
  error: boolean;
  status: number;
  credits?: number;
  remainingCredits?: number;
  duration?: number;
  message?: string; // Error message if error: true
}

/**
 * Excel to JSON conversion request parameters
 */
export interface ExcelToJsonParams {
  url: string; // Publicly accessible Excel file URL
  worksheetIndex?: string; // 1-based worksheet index (default: "1")
  async?: boolean; // Run asynchronously (for large files)
  inline?: boolean; // Return JSON inline vs S3 link
  name?: string; // Custom output filename
  expiration?: number; // Output link expiration in minutes (default: 60)
}

/**
 * Office to PDF conversion request parameters
 */
export interface OfficeToPdfParams {
  url: string; // Publicly accessible Office file URL
  name?: string; // Custom output filename
  worksheetIndex?: number; // Excel only: 1-based worksheet index (default: all sheets)
  autosize?: boolean; // Excel only: Auto-adjust page dimensions to fit content
  pages?: string; // Specific pages to convert (e.g., "0,1,2" or "1-5")
  async?: boolean; // Run asynchronously (for large files)
  expiration?: number; // Output link expiration in minutes (default: 60)
}

/**
 * Make authenticated request to PDF.co API
 * @param endpoint - API endpoint path (e.g., '/xls/convert/to/json')
 * @param body - Request body
 * @param apiKey - PDF.co API key
 * @returns API response
 */
async function pdfcoRequest<T>(
  endpoint: string,
  body: Record<string, any>,
  apiKey: string
): Promise<T> {
  const url = `${PDFCO_API_BASE}${endpoint}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await response.json() as any;

  // Check for errors
  if (!response.ok || data.error === true) {
    const status = data.status || response.status;
    const errorMessage =
      data.message ||
      PDFCoErrorCodes[status as keyof typeof PDFCoErrorCodes] ||
      `PDF.co API error: ${status}`;

    // Provide helpful error messages
    if (status === 402) {
      throw new Error(
        'Insufficient PDF.co credits. Please add credits to your account at https://pdf.co'
      );
    } else if (status === 403) {
      throw new Error(
        'File URL is not publicly accessible. Ensure the file can be downloaded without authentication.'
      );
    } else if (status === 429) {
      throw new Error(
        'PDF.co rate limit exceeded. Please wait a moment and retry.'
      );
    } else if (status === 442) {
      throw new Error(
        'Invalid or damaged Excel file. Please verify the file is a valid xls/xlsx/csv file.'
      );
    } else if (status === 445) {
      throw new Error(
        'File is too large for synchronous conversion. Please try again or use async mode.'
      );
    }

    throw new Error(`PDF.co API error (${status}): ${errorMessage}`);
  }

  return data as T;
}

/**
 * Convert Excel file to JSON using PDF.co API
 * @param params - Conversion parameters
 * @param env - Worker bindings
 * @returns PDF.co response with S3 URL to JSON file
 */
export async function convertExcelToJson(
  params: ExcelToJsonParams,
  env: Bindings
): Promise<PDFCoExcelToJsonResponse> {
  const apiKey = env.PDFCO_API_KEY;

  if (!apiKey) {
    throw new Error('PDFCO_API_KEY environment variable is not set');
  }

  // Validate URL
  try {
    new URL(params.url);
  } catch {
    throw new Error('Invalid file URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  // Prepare request body with defaults
  const requestBody = {
    url: params.url,
    worksheetIndex: params.worksheetIndex || '1',
    async: params.async || false,
    inline: params.inline !== undefined ? params.inline : false,
    ...(params.name && { name: params.name }),
    ...(params.expiration && { expiration: params.expiration }),
  };

  return pdfcoRequest<PDFCoExcelToJsonResponse>(
    '/xls/convert/to/json',
    requestBody,
    apiKey
  );
}

/**
 * Check status of async PDF.co job
 * @param jobId - Job ID from async conversion
 * @param apiKey - PDF.co API key
 * @returns Job status response
 */
export async function checkJobStatus(
  jobId: string,
  apiKey: string
): Promise<any> {
  const url = `${PDFCO_API_BASE}/job/check?jobId=${jobId}`;

  const response = await fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  });

  return response.json();
}

/**
 * Determine which PDF.co endpoint to use based on file extension
 * @param fileExtension - File extension (e.g., '.docx', '.xlsx')
 * @returns PDF.co endpoint path
 */
function getOfficeToPdfEndpoint(fileExtension: string): string {
  const ext = fileExtension.toLowerCase();

  // Excel/CSV files use the CSV endpoint
  if (['.xls', '.xlsx', '.csv'].includes(ext)) {
    return '/pdf/convert/from/csv';
  }

  // Word/PowerPoint/Other files use the DOC endpoint
  // Supported: .doc, .docx, .ppt, .pptx, .rtf, .txt, .xps
  return '/pdf/convert/from/doc';
}

/**
 * Convert Office document to PDF using PDF.co API
 * Supports: DOCX, DOC, PPTX, PPT, XLSX, XLS, CSV, RTF, TXT, XPS
 *
 * IMPORTANT NOTES:
 * - PPTX/PPT have limited support (PDF.co may not fix bugs/issues)
 * - Office macros are disabled and will not execute
 * - Output URLs expire in 60 minutes (download and re-upload to R2 immediately)
 *
 * @param params - Conversion parameters
 * @param env - Worker bindings
 * @param fileExtension - File extension to determine endpoint (e.g., '.docx', '.xlsx')
 * @returns PDF.co response with S3 URL to PDF file
 */
export async function convertOfficeToPdf(
  params: OfficeToPdfParams,
  env: Bindings,
  fileExtension: string
): Promise<PDFCoOfficeToPdfResponse> {
  const apiKey = env.PDFCO_API_KEY;

  if (!apiKey) {
    throw new Error('PDFCO_API_KEY environment variable is not set');
  }

  // Validate URL
  try {
    new URL(params.url);
  } catch {
    throw new Error('Invalid file URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  // Determine correct endpoint based on file type
  const endpoint = getOfficeToPdfEndpoint(fileExtension);

  // Prepare request body with defaults
  const requestBody: Record<string, any> = {
    url: params.url,
    async: params.async || false,
  };

  // Add optional parameters
  if (params.name) requestBody.name = params.name;
  if (params.expiration) requestBody.expiration = params.expiration;
  if (params.pages) requestBody.pages = params.pages;

  // Excel-specific parameters (only for CSV endpoint)
  if (endpoint === '/pdf/convert/from/csv') {
    if (params.worksheetIndex !== undefined) {
      requestBody.worksheetIndex = params.worksheetIndex;
    }
    if (params.autosize !== undefined) {
      requestBody.autosize = params.autosize;
    }
  }

  return pdfcoRequest<PDFCoOfficeToPdfResponse>(
    endpoint,
    requestBody,
    apiKey
  );
}

/**
 * PDF.co API response for merge PDFs operation
 */
export interface PDFCoMergePdfsResponse {
  url?: string; // S3 URL to merged PDF file
  pageCount?: number; // Total pages in merged PDF
  name?: string; // Output filename
  outputLinkValidTill?: string; // ISO 8601 timestamp
  error: boolean;
  status: number;
  credits?: number;
  remainingCredits?: number;
  duration?: number;
  message?: string; // Error message if error: true
}

/**
 * PDF.co API response for split PDF operation
 */
export interface PDFCoSplitPdfResponse {
  urls?: string[]; // Array of S3 URLs to split PDF files
  pageCount?: number; // Total pages in source document
  name?: string; // Output filename pattern
  outputLinkValidTill?: string; // ISO 8601 timestamp
  error: boolean;
  status: number;
  credits?: number;
  remainingCredits?: number;
  duration?: number;
  message?: string; // Error message if error: true
}

/**
 * PDF.co API response for extract tables operation
 */
export interface PDFCoExtractTablesResponse {
  url?: string; // S3 URL to CSV file (if not inline)
  body?: string; // CSV content (if inline: true)
  pageCount?: number; // Total pages processed
  name?: string; // Output filename
  outputLinkValidTill?: string; // ISO 8601 timestamp
  error: boolean;
  status: number;
  credits?: number;
  remainingCredits?: number;
  duration?: number;
  message?: string; // Error message if error: true
}

/**
 * Merge PDFs request parameters
 */
export interface MergePdfsParams {
  urls: string[]; // Array of publicly accessible PDF file URLs
  bookmarkTitles?: string[]; // Optional bookmark titles (must match urls length)
  name?: string; // Custom output filename
  async?: boolean; // Run asynchronously (for large files)
  expiration?: number; // Output link expiration in minutes (default: 60)
}

/**
 * Split PDF request parameters
 */
export interface SplitPdfParams {
  url: string; // Publicly accessible PDF file URL
  pages?: string; // Page ranges (1-based): "1-2,3-" or "*" for all pages individually
  name?: string; // Custom output filename
  async?: boolean; // Run asynchronously (for large files)
  expiration?: number; // Output link expiration in minutes (default: 60)
}

/**
 * Extract PDF tables request parameters
 */
export interface ExtractTablesParams {
  url: string; // Publicly accessible PDF file URL
  pages?: string; // Page range (0-based): "0-" for all pages, "1,2,3-7" for specific
  inline?: boolean; // Return CSV inline in response vs S3 link
  columnDetectionMode?: 'ContentGroupsAndBorders' | 'ContentGroups' | 'Borders' | 'BorderedTables' | 'ContentGroupsAI';
  name?: string; // Custom output filename
  async?: boolean; // Run asynchronously (for large files)
  expiration?: number; // Output link expiration in minutes (default: 60)
}

/**
 * Merge multiple PDF files into a single PDF with optional bookmarks
 *
 * IMPORTANT NOTES:
 * - Requires at least 2 PDF files
 * - If bookmarkTitles provided, must match number of PDFs
 * - Output URL expires in 60 minutes (download and re-upload to R2 immediately)
 *
 * @param params - Merge parameters
 * @param env - Worker bindings
 * @returns PDF.co response with S3 URL to merged PDF file
 */
export async function mergePdfs(
  params: MergePdfsParams,
  env: Bindings
): Promise<PDFCoMergePdfsResponse> {
  const apiKey = env.PDFCO_API_KEY;

  if (!apiKey) {
    throw new Error('PDFCO_API_KEY environment variable is not set');
  }

  // Validate URLs array
  if (!Array.isArray(params.urls) || params.urls.length < 2) {
    throw new Error('Must provide at least 2 PDF URLs to merge');
  }

  // Validate all URLs
  for (const url of params.urls) {
    try {
      new URL(url);
    } catch {
      throw new Error(`Invalid URL in urls array: ${url}`);
    }
  }

  // Validate bookmarkTitles if provided
  if (params.bookmarkTitles) {
    if (!Array.isArray(params.bookmarkTitles)) {
      throw new Error('bookmarkTitles must be an array');
    }
    if (params.bookmarkTitles.length !== params.urls.length) {
      throw new Error(
        `bookmarkTitles length (${params.bookmarkTitles.length}) must match urls length (${params.urls.length})`
      );
    }
  }

  // Prepare request body
  const requestBody: Record<string, any> = {
    url: params.urls.join(','), // Comma-separated URLs
    async: params.async || false,
  };

  // Add optional parameters
  if (params.name) requestBody.name = params.name;
  if (params.expiration) requestBody.expiration = params.expiration;

  // Add bookmarks if provided
  if (params.bookmarkTitles) {
    requestBody.profiles = JSON.stringify({
      GenerateBookmarks: true,
      BookmarkTitles: params.bookmarkTitles,
    });
  }

  return pdfcoRequest<PDFCoMergePdfsResponse>(
    '/pdf/merge',
    requestBody,
    apiKey
  );
}

/**
 * Split PDF into multiple files by extracting specific page ranges
 *
 * IMPORTANT NOTES:
 * - Page indexing is 1-based (first page = 1, not 0)
 * - Use "*" to split into individual pages
 * - Use ranges like "1-2,3-" or "!0" for last page
 * - Output URLs expire in 60 minutes (download and re-upload to R2 immediately)
 *
 * @param params - Split parameters
 * @param env - Worker bindings
 * @returns PDF.co response with array of S3 URLs to split PDF files
 */
export async function splitPdf(
  params: SplitPdfParams,
  env: Bindings
): Promise<PDFCoSplitPdfResponse> {
  const apiKey = env.PDFCO_API_KEY;

  if (!apiKey) {
    throw new Error('PDFCO_API_KEY environment variable is not set');
  }

  // Validate URL
  try {
    new URL(params.url);
  } catch {
    throw new Error('Invalid file URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  // Prepare request body
  const requestBody: Record<string, any> = {
    url: params.url,
    async: params.async || false,
  };

  // Add optional parameters
  if (params.pages) requestBody.pages = params.pages;
  if (params.name) requestBody.name = params.name;
  if (params.expiration) requestBody.expiration = params.expiration;

  return pdfcoRequest<PDFCoSplitPdfResponse>(
    '/pdf/split',
    requestBody,
    apiKey
  );
}

/**
 * Extract table data from PDF as CSV
 *
 * IMPORTANT NOTES:
 * - Page indexing is 0-based (first page = 0, not 1) - different from split!
 * - Use "0-" for all pages, "1,2,3-7" for specific pages
 * - Output URL expires in 60 minutes (download and re-upload to R2 immediately)
 * - CSV may contain UTF-8 BOM character (0xFEFF) - strip if present
 *
 * @param params - Extract parameters
 * @param env - Worker bindings
 * @returns PDF.co response with S3 URL to CSV file or inline CSV content
 */
export async function extractPdfTables(
  params: ExtractTablesParams,
  env: Bindings
): Promise<PDFCoExtractTablesResponse> {
  const apiKey = env.PDFCO_API_KEY;

  if (!apiKey) {
    throw new Error('PDFCO_API_KEY environment variable is not set');
  }

  // Validate URL
  try {
    new URL(params.url);
  } catch {
    throw new Error('Invalid file URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  // Prepare request body
  const requestBody: Record<string, any> = {
    url: params.url,
    async: params.async || false,
    inline: params.inline !== undefined ? params.inline : false,
  };

  // Add optional parameters
  if (params.pages) requestBody.pages = params.pages;
  if (params.name) requestBody.name = params.name;
  if (params.expiration) requestBody.expiration = params.expiration;

  // Add column detection mode if provided
  if (params.columnDetectionMode) {
    requestBody.profiles = JSON.stringify({
      ColumnDetectionMode: params.columnDetectionMode,
    });
  }

  return pdfcoRequest<PDFCoExtractTablesResponse>(
    '/pdf/convert/to/csv',
    requestBody,
    apiKey
  );
}

// ============================================================================
// PDF TO IMAGES (Phase 8)
// ============================================================================

/**
 * Response interface for PDF.co PDF to Images conversion
 * Endpoint returns array of image URLs (one per page)
 */
export interface PDFCoPdfToImagesResponse {
  urls?: string[]; // Array of S3 URLs to image files (one per page)
  pageCount?: number; // Total pages in source PDF
  name?: string;
  outputLinkValidTill?: string;
  error: boolean;
  status: number;
  credits?: number;
  remainingCredits?: number;
  duration?: number;
  message?: string;
}

/**
 * Parameters for PDF.co PDF to Images conversion
 */
export interface PdfToImagesParams {
  url: string; // Source PDF URL
  format: 'jpg' | 'png' | 'webp'; // Image format
  pages?: string; // Page indices (e.g., "0-" for all, "0,1,2" for specific)
  renderingResolution?: number; // DPI (default: 120)
  jpegQuality?: number; // 0-100 (default: 85) - only for JPG
  async?: boolean; // Background processing
  name?: string; // Output filename prefix
  expiration?: number; // Link expiration in minutes (default: 60)
}

/**
 * Convert PDF pages to images using PDF.co API
 *
 * IMPORTANT: Page indexing is 0-based (first page = 0, not 1)
 *
 * API Documentation:
 * - JPG: https://docs.pdf.co/api-reference/pdf-to-image/jpg
 * - PNG: https://docs.pdf.co/api-reference/pdf-to-image/png
 * - WebP: https://docs.pdf.co/api-reference/pdf-to-image/webp
 *
 * Endpoints:
 * - POST /pdf/convert/to/jpg
 * - POST /pdf/convert/to/png
 * - POST /pdf/convert/to/webp
 *
 * Returns array of S3 URLs (one URL per page)
 *
 * @param params - Conversion parameters
 * @param env - Worker bindings
 * @returns PDF.co API response with array of image URLs
 */
export async function pdfToImages(
  params: PdfToImagesParams,
  env: Bindings
): Promise<PDFCoPdfToImagesResponse> {
  const apiKey = env.PDFCO_API_KEY;

  if (!apiKey) {
    throw new Error('PDFCO_API_KEY environment variable is not set');
  }

  // Validate URL
  try {
    new URL(params.url);
  } catch {
    throw new Error('Invalid file URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  // Validate format
  const validFormats = ['jpg', 'png', 'webp'];
  if (!validFormats.includes(params.format)) {
    throw new Error(`Invalid format: ${params.format}. Must be one of: ${validFormats.join(', ')}`);
  }

  // Determine endpoint based on format
  const endpoint = `/pdf/convert/to/${params.format}`;

  // Prepare request body
  const requestBody: Record<string, any> = {
    url: params.url,
    async: params.async || false,
    pages: params.pages || '0-', // Default: all pages (0-based indexing)
  };

  // Add optional parameters
  if (params.name) requestBody.name = params.name;
  if (params.expiration) requestBody.expiration = params.expiration;

  // Add rendering profiles if provided
  const profiles: Record<string, any> = {};
  if (params.renderingResolution) {
    profiles.RenderingResolution = params.renderingResolution;
  }
  if (params.format === 'jpg' && params.jpegQuality !== undefined) {
    profiles.JPEGQuality = params.jpegQuality;
  }

  if (Object.keys(profiles).length > 0) {
    requestBody.profiles = JSON.stringify(profiles);
  }

  return pdfcoRequest<PDFCoPdfToImagesResponse>(
    endpoint,
    requestBody,
    apiKey
  );
}
