# API Endpoints: File Converter MCP Server

**Base URL**: `https://file-converter-mcp.YOUR_SUBDOMAIN.workers.dev`
**Transport**: HTTP JSON-RPC 2.0
**Auth**: Bearer token required for `/mcp` endpoint

---

## Health Check

### GET /health

**Purpose**: Check if MCP server is operational

**Auth**: None (public)

**Response** (200):
```json
{
  "status": "ok",
  "version": "1.0.0",
  "tools": [
    "convert_to_pdf",
    "extract_as_markdown",
    "convert_excel_to_json",
    "get_file_metadata",
    "convert_pptx_to_images"
  ],
  "bindings": {
    "ai": true,
    "r2": true
  },
  "apis": {
    "pdfco": "connected"
  }
}
```

---

## MCP Endpoint

### POST /mcp

**Purpose**: MCP JSON-RPC 2.0 endpoint for tool execution

**Auth**: Bearer token required

**Headers**:
- `Authorization: Bearer YOUR_TOKEN`
- `Content-Type: application/json`

**Request Format** (JSON-RPC 2.0):
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "html_to_pdf",
    "arguments": {
      "html": "<h1>Test</h1>",
      "format": "A4"
    }
  }
}
```

**Response Format**:
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "content": [{
      "type": "text",
      "text": "{\"pdfUrl\":\"https://...\"}"
    }]
  }
}
```

**Supported Methods**:
- `initialize` - Protocol handshake
- `tools/list` - Get all available tools
- `tools/call` - Execute a specific tool

---

## MCP Tools

All tools are called via the `POST /mcp` endpoint with method `tools/call`. Below are their schemas and behaviors.

---

### Tool: convert_to_pdf

**Description**: Convert documents to PDF format (DOCX, XLSX, PPTX, images, HTML)

**Input Schema**:
```typescript
{
  fileUrl: string;        // Public URL to source file
  sourceFormat: "docx" | "xlsx" | "pptx" | "jpg" | "png" | "html";
  filename: string;       // Original filename (for R2 naming)
}
```

**Output Schema**:
```typescript
{
  pdfUrl: string;         // Public R2 URL to converted PDF
  pageCount: number;      // Number of pages
  fileSize: number;       // Size in bytes
  format: "pdf";
  expires_at: string;     // ISO timestamp (24 hours from conversion)
}
```

**Example Call**:
```json
{
  "tool": "convert_to_pdf",
  "params": {
    "fileUrl": "https://blob.vercel-storage.com/contract.docx",
    "sourceFormat": "docx",
    "filename": "contract.docx"
  }
}
```

**Example Response**:
```json
{
  "pdfUrl": "https://r2.yourdomain.com/converted/abc-123-contract.pdf",
  "pageCount": 12,
  "fileSize": 245678,
  "format": "pdf",
  "expires_at": "2025-11-07T10:15:30Z"
}
```

