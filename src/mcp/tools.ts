import type { MCPTool } from './types';

// Tool Registry
export const tools: MCPTool[] = [
  // Phase 2: Browser Rendering PDFs (3 tools)
  {
    name: 'html_to_pdf',
    description: 'Convert HTML/CSS to PDF document using Cloudflare Browser Rendering. Returns publicly accessible URL to generated PDF. Supports custom page formats, margins, and landscape orientation.',
    inputSchema: {
      type: 'object',
      properties: {
        html: {
          type: 'string',
          description: 'HTML content to convert (must be valid HTML). Can include inline CSS styles or <style> tags.',
        },
        format: {
          type: 'string',
          enum: ['A4', 'Letter', 'Legal'],
          description: 'Paper size format. Default: A4 (210mm × 297mm). Letter: 8.5in × 11in. Legal: 8.5in × 14in.',
        },
        landscape: {
          type: 'boolean',
          description: 'Enable landscape orientation (width > height). Default: false (portrait).',
        },
        margin: {
          type: 'object',
          properties: {
            top: { type: 'string', description: 'Top margin (e.g., "1cm", "20px", "0.5in")' },
            right: { type: 'string', description: 'Right margin' },
            bottom: { type: 'string', description: 'Bottom margin' },
            left: { type: 'string', description: 'Left margin' },
          },
          description: 'Page margins. Default: 1cm all sides. Supports units: cm, mm, in, px.',
        },
      },
      required: ['html'],
    },
  },
  {
    name: 'url_to_pdf',
    description: 'Convert any publicly accessible webpage to PDF by URL using Cloudflare Browser Rendering. Captures the full rendered page including CSS, JavaScript, and images. Returns publicly accessible URL to generated PDF.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'URL of webpage to convert (must be publicly accessible via HTTP/HTTPS). Example: https://example.com',
        },
        format: {
          type: 'string',
          enum: ['A4', 'Letter', 'Legal'],
          description: 'Paper size format. Default: A4.',
        },
        landscape: {
          type: 'boolean',
          description: 'Enable landscape orientation. Default: false.',
        },
        margin: {
          type: 'object',
          properties: {
            top: { type: 'string', description: 'Top margin (e.g., "1cm")' },
            right: { type: 'string', description: 'Right margin' },
            bottom: { type: 'string', description: 'Bottom margin' },
            left: { type: 'string', description: 'Left margin' },
          },
          description: 'Page margins. Default: 1cm all sides.',
        },
      },
      required: ['url'],
    },
  },
  {
    name: 'markdown_to_pdf',
    description: 'Convert markdown to beautifully styled PDF document using Cloudflare Browser Rendering. Automatically applies professional typography, syntax highlighting for code blocks, and table styling. Returns publicly accessible URL to generated PDF.',
    inputSchema: {
      type: 'object',
      properties: {
        markdown: {
          type: 'string',
          description: 'Markdown content to convert. Supports full CommonMark syntax: headings, lists, code blocks, tables, blockquotes, links, images.',
        },
        format: {
          type: 'string',
          enum: ['A4', 'Letter', 'Legal'],
          description: 'Paper size format. Default: A4.',
        },
        landscape: {
          type: 'boolean',
          description: 'Enable landscape orientation. Default: false.',
        },
        margin: {
          type: 'object',
          properties: {
            top: { type: 'string', description: 'Top margin' },
            right: { type: 'string', description: 'Right margin' },
            bottom: { type: 'string', description: 'Bottom margin' },
            left: { type: 'string', description: 'Left margin' },
          },
          description: 'Page margins. Default: 1cm all sides.',
        },
        css: {
          type: 'string',
          description: 'Optional custom CSS to append to default styles. Can override fonts, colors, spacing, etc.',
        },
      },
      required: ['markdown'],
    },
  },

  // Phase 3: Browser Rendering Screenshots (2 tools)
  {
    name: 'html_to_screenshot',
    description: 'Convert HTML/CSS to screenshot image (PNG, JPEG, or WebP) using Cloudflare Browser Rendering. Captures full page or custom viewport. Returns publicly accessible URL to generated image. Ideal for visual previews, thumbnails, or capturing dynamically generated content.',
    inputSchema: {
      type: 'object',
      properties: {
        html: {
          type: 'string',
          description: 'HTML content to capture (must be valid HTML). Can include inline CSS styles or <style> tags.',
        },
        format: {
          type: 'string',
          enum: ['png', 'jpeg', 'webp'],
          description: 'Image format. Default: png. PNG supports transparency, JPEG is smaller, WebP is most efficient.',
        },
        fullPage: {
          type: 'boolean',
          description: 'Capture full page height (true) or single viewport (false). Default: true.',
        },
        viewport: {
          type: 'object',
          properties: {
            width: { type: 'number', description: 'Viewport width in pixels. Default: 1280' },
            height: { type: 'number', description: 'Viewport height in pixels. Default: 720' },
          },
          description: 'Custom viewport size for screenshot. Uses 2x device scale for sharp images.',
        },
      },
      required: ['html'],
    },
  },
  {
    name: 'url_to_screenshot',
    description: 'Capture screenshot of any publicly accessible webpage by URL using Cloudflare Browser Rendering. Waits for page load and network idle. Supports full page capture or custom viewport. Returns publicly accessible URL to generated image.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'URL of webpage to capture (must be publicly accessible via HTTP/HTTPS). Example: https://example.com',
        },
        format: {
          type: 'string',
          enum: ['png', 'jpeg', 'webp'],
          description: 'Image format. Default: png.',
        },
        fullPage: {
          type: 'boolean',
          description: 'Capture full page height (true) or single viewport (false). Default: true.',
        },
        viewport: {
          type: 'object',
          properties: {
            width: { type: 'number', description: 'Viewport width in pixels. Default: 1280' },
            height: { type: 'number', description: 'Viewport height in pixels. Default: 720' },
          },
          description: 'Custom viewport size for screenshot.',
        },
      },
      required: ['url'],
    },
  },

  // Phase 4: Workers AI Markdown (1 tool)
  {
    name: 'document_to_markdown',
    description: 'Convert documents (PDF, DOCX, XLSX, images) to RAG-ready markdown using Workers AI. Supports all major document formats and uses AI vision models for images (object detection + summarization). Returns structured markdown text ideal for RAG applications, embeddings, and text analysis.',
    inputSchema: {
      type: 'object',
      properties: {
        fileUrl: {
          type: 'string',
          description: 'Publicly accessible URL to document file. Supported formats: .pdf, .docx, .xlsx, .xls, .xlsm, .xlsb, .ods, .odt, .csv, .html, .xml, .jpeg, .jpg, .png, .webp, .svg, .numbers',
        },
        fileName: {
          type: 'string',
          description: 'Optional file name with extension. If not provided, will be extracted from URL. Used to determine file type.',
        },
      },
      required: ['fileUrl'],
    },
  },

  // Phase 5: PDF.co Data Extraction (1 tool)
  {
    name: 'excel_to_json',
    description: 'Parse Excel spreadsheets (xls, xlsx, csv) to structured JSON using PDF.co API. Supports multi-sheet workbooks via worksheetIndex parameter. Extracts calculated cell values (formulas are computed, not extracted as text). Returns both JSON data and permanent R2 storage URL. Ideal for data extraction, analysis, and processing.',
    inputSchema: {
      type: 'object',
      properties: {
        fileUrl: {
          type: 'string',
          description: 'Publicly accessible URL to Excel file. Supported formats: .xls, .xlsx, .csv. File must be downloadable without authentication.',
        },
        worksheetIndex: {
          type: 'string',
          description: 'Optional 1-based worksheet index (default: "1" for first sheet). Use "2" for second sheet, "3" for third, etc. Only one worksheet is converted per call.',
        },
      },
      required: ['fileUrl'],
    },
  },

  // Phase 6: PDF.co Office Conversions (1 tool)
  {
    name: 'office_to_pdf',
    description: 'Convert Office documents (DOCX, DOC, XLSX, XLS, PPTX, PPT, RTF, TXT, CSV, XPS) to PDF using PDF.co API. Returns permanently stored PDF URL. NOTE: PowerPoint files (PPT/PPTX) have limited support - PDF.co may not provide assistance for rendering issues. Office macros are disabled. For Excel files, use worksheetIndex to convert specific sheet (1=first, 2=second, etc.) or omit to convert all sheets.',
    inputSchema: {
      type: 'object',
      properties: {
        fileUrl: {
          type: 'string',
          description: 'Publicly accessible URL to Office file. Supported formats: .doc, .docx, .xls, .xlsx, .ppt, .pptx, .csv, .rtf, .txt, .xps. File must be downloadable without authentication.',
        },
        worksheetIndex: {
          type: 'number',
          description: 'Excel files only: 1-based worksheet index to convert. Use 1 for first sheet, 2 for second, etc. Omit to convert all sheets to multi-page PDF. This parameter is ignored for non-Excel files.',
        },
        autosize: {
          type: 'boolean',
          description: 'Excel files only: Auto-adjust page dimensions to fit content. Recommended for better readability. Default: false. This parameter is ignored for non-Excel files.',
        },
      },
      required: ['fileUrl'],
    },
  },

  // Phase 7: PDF.co PDF Operations
  {
    name: 'merge_pdfs',
    description: 'Combine multiple PDF files into a single PDF with optional bookmarks using PDF.co API. Returns permanently stored PDF URL. IMPORTANT: Requires at least 2 PDF URLs. If bookmarkTitles provided, array length must match fileUrls length. Bookmarks help navigate large merged documents.',
    inputSchema: {
      type: 'object',
      properties: {
        fileUrls: {
          type: 'array',
          items: { type: 'string' },
          description: 'Array of publicly accessible PDF file URLs to merge (minimum 2). Files must be downloadable without authentication. Example: ["https://example.com/file1.pdf", "https://example.com/file2.pdf"]',
          minItems: 2,
        },
        bookmarkTitles: {
          type: 'array',
          items: { type: 'string' },
          description: 'Optional bookmark titles for each PDF. Must match fileUrls length exactly. Bookmarks appear in PDF readers for easy navigation. Example: ["Introduction", "Chapter 1", "Conclusion"]',
        },
      },
      required: ['fileUrls'],
    },
  },
  {
    name: 'split_pdf',
    description: 'Split PDF into multiple files by extracting specific page ranges using PDF.co API. Returns array of permanently stored PDF URLs. IMPORTANT: Page indexing is 1-based (first page = 1, not 0). Use "*" to split into individual pages. Supports ranges like "1-2,3-" or "!0" for last page.',
    inputSchema: {
      type: 'object',
      properties: {
        fileUrl: {
          type: 'string',
          description: 'Publicly accessible PDF file URL. Must be downloadable without authentication.',
        },
        pages: {
          type: 'string',
          description: 'Page ranges to extract (1-based indexing). Examples: "*" = split into individual pages, "1-2,3-" = pages 1-2 and 3 to end, "1,3,5" = specific pages only, "!0" = last page, "!1" = second-to-last. Default: "*" (all pages individually).',
        },
      },
      required: ['fileUrl'],
    },
  },
  {
    name: 'extract_pdf_tables',
    description: 'Extract table data from PDF as CSV or JSON using PDF.co API. Returns structured data with row counts. CRITICAL: Page indexing is 0-based (first page = 0, not 1) - different from split_pdf! Use "0-" for all pages. Returns empty data if no tables found. Supports multiple column detection modes for different table styles.',
    inputSchema: {
      type: 'object',
      properties: {
        fileUrl: {
          type: 'string',
          description: 'Publicly accessible PDF file URL. Must be downloadable without authentication.',
        },
        pages: {
          type: 'string',
          description: 'Page range to extract (0-based indexing). Examples: "0-" = all pages, "0" = first page only, "1,2,3-7" = specific pages. Default: "0-" (all pages).',
        },
        outputFormat: {
          type: 'string',
          enum: ['csv', 'json'],
          description: 'Output format. "csv" returns raw CSV string, "json" returns parsed array of objects. Default: "csv".',
        },
        columnDetectionMode: {
          type: 'string',
          enum: ['ContentGroupsAndBorders', 'ContentGroups', 'Borders', 'BorderedTables', 'ContentGroupsAI'],
          description: 'Table detection mode. ContentGroupsAndBorders (default): balanced detection. BorderedTables: for tables with borders. ContentGroupsAI: AI-powered detection for borderless tables. ContentGroups: text grouping only. Borders: border lines only.',
        },
      },
      required: ['fileUrl'],
    },
  },

  // Phase 8: Browser Rendering Images
  {
    name: 'pdf_to_images',
    description: 'Convert PDF pages to individual images (PNG, JPEG, or WebP). Returns array of publicly accessible image URLs (one per page). Uses PDF.co API for high-quality rendering at 150 DPI. Permanently stores images in R2. IMPORTANT: Page indexing is 0-based in source API. Ideal for PDF thumbnails, page previews, and visual analysis.',
    inputSchema: {
      type: 'object',
      properties: {
        fileUrl: {
          type: 'string',
          description: 'Publicly accessible URL to PDF file. Must be downloadable without authentication. Example: https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        },
        format: {
          type: 'string',
          enum: ['png', 'jpeg', 'webp'],
          description: 'Image format. Default: png (lossless, best quality). jpeg: smaller files, lossy compression. webp: best compression efficiency. Choose PNG for text-heavy PDFs, JPEG for photo-heavy documents.',
        },
      },
      required: ['fileUrl'],
    },
  },
  {
    name: 'document_to_images',
    description: 'Convert Office documents (DOCX, PPTX, XLSX, etc.) to images via two-step process: Office→PDF→Images. Returns array of publicly accessible image URLs. Supports all Phase 6 Office formats (.doc, .docx, .ppt, .pptx, .xls, .xlsx, .csv, .rtf, .txt, .xps). Permanently stores images in R2. IDEAL FOR: Presentation slide previews, document thumbnails, visual content extraction.',
    inputSchema: {
      type: 'object',
      properties: {
        fileUrl: {
          type: 'string',
          description: 'Publicly accessible URL to Office document. Supported formats: .doc, .docx, .ppt, .pptx, .xls, .xlsx, .csv, .rtf, .txt, .xps. Must be downloadable without authentication.',
        },
        format: {
          type: 'string',
          enum: ['png', 'jpeg', 'webp'],
          description: 'Image format. Default: png. Same options as pdf_to_images: PNG for quality, JPEG for smaller size, WebP for best compression.',
        },
      },
      required: ['fileUrl'],
    },
  },
];

// Total: 13 tools (Phase 8 complete!)
export const getToolByName = (name: string): MCPTool | undefined => {
  return tools.find((tool) => tool.name === name);
};
