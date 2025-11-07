# File Converter MCP Server - Project Context

**Project Type**: Cloudflare Workers MCP Server
**Status**: ✅ DEPLOYED TO PRODUCTION (All 13 tools complete)
**Production URL**: https://file-converter-mcp.webfonts.workers.dev
**Owner**: Jeremy Dawes (jeremy@jezweb.net)

---

## Project Overview

A Model Context Protocol (MCP) server built on Cloudflare Workers that provides comprehensive document conversion capabilities for AI agents in better-chatbot.

### Core Strategy

**Cloudflare-First Architecture**: Maximize Cloudflare's native capabilities (Browser Rendering, Workers AI, R2) and strategically use PDF.co for specialized operations it excels at.

---

## Tool Set (13 Tools)

### PDF Generation (Cloudflare Browser Rendering)
1. **html_to_pdf** - Convert HTML/CSS to PDF (invoices, reports, certificates)
2. **url_to_pdf** - Convert any webpage to PDF
3. **markdown_to_pdf** - Convert markdown to styled PDF

### Screenshot Capture (Cloudflare Browser Rendering)
4. **html_to_screenshot** - Generate PNG/JPG from HTML
5. **url_to_screenshot** - Capture webpage screenshots
6. **pdf_to_images** - Convert PDF pages to images
7. **document_to_images** - Convert DOCX/PPTX/XLSX to images (2-step: office→pdf→images)

### Document Processing (Workers AI)
8. **document_to_markdown** - Convert PDF/DOCX/XLSX/images to markdown (for RAG)

### Data Extraction (PDF.co)
9. **excel_to_json** - Parse Excel to structured JSON with formulas, multi-sheet support
10. **office_to_pdf** - High-quality DOCX/PPTX/XLSX → PDF conversions

### PDF Operations (PDF.co)
11. **merge_pdfs** - Combine multiple PDFs with bookmarks
12. **split_pdf** - Extract specific page ranges
13. **extract_pdf_tables** - Pull table data from PDFs as CSV/JSON

---

## Architecture

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Compute** | Cloudflare Workers | Serverless edge deployment |
| **Framework** | Hono | HTTP routing & middleware |
| **Protocol** | MCP (HTTP JSON-RPC 2.0) | Agent integration |
| **PDF/Screenshots** | Browser Rendering (Puppeteer) | HTML→PDF, screenshots |
| **AI Processing** | Workers AI | Document→markdown conversion |
| **Data Extraction** | PDF.co API | Excel parsing, Office conversions, PDF ops |
| **Storage** | Cloudflare R2 | Permanent file hosting |
| **Auth** | Bearer token | API security |
| **Validation** | Zod | Type-safe schemas |

### Pattern (from cloudflare-mcp-toolbox)

```
src/
├── index.ts                    # Hono app, auth, discovery page
├── mcp/
│   ├── server.ts              # JSON-RPC dispatcher
│   ├── tools.ts               # Tool registry (13 tools)
│   └── types.ts               # TypeScript types
├── handlers/                   # Tool implementations
│   ├── browser-pdf.ts
│   ├── browser-screenshot.ts
│   ├── browser-images.ts
│   ├── ai-markdown.ts
│   ├── pdfco-data.ts
│   ├── pdfco-convert.ts
│   └── pdfco-operations.ts
├── lib/                        # API clients & utilities
│   ├── browser-client.ts
│   ├── pdfco-client.ts
│   ├── ai-client.ts
│   ├── file-fetcher.ts
│   └── r2-storage.ts
└── utils/
    └── responses.ts            # MCP response builders
```

**Key Principles**:
- Centralized tool registry in `mcp/tools.ts`
- Separate handler logic from MCP protocol logic
- Response helpers for consistency
- Type-safe bindings throughout

---

## Configuration

### Environment Variables

```bash
# .dev.vars (local development)
PDFCO_API_KEY=jeremy@jezweb.net_iHRiPdX1Llzuz6zRaQmgRM0iHyK8foxJzmwWQGQQLwlZYyMKvGG6cyRZONpUTvEW
AUTH_TOKEN=your_bearer_token_here
```

### Wrangler Configuration

```jsonc
{
  "name": "file-converter-mcp",
  "main": "src/index.ts",
  "compatibility_date": "2024-01-01",
  "compatibility_flags": ["nodejs_compat"],
  "browser": {
    "binding": "BROWSER"
  },
  "ai": {
    "binding": "AI"
  },
  "r2_buckets": [
    {
      "binding": "R2_BUCKET",
      "bucket_name": "converted-files"
    }
  ]
}
```

**Critical**: `nodejs_compat` flag required for Puppeteer support

### R2 Storage Policy

