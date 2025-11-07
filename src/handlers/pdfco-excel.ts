import type { Bindings } from '../mcp/types';
import { convertExcelToJson } from '../lib/pdfco-client';
import { uploadToR2 } from '../lib/r2-storage';

// Type definition for handler arguments
export interface ExcelToJsonArgs {
  fileUrl: string;
  worksheetIndex?: string; // 1-based index (default: "1")
}

/**
 * Convert Excel spreadsheet to JSON using PDF.co API
 * Supports: xls, xlsx, csv
 * Multi-sheet: Specify worksheetIndex (1-based, default = first sheet)
 * Formula handling: Extracts calculated values only (not raw formulas)
 *
 * @param args - File URL and optional worksheet index
 * @param env - Worker bindings
 * @returns JSON data and public R2 URL for permanent storage
 */
export async function excelToJson(
  args: ExcelToJsonArgs,
  env: Bindings
): Promise<{
  jsonUrl: string;
  jsonData: any;
  worksheetIndex: string;
  remainingCredits?: number;
}> {
  const { fileUrl, worksheetIndex } = args;

  // Validate file URL
  try {
    new URL(fileUrl);
  } catch {
    throw new Error('Invalid file URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  // Validate worksheet index if provided
  const wsIndex = worksheetIndex || '1';
  const wsIndexNum = parseInt(wsIndex, 10);
  if (isNaN(wsIndexNum) || wsIndexNum < 1) {
    throw new Error(
      'Invalid worksheetIndex. Must be a positive integer (1 for first sheet, 2 for second, etc.)'
    );
  }

  // Convert Excel to JSON using PDF.co
  let pdfcoResponse;
  try {
    pdfcoResponse = await convertExcelToJson(
      {
        url: fileUrl,
        worksheetIndex: wsIndex,
        async: false, // Sync mode for simplicity
        inline: false, // Get S3 URL (we'll download and re-upload to R2)
      },
      env
    );
  } catch (error: any) {
    // Re-throw with context
    throw new Error(`Excel conversion failed: ${error.message}`);
  }

  // Check if PDF.co returned a valid URL
  if (!pdfcoResponse.url) {
    throw new Error(
      'PDF.co conversion succeeded but did not return a download URL. Please retry.'
    );
  }

  // Download JSON from PDF.co S3 (expires in 60 minutes)
  let jsonResponse: Response;
  try {
    jsonResponse = await fetch(pdfcoResponse.url);
    if (!jsonResponse.ok) {
      throw new Error(
        `Failed to download converted JSON: HTTP ${jsonResponse.status}`
      );
    }
  } catch (error: any) {
    throw new Error(
      `Failed to download JSON from PDF.co: ${error.message}. The file may have expired.`
    );
  }

  // Parse JSON data
  let jsonData: any;
  try {
    // Get text and strip BOM if present (PDF.co sometimes adds UTF-8 BOM)
    let jsonText = await jsonResponse.text();
    if (jsonText.charCodeAt(0) === 0xFEFF) {
      jsonText = jsonText.slice(1);
    }
    jsonData = JSON.parse(jsonText);
  } catch (error: any) {
    throw new Error(
      `Failed to parse JSON data: ${error.message}. The converted file may be corrupted.`
    );
  }

  // Download as buffer for R2 upload
  const jsonText = JSON.stringify(jsonData, null, 2);
  const jsonBuffer = new TextEncoder().encode(jsonText);

  // Upload to R2 for permanent storage
  const isDev = fileUrl.includes('localhost') || fileUrl.includes('127.0.0.1');
  const fileName = `excel-to-json/${Date.now()}-${crypto.randomUUID()}.json`;

  const r2Url = await uploadToR2(
    env.R2_BUCKET,
    fileName,
    jsonBuffer,
    'application/json',
    isDev
  );

  return {
    jsonUrl: r2Url,
    jsonData,
    worksheetIndex: wsIndex,
    remainingCredits: pdfcoResponse.remainingCredits,
  };
}
