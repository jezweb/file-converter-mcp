# Architecture: File Converter MCP Server

**Platform**: Cloudflare Workers
**Transport**: HTTP with Server-Sent Events (SSE)
**Primary APIs**: PDF.co, Cloudflare Workers AI

---

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Better-Chatbot                       │
│                  (Vercel/Cloudflare)                    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ SSE (MCP Protocol)
                       ↓
┌─────────────────────────────────────────────────────────┐
│          File Converter MCP Worker                      │
│  ┌────────────────────────────────────────────────┐    │
│  │            Hono HTTP Server                    │    │
│  │  ┌──────────────┐      ┌──────────────┐       │    │
│  │  │ /sse         │      │  /health     │       │    │
│  │  │ (MCP Tools)  │      │  (Status)    │       │    │
│  │  └──────┬───────┘      └──────────────┘       │    │
│  └─────────┼────────────────────────────────────────┘  │
│            │                                            │
│  ┌─────────┴────────────────────────────────────┐     │
│  │              MCP Tool Handlers                │     │
│  │  • convert_to_pdf                             │     │
│  │  • extract_as_markdown                        │     │
│  │  • convert_excel_to_json                      │     │
│  │  • get_file_metadata                          │     │
│  │  • convert_pptx_to_images                     │     │
│  └─────────┬───────────────────────┬─────────────┘     │
└────────────┼───────────────────────┼───────────────────┘
             │                       │
    ┌────────┴────────┐     ┌────────┴────────┐
    │   PDF.co API    │     │ Workers AI      │
    │  (Conversions)  │     │  (Markdown)     │
    └────────┬────────┘     └─────────────────┘
             │
    ┌────────┴────────────────────────┐
    │    Cloudflare R2 Storage        │
    │   (Converted Files - 24hr TTL)  │
    └─────────────────────────────────┘
```

---

## Data Flow

### Flow 1: DOCX → PDF Conversion

```
1. User uploads DOCX to better-chatbot
   ↓
2. File stored in Vercel Blob/S3
   → Returns public URL: https://blob.vercel.../file.docx
   ↓