**Default**: No auto-deletion (files persist indefinitely)

**Rationale**:
- Low user volume expected
- R2 10GB free tier accommodates ~100,000 PDFs
- Simpler implementation without lifecycle management
- Easy to enable TTL later if needed

**To Enable TTL** (future):
```typescript
// src/lib/r2-storage.ts
const ENABLE_TTL = true;   // Currently: false
const TTL_DAYS = 90;        // Retention period
```

---

## Service Responsibilities

### Cloudflare Browser Rendering
- HTML/URL → PDF generation (cheaper than PDF.co)
- Screenshot capture (PNG/JPG)
- PDF → Images (via page-by-page screenshot)
- Full control over styling, viewport, page size

### Workers AI
- Document → Markdown conversion (all formats: PDF, DOCX, XLSX, images)
- Vision models for image analysis
- Cost-effective at scale

### PDF.co API
- **Excel → JSON**: Structured data extraction with formulas, multi-sheet
- **Office → PDF**: High-fidelity DOCX/PPTX/XLSX conversions
- **Merge PDFs**: Combine with bookmarks
- **Split PDFs**: Extract page ranges
- **Extract Tables**: Pull table data with AI detection

**Why PDF.co for These**:
- Structured data extraction superior to text parsing
- Better Office format fidelity than Workers AI
- Advanced PDF manipulation features

### R2 Storage
- Permanent file hosting (no auto-delete by default)
- Public URL generation for converted files
- S3-compatible API
- No egress fees (Cloudflare Workers → R2)

---

## Implementation Phases (10 phases, ~12 hours)

See `docs/IMPLEMENTATION_PHASES.md` for complete breakdown.

**Summary**:
1. **Phase 1**: Base infrastructure (1.5h)
2. **Phase 2**: Browser Rendering PDFs (2h)
3. **Phase 3**: Browser Rendering Screenshots (1h)
4. **Phase 4**: Workers AI Markdown (1.5h)
5. **Phase 5**: PDF.co Client & Excel (2h)
6. **Phase 6**: PDF.co Office Conversions (1h)
7. **Phase 7**: PDF.co PDF Operations (1.5h)
8. **Phase 8**: Browser Rendering Images (1h)
9. **Phase 9**: MCP Integration (1h)
10. **Phase 10**: Deployment & Testing (30m)

---

## Cost Breakdown (~$22-40/month)

| Service | Pricing | Estimated |
|---------|---------|-----------|
| Workers Paid Plan | $5/month | $5 |
| Browser Rendering | ~$0.50/1000 ops | $5-10 |
| Workers AI | Pay-per-request | $1-3 |
| R2 Storage | $0.015/GB | $1-2 |
| PDF.co | Pay-as-you-go | $10-20 |

**Cost Optimization**:
- Browser Rendering for PDFs (vs PDF.co HTML→PDF)
- Workers AI for markdown (vs PDF.co text extraction)
- PDF.co only for specialized operations
- R2 no egress fees

---

## Key Technical Details

### Browser Rendering (Puppeteer)

**Important Gotchas**:
1. **Viewport Blurriness**: Use `deviceScaleFactor: 2` for sharp output
2. **XPath Not Supported**: Use CSS selectors only
3. **nodejs_compat Required**: Must be in compatibility_flags
4. **Free vs Paid Limits**: Free = 2 req/sec, Paid = 25 req/sec

**PDF Options**:
```typescript
await page.pdf({
  format: 'A4',        // or 'Letter', 'Legal', 'A5'
  landscape: false,
  printBackground: true,
  margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
});
```

**Screenshot Options**:
```typescript
await page.screenshot({
  type: 'png',         // or 'jpeg', 'webp'
  fullPage: true,
  omitBackground: true // transparent background
});
```

### Workers AI toMarkdown

**Supported Formats**:
- PDF, DOCX, XLSX, ODS, ODT, CSV
- Images (uses vision models for object detection + summarization)

**Discovery Endpoint** (NEW):
```typescript
// Get supported formats dynamically
const supported = await env.AI.toMarkdown().supported();
// Returns: [
//   { extension: '.pdf', mimeType: 'application/pdf' },
//   { extension: '.docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
//   ...
// ]

// Use for validation before conversion
function isSupportedFormat(fileExt: string, supported: any[]) {
  return supported.some(f => f.extension === fileExt);
}
```

**Usage**:
```typescript
const result = await env.AI.toMarkdown([
  { data: pdfBuffer, mimeType: 'application/pdf' }
]);
// Returns: { format: 'markdown', data: '# Content...', tokens: 0 }
```

**Benefits**:
- Future-proof: Automatically supports new formats as Cloudflare adds them
- Better validation: Check format before attempting conversion
- Clear error messages: Tell users exactly which formats are supported