**Errors**:
- `400`: Invalid file URL or unsupported format
- `413`: File too large (>50MB)
- `422`: File format mismatch (extension doesn't match sourceFormat)
- `500`: PDF.co API error or conversion failed
- `504`: Conversion timeout (>30 seconds)

---

### Tool: extract_as_markdown

**Description**: Extract document content as Markdown (preserves structure, good for RAG)

**Input Schema**:
```typescript
{
  fileUrl: string;        // Public URL to source file
  sourceFormat: "pdf" | "docx" | "html";
}
```

**Output Schema**:
```typescript
{
  markdown: string;       // Full markdown content
  wordCount: number;      // Approximate word count
  sections: string[];     // H1/H2 headings extracted
  method: "cloudflare-ai" | "pdfco";  // Which API was used
}
```

**Example Call**:
```json
{
  "tool": "extract_as_markdown",
  "params": {
    "fileUrl": "https://blob.vercel-storage.com/whitepaper.pdf",
    "sourceFormat": "pdf"
  }
}
```

**Example Response**:
```json
{
  "markdown": "# Whitepaper Title\n\n## Introduction\n\nLorem ipsum...",
  "wordCount": 2500,
  "sections": ["Whitepaper Title", "Introduction", "Methods", "Results"],
  "method": "cloudflare-ai"
}
```

**Behavior**:
- Tries Cloudflare Workers AI first (free)
- Falls back to PDF.co if Workers AI fails
- Preserves headings, lists, tables, bold/italic
- Removes images (text-only extraction)

**Errors**:
- `400`: Invalid file URL or unsupported format
- `413`: File too large (>50MB)
- `422`: Text extraction failed (scanned PDF without OCR)
- `500`: Both Cloudflare AI and PDF.co failed

---

### Tool: convert_excel_to_json

**Description**: Convert Excel files to structured JSON (better than CSV for complex data)

**Input Schema**:
```typescript
{
  fileUrl: string;        // Public URL to Excel file
  sheetName?: string;     // Optional: specific sheet to convert
}
```

**Output Schema**:
```typescript
{
  data: Record<string, any>[];  // Array of row objects
  sheetNames: string[];          // All sheets in workbook
  rowCount: number;              // Total rows (excluding header)
  columnCount: number;           // Total columns
  selectedSheet: string;         // Which sheet was converted
}
```

**Example Call**:
```json
{
  "tool": "convert_excel_to_json",
  "params": {
    "fileUrl": "https://blob.vercel-storage.com/sales-data.xlsx",
    "sheetName": "Q4 Sales"
  }
}
```

**Example Response**:
```json
{
  "data": [
    {
      "Month": "October",
      "Sales": 450000,
      "Region": "APAC",
      "Growth": 0.15
    },
    {
      "Month": "November",
      "Sales": 520000,
      "Region": "APAC",
      "Growth": 0.18
    }
  ],
  "sheetNames": ["Q4 Sales", "Q4 Costs", "Summary"],
  "rowCount": 48,
  "columnCount": 4,
  "selectedSheet": "Q4 Sales"
}
```

**Behavior**:
- If `sheetName` not provided, converts first sheet
- Formulas converted to values
- Merged cells: Uses top-left cell value
- Empty rows skipped

**Errors**:
- `400`: Invalid file URL or not an Excel file
- `404`: Sheet name not found in workbook
- `413`: File too large (>50MB)
- `500`: PDF.co API error

---

### Tool: get_file_metadata

**Description**: Get document information without converting (page count, size, etc.)

**Input Schema**:
```typescript
{
  fileUrl: string;        // Public URL to file
}
```

**Output Schema**:
```typescript
{
  fileType: string;       // MIME type
  extension: string;      // File extension (e.g., "pdf")
  fileSize: number;       // Size in bytes
  pageCount?: number;     // For PDFs and Office docs
  wordCount?: number;     // Estimate for DOCX
  createdDate?: string;   // ISO timestamp from file metadata
  author?: string;        // For Office files with author metadata
  sheetCount?: number;    // For Excel files
}
```

**Example Call**:
```json
{
  "tool": "get_file_metadata",
  "params": {
    "fileUrl": "https://blob.vercel-storage.com/report.pdf"
  }
}
```

**Example Response**:
```json
{
  "fileType": "application/pdf",
  "extension": "pdf",
  "fileSize": 1245678,
  "pageCount": 45,
  "createdDate": "2025-10-15T08:30:00Z",
  "author": "John Doe"
}
```

**Behavior**:
- Fast operation (<2 seconds)
- Uses HEAD request when possible (no full download)
- For PDFs: Calls PDF.co `pdf_info_reader` API
- For DOCX: Estimates pages (wordCount / 500)

**Errors**:
- `400`: Invalid file URL
- `404`: File not found at URL
- `413`: File too large to analyze (>100MB)

---

### Tool: convert_pptx_to_images

**Description**: Extract PowerPoint slides as images (one image per slide)

**Input Schema**:
```typescript
{
  fileUrl: string;         // Public URL to PPTX file
  imageFormat: "png" | "jpg";  // Output image format
  slideRange?: {
    start: number;         // 1-indexed (optional)
    end: number;           // 1-indexed (optional)
  };
}
```

**Output Schema**:
```typescript
{
  imageUrls: string[];     // Array of R2 URLs (one per slide)
  slideCount: number;      // Total slides converted
  imageFormat: "png" | "jpg";
  expires_at: string;      // ISO timestamp (24 hours)
}
```

**Example Call**:
```json
{
  "tool": "convert_pptx_to_images",
  "params": {
    "fileUrl": "https://blob.vercel-storage.com/pitch-deck.pptx",
    "imageFormat": "png",
    "slideRange": { "start": 1, "end": 5 }
  }
}
```

**Example Response**:
```json
{
  "imageUrls": [
    "https://r2.yourdomain.com/converted/pitch-deck-slide-1.png",
    "https://r2.yourdomain.com/converted/pitch-deck-slide-2.png",
    "https://r2.yourdomain.com/converted/pitch-deck-slide-3.png",
    "https://r2.yourdomain.com/converted/pitch-deck-slide-4.png",
    "https://r2.yourdomain.com/converted/pitch-deck-slide-5.png"
  ],
  "slideCount": 5,
  "imageFormat": "png",
  "expires_at": "2025-11-07T10:15:30Z"
}
```

**Behavior**:
- First converts PPTX → PDF (via PDF.co)
- Then converts PDF → Images (one per page/slide)
- Uploads all images to R2 in parallel
- If `slideRange` not provided, converts all slides

**Errors**:
- `400`: Invalid file URL or not a PPTX file
- `413`: File too large (>50MB) or too many slides (>100)
- `422`: Invalid slide range (start > end, or out of bounds)
- `500`: PDF.co API error or R2 upload failed

---

## Error Response Format

All errors follow this structure:

```typescript
{
  error: {
    code: string;          // Machine-readable error code
    message: string;       // Human-readable message
    details?: any;         // Optional additional context
  }
}
```

**Example Error**:
```json
{
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File size 75MB exceeds maximum 50MB",
    "details": {
      "fileSize": 78643200,
      "maxSize": 52428800
    }
  }
}
```

**Common Error Codes**:
- `INVALID_URL`: File URL is malformed or inaccessible
- `FILE_TOO_LARGE`: File exceeds 50MB limit
- `UNSUPPORTED_FORMAT`: File format not supported for this tool
- `FORMAT_MISMATCH`: File extension doesn't match declared sourceFormat
- `CONVERSION_FAILED`: PDF.co or Workers AI returned error
- `TIMEOUT`: Operation exceeded 30-second limit
- `R2_UPLOAD_FAILED`: Could not store converted file
- `RATE_LIMIT_EXCEEDED`: Too many requests (>100/min)
- `API_QUOTA_EXHAUSTED`: PDF.co credits depleted

---

## Rate Limiting

**Limits**:
- 100 requests per minute per IP address
- 1000 requests per hour per IP address

**Headers** (included in responses):
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1699012345
```

**Rate Limit Error** (429):
```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Try again in 42 seconds.",
    "details": {
      "retryAfter": 42
    }
  }
}
```

---

## CORS Configuration

**Allowed Origins**:
- `https://better-chatbot.yourdomain.com` (production)
- `http://localhost:3000` (development)