3. Agent sees FilePart with URL (can't read DOCX)
   ↓
4. Agent calls: convert_to_pdf({ fileUrl: "...", sourceFormat: "docx" })
   ↓
5. MCP Worker:
   a. Downloads DOCX from public URL
   b. Calls PDF.co API: document_to_pdf
   c. Receives PDF buffer
   d. Uploads to R2: /converted/{uuid}.pdf
   e. Extracts metadata (page count)
   ↓
6. Returns: { pdfUrl: "https://r2.../file.pdf", pageCount: 12, fileSize: 245678 }
   ↓
7. Agent creates new FilePart with PDF URL
   ↓
8. AI model reads PDF natively (GPT-5, Claude, Gemini support)
   ↓
9. Agent responds to user with summary/analysis
```

### Flow 2: PDF → Markdown (RAG)

```
1. User uploads large PDF (100+ pages)
   ↓
2. Agent wants to extract text for RAG
   ↓
3. Agent calls: extract_as_markdown({ fileUrl: "...", sourceFormat: "pdf" })
   ↓
4. MCP Worker:
   a. Downloads PDF from URL
   b. Tries Cloudflare Workers AI first (FREE)
      → @cf/meta/llama-3.1-8b-instruct with document parsing
   c. If fails, fallback to PDF.co text extraction
   d. Parses markdown for structure
   e. Calculates word count
   f. Extracts section headings
   ↓
5. Returns: { markdown: "# Doc...", wordCount: 25000, sections: ["Intro", "Methods"] }
   ↓
6. Agent uses markdown for:
   - RAG chunking (future phase)
   - Text analysis
   - Citation extraction
   - Summarization
```

### Flow 3: XLSX → JSON (Data Analysis)

```
1. User uploads sales-data.xlsx
   ↓
2. Agent needs to analyze Q4 sales
   ↓
3. Agent calls: convert_excel_to_json({ fileUrl: "..." })
   ↓
4. MCP Worker:
   a. Downloads XLSX
   b. Calls PDF.co excel_to_json API
   c. Parses response
   ↓
5. Returns: {
     data: [{region: "APAC", q4: 1200000}, ...],
     sheetNames: ["Sales", "Costs"],
     rowCount: 245
   }
   ↓
6. Agent analyzes JSON data directly
   → No need for model to parse spreadsheet
   ↓
7. Agent answers: "Top 5 regions in Q4: APAC ($1.2M), ..."
```

### Flow 4: PPTX → Images (Presentation Review)

```
1. User uploads pitch-deck.pptx
   ↓
2. Agent wants to review slides
   ↓
3. Agent calls: convert_pptx_to_images({ fileUrl: "...", imageFormat: "png" })
   ↓
4. MCP Worker:
   a. Downloads PPTX
   b. Converts PPTX → PDF (via PDF.co)
   c. Converts PDF → Images (one per slide)
   d. Uploads all images to R2
   e. Generates public URLs
   ↓
5. Returns: {
     imageUrls: ["https://r2.../slide-1.png", "https://r2.../slide-2.png", ...],
     slideCount: 15
   }
   ↓
6. Agent creates FileParts for each image
   ↓
7. AI model reads images via vision API
   ↓
8. Agent: "Slide 3 has a typo in the revenue chart..."
```

---

## Service Boundaries

### MCP Worker Responsibilities
- Receive tool calls via SSE transport
- Download files from public URLs (Vercel Blob, S3, R2)
- Coordinate conversion APIs (PDF.co, Workers AI)
- Upload converted files to R2 with public URLs
- Extract metadata (page count, word count, file size)
- Handle errors and retries
- Return structured responses to agents

### PDF.co API Responsibilities
- Document → PDF conversion (DOCX, XLSX, PPTX, images, HTML)
- PDF → Multiple formats (text, JSON, CSV, images)
- Excel → JSON/CSV conversion
- PDF metadata extraction (page count, author, created date)
- Form processing (read/fill forms)

### Cloudflare Workers AI Responsibilities
- DOCX/PDF → Markdown conversion (FREE alternative to PDF.co)
- Document understanding (extract structure, headings)
- Future: Text embeddings for RAG
- Future: Image analysis for PPTX slides

### Cloudflare R2 Responsibilities
- Store converted files temporarily (24-hour TTL)
- Serve converted files via public URLs
- Handle large files (up to 5GB)
- Future: Cache frequently converted files

### Better-Chatbot Responsibilities
- Upload original files to Vercel Blob/S3
- Provide public URLs to MCP worker
- Display converted files to users
- Manage agent → MCP tool calls
- Handle file attachments in chat UI

---

## Security Architecture

### Authentication & Authorization
- **PDF.co API**: API key stored in Worker secrets (`env.PDFCO_API_KEY`)
- **MCP Transport**: No auth required (assumes better-chatbot is trusted client)
- **Future**: Add Bearer token auth for MCP endpoint

### File Access
- **Input files**: Must be publicly accessible URLs (no auth headers supported yet)
- **Output files**: Public R2 URLs with 24-hour expiry
- **No file storage**: Original files never stored, only downloaded temporarily

### Rate Limiting
- **MCP endpoint**: 100 requests/minute per IP
- **PDF.co API**: Subject to account limits (10k credits free tier)
- **Workers AI**: Subject to Workers Paid plan limits

### Error Handling
- **Network failures**: 3 retry attempts with exponential backoff
- **API errors**: Return structured error messages to agent
- **Timeouts**: 30-second limit per conversion
- **Large files**: Reject files >50MB with clear error

---

## Scalability Considerations

### Cloudflare Workers Benefits
- **Edge deployment**: Runs in 300+ data centers globally
- **Auto-scaling**: Handles 100k+ requests/day on free tier
- **Low latency**: Sub-100ms response times for small files
- **Stateless**: No session management, fully horizontal scaling

### Performance Optimizations
1. **Streaming**: Use `Response.body` streaming for large files
2. **Caching**: Hash-based caching for duplicate files (future)
3. **Parallel processing**: Convert multiple files concurrently
4. **Lazy loading**: Only download file when needed (not during metadata checks)

### Cost Optimization
- **Workers AI first**: Use free Cloudflare AI before paid PDF.co API
- **R2 instead of S3**: Free egress from R2 to Workers
- **TTL on converted files**: Auto-delete after 24 hours to save storage
- **Smart routing**: Choose cheapest API per conversion type

---

## Monitoring & Observability

### Metrics to Track
- **Tool usage**: Which tools called most frequently
- **Conversion times**: p50, p95, p99 latencies per tool
- **Error rates**: Failed conversions by type
- **API costs**: PDF.co credit usage
- **R2 storage**: Total files stored, bandwidth used
- **Workers AI usage**: Token consumption

### Logging Strategy
```typescript
{
  timestamp: "2025-11-06T10:15:30Z",
  tool: "convert_to_pdf",
  input: { fileUrl: "...", sourceFormat: "docx" },
  duration_ms: 2345,
  status: "success",
  metadata: { pageCount: 12, fileSize: 245678 },
  api_used: "pdfco"
}
```

### Alerting (Future)
- **High error rate**: >10% failures in 5 minutes
- **Slow conversions**: >30 seconds average
- **API quota exhausted**: PDF.co credits <100
- **R2 storage full**: >9GB used (approaching 10GB limit)

---

## Deployment Architecture

### Development Environment
```bash
npx wrangler dev
→ http://localhost:8787
→ Uses .dev.vars for secrets
→ Local R2 bucket simulation
→ Local Workers AI binding
```

### Production Environment
```bash
npx wrangler deploy
→ https://file-converter-mcp.<subdomain>.workers.dev
→ Uses wrangler secret for PDFCO_API_KEY
→ Production R2 bucket
→ Production Workers AI
```

### Custom Domain (Optional)
```
file-converter.yourdomain.com
→ Points to Worker via Cloudflare DNS
→ Automatic HTTPS via Cloudflare SSL
```

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Runtime** | Cloudflare Workers | Serverless edge compute |
| **Framework** | Hono | HTTP routing and middleware |
| **Protocol** | MCP (SSE) | Agent communication |
| **Conversion** | PDF.co API | Document conversions |
| **AI** | Cloudflare Workers AI | Free markdown extraction |
| **Storage** | Cloudflare R2 | Converted file hosting |
| **Validation** | Zod | Request/response schemas |
| **Language** | TypeScript | Type safety |

---

## Future Enhancements

### Phase 13: RAG Enablement
- Add `chunk_for_rag` tool (split markdown into semantic chunks)
- Add `generate_embeddings` tool (Workers AI text embeddings)
- Add `index_to_vectorize` tool (store in Cloudflare Vectorize)
- Add `search_documents` tool (semantic search)

### Phase 14: Advanced Features
- Batch conversions (multiple files at once)
- Webhook notifications (async conversions)
- Custom markdown templates
- OCR for scanned PDFs
- Language translation during conversion
- Watermark addition to PDFs

### Phase 15: Performance
- Implement caching layer (KV or R2)
- Add CDN for frequently accessed files
- Optimize Workers AI prompts for faster markdown
- Parallel API calls to PDF.co

---

## Integration with Better-Chatbot

### MCP Configuration

**In better-chatbot UI**:
```json
{
  "name": "File Converter",
  "url": "https://file-converter-mcp.your-worker.workers.dev/sse",
  "transport": "sse",
  "headers": {}
}
```

**Available Tools** (auto-discovered):
1. `convert_to_pdf` - Convert documents to PDF
2. `extract_as_markdown` - Extract text as markdown
3. `convert_excel_to_json` - Parse Excel to JSON
4. `get_file_metadata` - Get file information
5. `convert_pptx_to_images` - Extract slides as images

### Agent Workflow Example

```
User: "Analyze the sales data in Q4-report.xlsx"

Agent思考:
- I see a FilePart with .xlsx URL
- I need to read the data
- I'll use convert_excel_to_json tool

Agent调用:
convert_excel_to_json({ fileUrl: "https://blob.../Q4-report.xlsx" })

Response:
{
  data: [
    { month: "Oct", sales: 450000, region: "APAC" },
    { month: "Nov", sales: 520000, region: "APAC" },
    { month: "Dec", sales: 680000, region: "APAC" },
    ...
  ],
  rowCount: 48
}

Agent分析:
- Q4 total: $1,650,000 (APAC)
- Best month: December (+30% vs Oct)
- Top performer: APAC region

Agent回复:
"In Q4, total sales reached $1.65M with December
being the strongest month at $680K (+30% growth).
APAC was the top-performing region..."
```

---

## Design Principles

1. **Serverless-First**: No persistent state, scales automatically
2. **Cost-Optimized**: Use free Cloudflare services before paid APIs
3. **Agent-Friendly**: Clear tool schemas, structured responses
4. **Fail-Safe**: Graceful degradation, detailed error messages
5. **Observable**: Comprehensive logging for debugging
6. **Secure**: API keys in secrets, no file persistence
7. **Fast**: <30 second conversions, edge deployment