### PDF.co API

**Rate Limits** (by plan):
- Pay-as-you-go (no orders): 2 req/sec
- Pay-as-you-go (with orders): 5 req/sec
- Monthly subscription: 25 req/sec

**Common Errors**:
- 402: Insufficient credits → prompt to add credits
- 403: Forbidden URL → file not publicly accessible
- 445: Timeout → retry with `async: true`
- 442: Invalid document → file damaged or wrong format

**File Expiration**: Uploaded and converted files expire after 1 hour (default)

### R2 Upload Pattern

```typescript
// Upload to R2
await env.R2_BUCKET.put(`converted/${filename}`, pdfBuffer, {
  httpMetadata: {
    contentType: 'application/pdf'
  }
});

// Generate public URL
const url = `https://pub-<bucket-id>.r2.dev/converted/${filename}`;
```

**Public Access**: Configure bucket for public read via Wrangler or dashboard

---

## MCP Protocol Implementation

### Transport: HTTP JSON-RPC 2.0

**Endpoints**:
- `/` - HTML discovery page (public)
- `/health` - Health check (public)
- `/mcp` - MCP endpoint (requires bearer token)

### JSON-RPC Methods

```typescript
// List tools
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/list"
}

// Call tool
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "html_to_pdf",
    "arguments": {
      "html": "<html>...</html>",
      "format": "A4"
    }
  }
}
```

### Response Format

```typescript
// Success
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "content": [
      {
        "type": "text",
        "text": JSON.stringify({ pdfUrl: "https://..." })
      }
    ]
  }
}

// Error
{
  "jsonrpc": "2.0",
  "id": 2,
  "error": {
    "code": -32602,
    "message": "Invalid params"
  }
}
```

---

## Better-Chatbot Integration

### MCP Server Configuration

```json
{
  "name": "File Converter",
  "url": "https://file-converter-mcp.<your-subdomain>.workers.dev/mcp",
  "transport": "http",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN"
  }
}
```

### Example Agent Workflows

**Generate Invoice**:
```
User: "Create invoice for Order #1234"
Agent: Generates HTML from order data
Agent: Calls html_to_pdf({ html: "...", format: "A4" })
Returns: PDF URL for download
```

**Analyze Spreadsheet**:
```
User: "What are Q4 sales by region?"
Agent: Calls excel_to_json({ fileUrl: "...", worksheetIndex: 1 })
Agent: Analyzes JSON data
Returns: "Top 5 regions: APAC ($1.2M), ..."
```

**Convert Presentation**:
```
User: "Show me slides from the deck"
Agent: Calls document_to_images({ fileUrl: ".../deck.pptx" })
Agent: Creates FileParts for each image
Returns: Visual preview of all slides
```

---

## Development Workflow

### 1. Local Development

```bash
# Install dependencies
npm install

# Create .dev.vars with secrets
echo 'PDFCO_API_KEY=<key>' >> .dev.vars
echo 'AUTH_TOKEN=test-token' >> .dev.vars

# Create R2 bucket (if not exists)
npx wrangler r2 bucket create converted-files

# Start dev server
npx wrangler dev
```

### 2. Testing

```bash
# Test MCP endpoint
curl -X POST http://localhost:8787/mcp \
  -H "Authorization: Bearer test-token" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'

# Test specific tool
curl -X POST http://localhost:8787/mcp \
  -H "Authorization: Bearer test-token" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc":"2.0",
    "id":2,
    "method":"tools/call",
    "params":{
      "name":"html_to_pdf",
      "arguments":{"html":"<h1>Test</h1>","format":"A4"}
    }
  }'
```

### 3. Deployment

```bash
# Set production secrets
npx wrangler secret put PDFCO_API_KEY
# Paste: jeremy@jezweb.net_iHRiPdX1Llzuz6zRaQmgRM0iHyK8foxJzmwWQGQQLwlZYyMKvGG6cyRZONpUTvEW

npx wrangler secret put AUTH_TOKEN
# Paste: generated bearer token

# Deploy
npx wrangler deploy

# Verify
curl https://file-converter-mcp.<subdomain>.workers.dev/health
```

---

## Session Handoff Protocol

### SESSION.md Tracking

**Purpose**: Track implementation progress across context-clearing sessions

**Update After Each Phase**:
```markdown
## Phase 2: Browser Rendering PDFs ✅
**Completed**: 2025-01-15 | **Checkpoint**: abc1234
**Summary**: Implemented html_to_pdf, url_to_pdf, markdown_to_pdf

## Phase 3: Browser Rendering Screenshots 🔄
**Type**: Implementation | **Started**: 2025-01-15
**Spec**: `docs/IMPLEMENTATION_PHASES.md#phase-3`

