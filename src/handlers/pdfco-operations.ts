import type { Bindings } from '../mcp/types';
import { mergePdfs, splitPdf, extractPdfTables } from '../lib/pdfco-client';
import { uploadPdfToR2 } from '../lib/r2-storage';

// ============================================================================
// MERGE PDFs HANDLER
// ============================================================================

/**
 * Arguments for merge_pdfs tool
 */
export interface MergePdfsArgs {
  fileUrls: string[]; // Array of publicly accessible PDF URLs
  bookmarkTitles?: string[]; // Optional bookmark titles (must match fileUrls length)
}

/**
 * Merge multiple PDF files into a single PDF with optional bookmarks
 *
 * IMPORTANT NOTES:
 * - Requires at least 2 PDF files
 * - If bookmarkTitles provided, must match fileUrls length
 * - Output stored permanently in R2 (PDF.co URLs expire in 60 minutes)
 *
 * @param args - File URLs and optional bookmark titles
 * @param env - Worker bindings
 * @returns Merged PDF URL, page count, and remaining credits
 */
export async function handleMergePdfs(
  args: MergePdfsArgs,
  env: Bindings
): Promise<{
  pdfUrl: string;
  pageCount?: number;
  warnings?: string[];
  remainingCredits?: number;
}> {
  const { fileUrls, bookmarkTitles } = args;

  // Validate file URLs array
  if (!Array.isArray(fileUrls) || fileUrls.length < 2) {
    throw new Error('Must provide at least 2 PDF URLs to merge');
  }

  // Validate all URLs
  for (const url of fileUrls) {
    try {
      new URL(url);
    } catch {
      throw new Error(`Invalid URL in fileUrls array: ${url}`);
    }
  }

  // Validate bookmarkTitles if provided
  if (bookmarkTitles) {
    if (!Array.isArray(bookmarkTitles)) {
      throw new Error('bookmarkTitles must be an array');
    }
    if (bookmarkTitles.length !== fileUrls.length) {
      throw new Error(
        `bookmarkTitles length (${bookmarkTitles.length}) must match fileUrls length (${fileUrls.length})`
      );
    }
  }

  // Merge PDFs using PDF.co
  let pdfcoResponse;
  try {
    pdfcoResponse = await mergePdfs(
      {
        urls: fileUrls,
        bookmarkTitles,
        async: false, // Sync mode for simplicity
      },
      env
    );
  } catch (error: any) {
    throw new Error(`PDF merge failed: ${error.message}`);
  }

  // Check if PDF.co returned a valid URL
  if (!pdfcoResponse.url) {
    throw new Error(
      'PDF.co merge succeeded but did not return a download URL. Please retry.'
    );
  }

  // Download merged PDF from PDF.co S3 (expires in 60 minutes)
  let pdfResponse: Response;
  try {
    pdfResponse = await fetch(pdfcoResponse.url);
    if (!pdfResponse.ok) {
      throw new Error(
        `Failed to download merged PDF: HTTP ${pdfResponse.status}`
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
  const bucketName = (env.R2_BUCKET as any)?.name || '';
  const isDev = bucketName.includes('dev');

  const { publicUrl } = await uploadPdfToR2(
    env.R2_BUCKET,
    pdfBuffer,
    'merge-pdfs',
    isDev
  );

  const warnings: string[] = [];
  if (bookmarkTitles) {
    warnings.push(
      `Bookmarks added: ${bookmarkTitles.length}. Open the PDF with a reader that supports bookmarks to navigate.`
    );
  }

  return {
    pdfUrl: publicUrl,
    pageCount: pdfcoResponse.pageCount,
    ...(warnings.length > 0 && { warnings }),
    remainingCredits: pdfcoResponse.remainingCredits,
  };
}

// ============================================================================
// SPLIT PDF HANDLER
// ============================================================================

/**
 * Arguments for split_pdf tool
 */
export interface SplitPdfArgs {
  fileUrl: string; // Publicly accessible PDF URL
  pages?: string; // Page ranges (1-based): "1-2,3-" or "*" for all pages individually
}

/**
 * Split PDF into multiple files by extracting specific page ranges
 *
 * IMPORTANT NOTES:
 * - Page indexing is 1-based (first page = 1, not 0)
 * - Use "*" to split into individual pages
 * - Use ranges like "1-2,3-" or "!0" for last page
 * - Outputs stored permanently in R2 (PDF.co URLs expire in 60 minutes)
 *
 * @param args - File URL and page ranges
 * @param env - Worker bindings
 * @returns Array of split PDF URLs, page count, and remaining credits
 */
export async function handleSplitPdf(
  args: SplitPdfArgs,
  env: Bindings
): Promise<{
  pdfUrls: string[];
  pageCount?: number;
  splitCount: number;
  warnings?: string[];
  remainingCredits?: number;
}> {
  const { fileUrl, pages } = args;

  // Validate file URL
  try {
    new URL(fileUrl);
  } catch {
    throw new Error('Invalid file URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  // Split PDF using PDF.co
  let pdfcoResponse;
  try {
    pdfcoResponse = await splitPdf(
      {
        url: fileUrl,
        pages: pages || '*', // Default: split into individual pages
        async: false,
      },
      env
    );
  } catch (error: any) {
    throw new Error(`PDF split failed: ${error.message}`);
  }

  // Check if PDF.co returned valid URLs
  if (!pdfcoResponse.urls || pdfcoResponse.urls.length === 0) {
    throw new Error(
      'PDF.co split succeeded but did not return download URLs. Please retry.'
    );
  }

  // Download all split PDFs and upload to R2
  const bucketName = (env.R2_BUCKET as any)?.name || '';
  const isDev = bucketName.includes('dev');

  const publicUrls: string[] = [];

  for (let i = 0; i < pdfcoResponse.urls.length; i++) {
    const pdfUrl = pdfcoResponse.urls[i];

    // Download PDF from PDF.co S3
    let pdfResponse: Response;
    try {
      pdfResponse = await fetch(pdfUrl);
      if (!pdfResponse.ok) {
        throw new Error(
          `Failed to download split PDF ${i + 1}: HTTP ${pdfResponse.status}`
        );
      }
    } catch (error: any) {
      throw new Error(
        `Failed to download split PDF ${i + 1} from PDF.co: ${error.message}`
      );
    }

    // Get PDF buffer
    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Upload to R2 with unique filename
    const { publicUrl } = await uploadPdfToR2(
      env.R2_BUCKET,
      pdfBuffer,
      `split-pdf/part-${i + 1}`,
      isDev
    );

    publicUrls.push(publicUrl);
  }

  const warnings: string[] = [];
  if (pages === '*') {
    warnings.push(
      `PDF split into ${publicUrls.length} individual pages. Page indexing is 1-based (first page = 1).`
    );
  } else if (pages) {
    warnings.push(
      `PDF split using page ranges: "${pages}". Page indexing is 1-based (first page = 1).`
    );
  }

  return {
    pdfUrls: publicUrls,
    pageCount: pdfcoResponse.pageCount,
    splitCount: publicUrls.length,
    ...(warnings.length > 0 && { warnings }),
    remainingCredits: pdfcoResponse.remainingCredits,
  };
}

// ============================================================================
// EXTRACT PDF TABLES HANDLER
// ============================================================================

/**
 * Arguments for extract_pdf_tables tool
 */
export interface ExtractPdfTablesArgs {
  fileUrl: string; // Publicly accessible PDF URL
  pages?: string; // Page range (0-based): "0-" for all pages, "1,2,3-7" for specific
  outputFormat?: 'csv' | 'json'; // Output format (default: csv)
  columnDetectionMode?: 'ContentGroupsAndBorders' | 'ContentGroups' | 'Borders' | 'BorderedTables' | 'ContentGroupsAI';
}

/**
 * Strip UTF-8 BOM (0xFEFF) from string if present
 * PDF.co sometimes returns CSV with BOM character
 */
function stripBOM(str: string): string {
  if (str.charCodeAt(0) === 0xfeff) {
    return str.slice(1);
  }
  return str;
}

/**
 * Parse CSV string to JSON array of objects
 * Simple parser that handles quoted fields and newlines
 */
function parseCSVToJSON(csv: string): any[] {
  const lines = csv.trim().split('\n');
  if (lines.length === 0) return [];

  // First line is header
  const headers = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''));

  // Parse remaining lines
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim().replace(/"/g, ''));
    const row: any = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    rows.push(row);
  }

  return rows;
}

/**
 * Extract table data from PDF as CSV or JSON
 *
 * IMPORTANT NOTES:
 * - Page indexing is 0-based (first page = 0, not 1) - different from split!
 * - Use "0-" for all pages, "1,2,3-7" for specific pages
 * - Returns empty data if no tables found
 * - CSV may contain UTF-8 BOM character (automatically stripped)
 *
 * @param args - File URL, pages, output format, column detection mode
 * @param env - Worker bindings
 * @returns Table data as CSV or JSON, page count, and remaining credits
 */
export async function handleExtractPdfTables(
  args: ExtractPdfTablesArgs,
  env: Bindings
): Promise<{
  data: string | any[]; // CSV string or JSON array
  format: 'csv' | 'json';
  pageCount?: number;
  rowCount?: number;
  warnings?: string[];
  remainingCredits?: number;
}> {
  const { fileUrl, pages, outputFormat, columnDetectionMode } = args;

  // Validate file URL
  try {
    new URL(fileUrl);
  } catch {
    throw new Error('Invalid file URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  // Extract tables using PDF.co
  let pdfcoResponse;
  try {
    pdfcoResponse = await extractPdfTables(
      {
        url: fileUrl,
        pages: pages || '0-', // Default: all pages (0-based)
        inline: true, // Get CSV content inline
        columnDetectionMode:
          columnDetectionMode || 'ContentGroupsAndBorders', // Default mode
        async: false,
      },
      env
    );
  } catch (error: any) {
    throw new Error(`PDF table extraction failed: ${error.message}`);
  }

  // Check if PDF.co returned CSV data
  if (!pdfcoResponse.body && !pdfcoResponse.url) {
    throw new Error(
      'PDF.co extraction succeeded but did not return data. Please retry.'
    );
  }

  // Get CSV content (either inline or download from URL)
  let csvContent: string;

  if (pdfcoResponse.body) {
    // Inline response
    csvContent = pdfcoResponse.body;
  } else if (pdfcoResponse.url) {
    // Download from URL
    let csvResponse: Response;
    try {
      csvResponse = await fetch(pdfcoResponse.url);
      if (!csvResponse.ok) {
        throw new Error(
          `Failed to download CSV: HTTP ${csvResponse.status}`
        );
      }
    } catch (error: any) {
      throw new Error(
        `Failed to download CSV from PDF.co: ${error.message}`
      );
    }
    csvContent = await csvResponse.text();
  } else {
    throw new Error('No CSV data returned from PDF.co');
  }

  // Strip UTF-8 BOM if present
  csvContent = stripBOM(csvContent);

  // Check if empty (no tables found)
  const isEmpty = !csvContent || csvContent.trim().length === 0;

  const warnings: string[] = [];

  if (isEmpty) {
    warnings.push(
      'No tables found in the PDF. The document may not contain structured tables, or they may be images.'
    );
  }

  // Handle output format
  const format = outputFormat || 'csv';
  let data: string | any[];
  let rowCount: number | undefined;

  if (format === 'json') {
    // Parse CSV to JSON
    if (isEmpty) {
      data = [];
      rowCount = 0;
    } else {
      data = parseCSVToJSON(csvContent);
      rowCount = data.length;
    }
  } else {
    // Return CSV as string
    data = csvContent;
    if (!isEmpty) {
      const lines = csvContent.trim().split('\n');
      rowCount = Math.max(0, lines.length - 1); // Subtract header row
    } else {
      rowCount = 0;
    }
  }

  // Add page indexing warning
  if (pages) {
    warnings.push(
      `Extracted from pages: "${pages}". Page indexing is 0-based (first page = 0).`
    );
  } else {
    warnings.push('Extracted from all pages. Page indexing is 0-based (first page = 0).');
  }

  return {
    data,
    format,
    pageCount: pdfcoResponse.pageCount,
    rowCount,
    ...(warnings.length > 0 && { warnings }),
    remainingCredits: pdfcoResponse.remainingCredits,
  };
}
