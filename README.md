# File Converter MCP Server

**Model Context Protocol (MCP) server for document conversion and content extraction, built on Cloudflare Workers.**

Leverage Cloudflare Browser Rendering, Workers AI, and PDF.co to convert documents, generate PDFs from HTML, capture screenshots, and extract structured data.

---

## Features

### PDF Generation (Cloudflare Browser Rendering)
- **📄 HTML → PDF**: Generate PDFs from HTML/CSS (invoices, reports, certificates)
- **🌐 URL → PDF**: Convert any webpage to PDF
- **📝 Markdown → PDF**: Convert markdown to styled PDF

### Screenshot Capture (Cloudflare Browser Rendering)
- **📸 HTML → Screenshot**: Generate PNG/JPG from HTML
- **🖼️ URL → Screenshot**: Capture webpage screenshots
- **🎞️ PDF → Images**: Convert PDF pages to images
- **📊 Document → Images**: Convert DOCX/PPTX/XLSX to images

### Document Processing (Workers AI)
- **📖 Document → Markdown**: Convert PDF/DOCX/XLSX/images to markdown (for RAG)

### Data Extraction (PDF.co)
- **📊 Excel → JSON**: Parse spreadsheets to structured JSON
- **📄 Office → PDF**: High-quality DOCX/PPTX/XLSX conversions
- **🔗 Merge PDFs**: Combine multiple PDFs
- **✂️ Split PDF**: Extract specific pages
- **📋 Extract Tables**: Pull table data from PDFs as CSV/JSON

### Infrastructure
- **⚡ Edge Deployment**: Runs on Cloudflare Workers (300+ data centers)
- **💾 R2 Storage**: Permanent file storage with public URLs
- **🔒 Secure**: Bearer token authentication
- **📊 Self-Documenting**: HTML discovery page with configuration examples

---

## Quick Start

### 1. Prerequisites