**Progress**:
- [x] html_to_screenshot (commit: def5678)
- [ ] url_to_screenshot ← **CURRENT**
- [ ] Verify all screenshot options

**Next Action**: Implement url_to_screenshot in src/handlers/browser-screenshot.ts:42
```

**Git Checkpoints**:
```bash
git add .
git commit -m "checkpoint: Phase 3 In Progress - Screenshots implemented

Phase: 3 - Browser Rendering Screenshots
Status: In Progress
Session: Implemented html_to_screenshot and url_to_screenshot

Files Changed:
- src/handlers/browser-screenshot.ts (screenshot handlers)
- src/mcp/tools.ts (tool registration)

Next: Implement pdf_to_images in src/handlers/browser-images.ts"
```

---

## Known Issues & Limitations

### Browser Rendering
1. **XPath not supported** - Use CSS selectors only
2. **Viewport can be blurry** - Use `deviceScaleFactor: 2`
3. **Free tier limited** - 2 req/sec, upgrade to Paid for 25 req/sec
4. **No native PDF page extraction** - Use screenshot workaround

### Workers AI
1. **Image markdown uses 2 models** - Object detection + summarization (counts toward quota)
2. **Rate limits vary by model** - Check limits in docs
3. **Token limits apply** - Large files may need chunking

### PDF.co
1. **Office macros not supported** - Any macro-enabled files will fail
2. **PPTX not natively supported** - Works but may have rendering issues
3. **1-hour file expiration** - Download and re-upload to R2 immediately
4. **Rate limits by plan** - Implement queue for high-volume

### R2
1. **Public bucket config required** - Must enable public read for public URLs
2. **No built-in expiration** - Implement custom cleanup if needed
3. **10GB free tier** - Monitor usage if high volume

---

## Future Enhancements

### Phase 11: RAG Enablement
- `chunk_for_rag` - Semantic chunking with overlap
- `generate_embeddings` - Workers AI text embeddings
- `index_to_vectorize` - Store in Cloudflare Vectorize
- `search_documents` - Semantic search with similarity scores

### Phase 12: Advanced Features
- Batch conversions (parallel processing)
- Webhook notifications for async operations
- OCR for scanned PDFs (PDF.co)
- Custom PDF templates with variables
- Watermark addition to generated PDFs

---

## Important Reminders

1. **Always use nodejs_compat** - Required for Puppeteer
2. **Bearer token auth** - MCP endpoint is protected
3. **R2 files permanent by default** - No auto-delete unless enabled
4. **PDF.co files temporary** - Always copy to R2 immediately
5. **Rate limit PDF.co** - Implement queue to avoid 429 errors
6. **Discovery page public** - Root `/` endpoint is public for easy config
7. **Better-chatbot integration** - Uses HTTP transport (not SSE)
8. **13 tools total** - Keep tool registry updated
9. **Type-safe with Zod** - Validate all inputs and outputs
10. **Error handling crucial** - Handle 402, 429, 445 status codes from PDF.co

---

## Reference Patterns

### Tool Registration (mcp/tools.ts)

```typescript
export const tools: MCPTool[] = [
  {
    name: 'html_to_pdf',
    description: 'Convert HTML/CSS to PDF',
    inputSchema: {
      type: 'object',
      properties: {
        html: { type: 'string', description: 'HTML content' },
        format: { type: 'string', enum: ['A4', 'Letter', 'Legal'] }
      },
      required: ['html']
    }
  }
];
```

### Handler Implementation (handlers/browser-pdf.ts)

```typescript
export async function htmlToPdf(
  args: { html: string; format?: string },
  env: Bindings
): Promise<{ pdfUrl: string }> {
  // 1. Validate inputs
  // 2. Launch browser
  // 3. Generate PDF
  // 4. Upload to R2
  // 5. Return public URL
}
```

### MCP Dispatcher (mcp/server.ts)

```typescript
case 'html_to_pdf': {
  const result = await htmlToPdf(args, env);
  return createMCPResponse(id, {
    content: [{ type: 'text', text: JSON.stringify(result) }]
  });
}
```

---

## Contact & Support

**Owner**: Jeremy Dawes (Jez)
**Email**: jeremy@jezweb.net
**Phone**: +61411056876
**Website**: www.jezweb.com.au

**Accounts**:
- Cloudflare: jeremy@jezweb.net (0460574641fdbb98159c98ebf593e2bd)
- PDF.co: jeremy@jezweb.net

---

**Last Updated**: 2025-01-15 (Deployed)
**Status**: ✅ Production Deployment Complete - All 13/13 tools live and tested