**Allowed Methods**:
- `GET`, `POST`, `OPTIONS`

**Allowed Headers**:
- `Content-Type`, `Accept`, `Authorization`

**Exposed Headers**:
- `X-RateLimit-*` headers

---

## Monitoring Endpoints

### GET /metrics (Future)

**Purpose**: Prometheus-compatible metrics

**Response** (200):
```
# HELP mcp_tool_calls_total Total number of tool calls
# TYPE mcp_tool_calls_total counter
mcp_tool_calls_total{tool="convert_to_pdf",status="success"} 1234
mcp_tool_calls_total{tool="convert_to_pdf",status="error"} 45

# HELP mcp_tool_duration_seconds Duration of tool calls
# TYPE mcp_tool_duration_seconds histogram
mcp_tool_duration_seconds_bucket{tool="convert_to_pdf",le="5"} 890
mcp_tool_duration_seconds_bucket{tool="convert_to_pdf",le="10"} 1150
mcp_tool_duration_seconds_bucket{tool="convert_to_pdf",le="30"} 1234
```

---

## Testing Endpoints

**Not included in production** (use `wrangler dev` locally):

### POST /test/convert-to-pdf

Test `convert_to_pdf` tool without MCP transport

**Request**:
```json
{
  "fileUrl": "https://example.com/test.docx",
  "sourceFormat": "docx",
  "filename": "test.docx"
}
```

**Response**: Same as tool output schema

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-11-06 | Initial release with 5 tools |

---

## Client Integration Examples

### cURL Example

```bash
# Test health check
curl https://file-converter-mcp.your-worker.workers.dev/health

# Connect to SSE endpoint
curl -N -H "Accept: text/event-stream" \
  https://file-converter-mcp.your-worker.workers.dev/sse
```

### MCP Client Config (Better-Chatbot)

```json
{
  "mcpServers": {
    "file-converter": {
      "url": "https://file-converter-mcp.your-worker.workers.dev/sse",
      "transport": "sse",
      "description": "Convert documents and extract content"
    }
  }
}
```

### TypeScript MCP Client Example

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { SSEClientTransport } from '@modelcontextprotocol/sdk/client/sse.js';

const transport = new SSEClientTransport(
  new URL('https://file-converter-mcp.your-worker.workers.dev/sse')
);

const client = new Client({
  name: 'better-chatbot',
  version: '1.0.0',
}, {
  capabilities: {}
});

await client.connect(transport);

// Call tool
const result = await client.callTool({
  name: 'convert_to_pdf',
  arguments: {
    fileUrl: 'https://blob.vercel.com/file.docx',
    sourceFormat: 'docx',
    filename: 'file.docx'
  }
});

console.log(result); // { pdfUrl: "...", pageCount: 12, ... }
```