- Cloudflare account
- PDF.co account with API key ([sign up](https://pdf.co/))
- Node.js 18+ and npm

### 2. Installation

```bash
git clone <your-repo>
cd file-converter-mcp
npm install
```

### 3. Configuration

Create `.dev.vars` for local development:

```bash
PDFCO_API_KEY=your_api_key_here
AUTH_TOKEN=your_bearer_token_here
```

Update `wrangler.jsonc`:

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

### 4. Create R2 Bucket

```bash
npx wrangler r2 bucket create converted-files
```

### 5. Local Development

```bash
npx wrangler dev
```

Server runs at `http://localhost:8787`

### 6. Deploy to Production

```bash
# Set production secrets
npx wrangler secret put PDFCO_API_KEY
npx wrangler secret put AUTH_TOKEN

# Deploy
npx wrangler deploy
```

Your MCP server is now live at:
`https://file-converter-mcp.webfonts.workers.dev`

---

## Usage with Better-Chatbot

### Add MCP Server

1. Open better-chatbot MCP Servers UI
2. Click "Add Server"
3. Enter:
   - **Name**: File Converter
   - **URL**: `https://file-converter-mcp.webfonts.workers.dev/mcp`
   - **Transport**: HTTP
   - **Headers**: `Authorization: Bearer epF77o5Oz5y/bx+mA/27aZ6V3RJo232DFFgmKhpK9qU=`
4. Save

### Available Tools (13 Tools)

#### PDF Generation

**1. `html_to_pdf`** - Convert HTML/CSS to PDF
```javascript
// Generate invoice PDF
html_to_pdf({
  html: "<html><body><h1>Invoice #1234</h1>...</body></html>",
  format: "A4",
  landscape: false
})
// Returns: { pdfUrl: "https://r2.../invoice.pdf" }
```

**2. `url_to_pdf`** - Convert webpage to PDF
```javascript
// Archive documentation page
url_to_pdf({
  url: "https://docs.example.com/guide",
  format: "A4"
})
// Returns: { pdfUrl: "https://r2.../guide.pdf" }
```

**3. `markdown_to_pdf`** - Convert markdown to styled PDF
```javascript
// Convert markdown report
markdown_to_pdf({
  markdown: "# Report\n\n## Section 1...",
  format: "Letter"
})
// Returns: { pdfUrl: "https://r2.../report.pdf" }
```

#### Screenshot Capture

**4. `html_to_screenshot`** - Generate image from HTML
```javascript
// Create preview image
html_to_screenshot({
  html: "<div>Preview</div>",
  format: "png",
  fullPage: true
})
// Returns: { imageUrl: "https://r2.../preview.png" }
```

**5. `url_to_screenshot`** - Capture webpage screenshot
```javascript
// Capture homepage
url_to_screenshot({
  url: "https://example.com",
  format: "png",
  viewport: { width: 1920, height: 1080 }
})
// Returns: { imageUrl: "https://r2.../screenshot.png" }
```

**6. `pdf_to_images`** - Convert PDF pages to images
```javascript
// Extract slides as images
pdf_to_images({
  fileUrl: "https://example.com/presentation.pdf",
  format: "png"
})
// Returns: { imageUrls: ["page-1.png", "page-2.png", ...] }
```

**7. `document_to_images`** - Convert documents to images
```javascript
// Convert PowerPoint to images (2-step: office → pdf → images)
document_to_images({
  fileUrl: "https://example.com/deck.pptx",
  format: "png"
})
// Returns: { imageUrls: ["slide-1.png", "slide-2.png", ...] }
```

#### Document Processing

**8. `document_to_markdown`** - Extract text as markdown
```javascript
// Prepare PDF for RAG
document_to_markdown({
  fileUrl: "https://example.com/report.pdf"
})
// Returns: {
//   markdown: "# Report\n\n...",
//   wordCount: 25000,
//   sections: ["Introduction", "Methods", ...]
// }
```

#### Data Extraction

**9. `excel_to_json`** - Parse spreadsheet to JSON
```javascript
// Extract sales data
excel_to_json({
  fileUrl: "https://example.com/Q4-sales.xlsx",
  worksheetIndex: 1
})
// Returns: {
//   data: [{region: "APAC", sales: 1200000}, ...],
//   sheetNames: ["Sales", "Costs"],
//   rowCount: 245
// }
```

**10. `office_to_pdf`** - Convert Office files to PDF
```javascript
// High-quality DOCX to PDF
office_to_pdf({
  fileUrl: "https://example.com/contract.docx"
})
// Returns: { pdfUrl: "https://r2.../contract.pdf", pageCount: 12 }
```

#### PDF Operations

**11. `merge_pdfs`** - Combine multiple PDFs
```javascript
// Merge quarterly reports
merge_pdfs({
  fileUrls: [
    "https://example.com/q1.pdf",
    "https://example.com/q2.pdf",
    "https://example.com/q3.pdf"
  ]
})
// Returns: { pdfUrl: "https://r2.../merged.pdf", pageCount: 45 }
```

**12. `split_pdf`** - Extract specific pages
```javascript
// Extract executive summary (pages 1-5)
split_pdf({
  fileUrl: "https://example.com/report.pdf",
  pages: "1-5"
})
// Returns: { pdfUrl: "https://r2.../pages-1-5.pdf" }
```

**13. `extract_pdf_tables`** - Pull table data
```javascript
// Extract financial tables
extract_pdf_tables({
  fileUrl: "https://example.com/financials.pdf",
  pages: "3-7"
})
// Returns: { csv: "Quarter,Revenue,...", tables: [...] }
```

---

## Architecture

```
Better-Chatbot
    ↓ (HTTP JSON-RPC)
Cloudflare Worker (MCP Server)
    ↓
├─ Browser Rendering (PDF/screenshots)
├─ Workers AI (markdown conversion)
├─ PDF.co API (data extraction, Office conversions)
└─ R2 Storage (permanent file hosting)
```

**See [ARCHITECTURE.md](./docs/ARCHITECTURE.md) for details.**

---

## API Documentation

### Discovery Page

```bash
curl https://file-converter-mcp.your-worker.workers.dev/
```

Returns HTML page with:
- MCP endpoint configuration
- Tool list with examples
- Authentication setup
- Deploy instructions

### Health Check

```bash
curl https://file-converter-mcp.your-worker.workers.dev/health
```

**Response**:
```json
{
  "status": "ok",
  "version": "1.0.0",
  "tools": 13
}
```

### MCP Endpoint

```bash
curl -X POST https://file-converter-mcp.your-worker.workers.dev/mcp \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

**See [API_ENDPOINTS.md](./docs/API_ENDPOINTS.md) for full documentation.**

---

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PDFCO_API_KEY` | Yes | PDF.co API key ([get here](https://pdf.co/)) |
| `AUTH_TOKEN` | Yes | Bearer token for MCP authentication |

### Wrangler Bindings

| Binding | Type | Description |
|---------|------|-------------|
| `BROWSER` | Browser Rendering | Puppeteer for PDF/screenshot generation |
| `AI` | Workers AI | Document to markdown conversion |
| `R2_BUCKET` | R2 Bucket | Permanent file storage |

### R2 Storage Policy

**Default**: No auto-deletion (files persist indefinitely)

**To enable TTL** (future), edit `src/lib/r2-storage.ts`:
```typescript
const ENABLE_TTL = true;  // Enable auto-deletion
const TTL_DAYS = 90;       // Retention period
```

---

## Cost Breakdown

| Service | Pricing Model | Estimated Cost |
|---------|---------------|----------------|
| Cloudflare Workers | $5/month (unlimited requests) | $5/month |
| Browser Rendering | ~$0.50 per 1000 operations | $5-10/month |
| Cloudflare Workers AI | Pay-per-request | $1-3/month |
| Cloudflare R2 | $0.015/GB stored | $1-2/month |
| PDF.co API | Pay-as-you-go or $19/month | $10-20/month |
| **Total** | | **~$22-40/month** |

**Cost Optimization**:
- Cloudflare Browser Rendering used for PDF generation (cheaper than PDF.co)
- Workers AI used for markdown conversion
- PDF.co used strategically for data extraction and Office conversions
- R2 storage has no egress fees

---

## Limits

| Resource | Limit | Notes |
|----------|-------|-------|
| File size | 50MB | Can be increased to 100MB |
| Conversion time | 30 seconds | Per operation |
| Rate limit | 100/minute | Per IP address |
| R2 storage | No limit | Files persist indefinitely by default |
| PDF pages | No limit | Split/merge operations |

---

## Development

### Project Structure

```
file-converter-mcp/
├── src/
│   ├── index.ts                    # Hono app, auth, discovery page
│   ├── mcp/
│   │   ├── server.ts              # JSON-RPC dispatcher
│   │   ├── tools.ts               # Tool registry (13 tools)
│   │   └── types.ts               # TypeScript types
│   ├── handlers/                   # Tool implementations
│   │   ├── browser-pdf.ts         # html_to_pdf, url_to_pdf, markdown_to_pdf
│   │   ├── browser-screenshot.ts  # screenshot tools
│   │   ├── browser-images.ts      # pdf_to_images, document_to_images
│   │   ├── ai-markdown.ts         # document_to_markdown
│   │   ├── pdfco-data.ts          # excel_to_json
│   │   ├── pdfco-convert.ts       # office_to_pdf
│   │   └── pdfco-operations.ts    # merge, split, extract_tables
│   ├── lib/
│   │   ├── browser-client.ts      # Puppeteer wrapper
│   │   ├── pdfco-client.ts        # PDF.co API wrapper
│   │   ├── ai-client.ts           # Workers AI wrapper
│   │   ├── file-fetcher.ts        # Download from URLs
│   │   └── r2-storage.ts          # R2 upload/URL generation
│   └── utils/
│       └── responses.ts            # MCP response builders
├── docs/
│   ├── IMPLEMENTATION_PHASES.md
│   ├── ARCHITECTURE.md
│   └── API_ENDPOINTS.md
├── wrangler.jsonc
├── package.json
└── README.md
```

### Local Development Tips

**Test individual tools**:
```bash
# Terminal 1: Start dev server with logs
npx wrangler dev

# Terminal 2: Test MCP endpoint
curl -X POST http://localhost:8787/mcp \
  -H "Authorization: Bearer test-token" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'
```

---

## Troubleshooting

### "PDF.co API quota exhausted"

- Check your PDF.co account balance at https://app.pdf.co/
- Upgrade to paid plan or wait for monthly credit renewal

### "R2 upload failed"

- Verify R2 bucket exists: `npx wrangler r2 bucket list`
- Check bucket binding in `wrangler.jsonc`

### "Browser binding not found"

- Ensure `browser` binding configured in `wrangler.jsonc`
- Browser Rendering requires Workers Paid plan ($5/month)

### "Workers AI binding not found"

- Ensure `ai` binding configured in `wrangler.jsonc`
- Workers AI is available on all plans

### "CORS error from better-chatbot"

- Add your better-chatbot origin to CORS config in `src/index.ts`

---

## Roadmap

### Future Enhancements
- [ ] RAG tools (`chunk_for_rag`, `generate_embeddings`, `search_documents`)
- [ ] Batch conversions (process multiple files at once)
- [ ] Webhook notifications (async conversion callbacks)
- [ ] OCR for scanned PDFs
- [ ] Custom PDF templates
- [ ] Watermark addition

---

## Contributing

PRs welcome! Please see [IMPLEMENTATION_PHASES.md](./docs/IMPLEMENTATION_PHASES.md) for development workflow.

---

## License

MIT

---

## Links

- **Documentation**: [/docs](./docs)
- **PDF.co API**: https://docs.pdf.co/
- **Cloudflare Browser Rendering**: https://developers.cloudflare.com/browser-rendering/
- **Cloudflare Workers AI**: https://developers.cloudflare.com/workers-ai/
- **MCP Specification**: https://modelcontextprotocol.io/

---

## Support

- **Issues**: Open a GitHub issue
- **Email**: jeremy@jezweb.net
- **MCP Community**: https://discord.gg/modelcontextprotocol

---

**Built by Jeremy Dawes (Jez) | Powered by Cloudflare & PDF.co**
