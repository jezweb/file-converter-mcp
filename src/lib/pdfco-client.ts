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
