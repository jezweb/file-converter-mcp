# Implementation Phases: File Converter MCP Server

**Project Type**: Cloudflare Workers MCP Server
**Stack**: Cloudflare Workers + Hono + MCP SDK + PDF.co API + Workers AI
**Estimated Total**: 12-15 hours (~12-15 minutes human time)

---

## Phase 1: Project Setup & Infrastructure
**Type**: Infrastructure
**Estimated**: 1-2 hours

**Tasks**:
- [ ] Initialize Cloudflare Worker project with `npm create cloudflare@latest`
- [ ] Install dependencies: `@modelcontextprotocol/sdk`, `hono`, `zod`
- [ ] Configure `wrangler.toml` with Workers AI binding
- [ ] Set up R2 bucket binding for converted files
- [ ] Configure environment variables (PDF.co API key)
- [ ] Create basic Hono server with health check endpoint
- [ ] Set up MCP server with SSE transport
- [ ] Test local dev server runs (`npx wrangler dev`)

**Files**:
- `wrangler.toml`
- `package.json`
- `src/index.ts` (Hono server + MCP initialization)
- `src/types.ts` (TypeScript interfaces)
- `.dev.vars` (local secrets)

**Verification Criteria**:
- [ ] `npx wrangler dev` starts without errors
- [ ] Health check returns 200 at `http://localhost:8787/health`
- [ ] MCP SSE endpoint responds at `/sse`
- [ ] Environment variables load correctly
- [ ] Workers AI binding accessible via `env.AI`
- [ ] R2 binding accessible via `env.R2_BUCKET`

**Exit Criteria**: Worker runs locally, MCP endpoint responds, all bindings configured

---

## Phase 2: PDF.co API Client
**Type**: Integration
**Estimated**: 2 hours

**Tasks**:
- [ ] Create PDF.co client wrapper class
- [ ] Implement `convertDocumentToPDF(fileUrl, format)` method
- [ ] Implement `convertExcelToJSON(fileUrl)` method
- [ ] Implement `convertPPTXToImages(fileUrl)` method
- [ ] Implement `extractPDFText(fileUrl)` method
- [ ] Add error handling with retry logic (3 attempts)
- [ ] Add request timeout (30 seconds)
- [ ] Add response validation with Zod schemas
- [ ] Test with sample files from public URLs

**Files**:
- `src/lib/pdfco-client.ts`
- `src/lib/pdfco-types.ts` (Zod schemas)
- `src/lib/retry.ts` (retry utility)

**Verification Criteria**:
- [ ] DOCX → PDF conversion works with test file
- [ ] XLSX → JSON conversion returns valid data
- [ ] PPTX → Images returns array of image URLs
- [ ] PDF → Text extraction works
- [ ] Error responses handled gracefully (400, 401, 500)
- [ ] Retry logic triggers on network failures
- [ ] Timeouts prevent hanging requests

**Exit Criteria**: All PDF.co API methods work reliably with error handling

---

## Phase 3: Cloudflare Workers AI Integration
**Type**: Integration
**Estimated**: 2 hours

**Tasks**:
- [ ] Create Cloudflare AI client wrapper
- [ ] Implement `convertToMarkdown(fileBuffer, fileType)` using Workers AI
- [ ] Test with DOCX files (markdown conversion)
- [ ] Test with PDF files (markdown conversion)
- [ ] Add word count and section extraction from markdown
- [ ] Add fallback to PDF.co if Workers AI fails
- [ ] Implement token usage tracking
- [ ] Add response caching for identical files (hash-based)

**Files**:
- `src/lib/cloudflare-ai.ts`
- `src/lib/markdown-parser.ts` (extract headings, word count)
- `src/lib/file-hash.ts` (SHA-256 hashing)

**Verification Criteria**:
- [ ] DOCX → Markdown preserves formatting (headings, lists, tables)
- [ ] PDF → Markdown extracts text accurately
- [ ] Word count calculation is accurate
- [ ] Section headings extracted correctly (H1, H2)
- [ ] Fallback to PDF.co triggers on Workers AI errors
- [ ] Duplicate files use cached results
- [ ] Token usage logged for monitoring

**Exit Criteria**: Markdown conversion works for DOCX and PDF with quality output

---

## Phase 4: File Download & Storage Utility
**Type**: Infrastructure
**Estimated**: 1.5 hours

**Tasks**:
- [ ] Create file fetcher utility for downloading from URLs
- [ ] Support Vercel Blob, S3, and R2 URLs
- [ ] Add file size validation (max 50MB)
- [ ] Implement streaming for large files
- [ ] Create R2 uploader for converted files
- [ ] Generate public URLs with expiry (24 hours)
- [ ] Add MIME type detection
- [ ] Add file hash generation for deduplication

**Files**:
- `src/lib/file-fetcher.ts`
- `src/lib/r2-storage.ts`
- `src/lib/mime-types.ts`

**Verification Criteria**:
- [ ] Can download files from Vercel Blob URLs
- [ ] Can download files from S3 presigned URLs
- [ ] Can download files from R2 public URLs
- [ ] Files >50MB rejected with clear error
- [ ] Converted files uploaded to R2 successfully
- [ ] Public URLs generated with correct expiry
- [ ] MIME types detected correctly
- [ ] File hashes match for duplicate files

**Exit Criteria**: File download and R2 upload work reliably for all supported storage backends

---

## Phase 5: MCP Tool - convert_to_pdf
**Type**: API
**Estimated**: 2 hours

**Tasks**:
- [ ] Define tool schema with Zod (fileUrl, sourceFormat, filename)
- [ ] Implement tool handler function
- [ ] Download source file from URL
- [ ] Call PDF.co `document_to_pdf` API
- [ ] Upload converted PDF to R2
- [ ] Extract metadata (page count, file size)
- [ ] Return R2 URL + metadata
- [ ] Add error handling for unsupported formats
- [ ] Add progress logging
- [ ] Test with DOCX, XLSX, PPTX, images

**Files**:
- `src/tools/convert-to-pdf.ts`
- `src/tools/schemas.ts` (Zod schemas)

**Verification Criteria**:
- [ ] DOCX → PDF conversion completes in <30 seconds
- [ ] XLSX → PDF conversion preserves tables
- [ ] PPTX → PDF conversion works (via PDF.co)
- [ ] Images (JPG, PNG) → PDF conversion works
- [ ] Metadata includes accurate page count
- [ ] R2 URL is publicly accessible
- [ ] Error for unsupported formats (e.g., .zip)
- [ ] Tool callable via MCP SSE endpoint

**Exit Criteria**: `convert_to_pdf` tool works for all supported formats via MCP

---

## Phase 6: MCP Tool - extract_as_markdown
**Type**: API
**Estimated**: 2 hours

**Tasks**:
- [ ] Define tool schema (fileUrl, sourceFormat)
- [ ] Implement tool handler
- [ ] Download source file
- [ ] Try Cloudflare Workers AI markdown conversion first
- [ ] Fallback to PDF.co text extraction if needed
- [ ] Parse markdown to extract sections (H1, H2 headings)
- [ ] Calculate word count
- [ ] Return markdown + metadata (wordCount, sections[])
- [ ] Test with PDF, DOCX, HTML files
- [ ] Add caching for repeated requests (same file hash)

**Files**:
- `src/tools/extract-markdown.ts`

**Verification Criteria**:
- [ ] PDF → Markdown preserves structure
- [ ] DOCX → Markdown preserves formatting
- [ ] HTML → Markdown conversion works
- [ ] Word count accurate (±5% tolerance)
- [ ] Section headings extracted as array
- [ ] Cloudflare AI used first (free tier)
- [ ] PDF.co fallback works if AI fails
- [ ] Cached results returned instantly for duplicates

**Exit Criteria**: `extract_as_markdown` tool returns quality markdown with metadata

---

## Phase 7: MCP Tool - convert_excel_to_json
**Type**: API
**Estimated**: 1.5 hours

**Tasks**:
- [ ] Define tool schema (fileUrl, sheetName optional)
- [ ] Implement tool handler
- [ ] Download Excel file
- [ ] Call PDF.co `excel_to_json` API
- [ ] Parse response into structured JSON
- [ ] Return data array + metadata (sheetNames, rowCount, columnCount)
- [ ] Handle multi-sheet workbooks
- [ ] Add option to return all sheets or specific sheet
- [ ] Test with complex Excel files (formulas, merged cells)

**Files**:
- `src/tools/convert-excel.ts`

**Verification Criteria**:
- [ ] XLSX → JSON conversion preserves data types
- [ ] XLS (legacy) → JSON works
- [ ] CSV → JSON works (via Excel API)
- [ ] Multi-sheet workbooks return all sheet names
- [ ] Specific sheet selection works
- [ ] Row and column counts accurate
- [ ] Formulas converted to values
- [ ] Merged cells handled gracefully

**Exit Criteria**: `convert_excel_to_json` tool handles all Excel formats reliably

---

## Phase 8: MCP Tool - get_file_metadata
**Type**: API
**Estimated**: 1 hour

**Tasks**:
- [ ] Define tool schema (fileUrl)
- [ ] Implement tool handler
- [ ] Download file headers only (HEAD request)
- [ ] Detect file type from MIME type + extension
- [ ] For PDFs: Call PDF.co `pdf_info_reader` API for page count
- [ ] For DOCX: Estimate page count (word count / 500)
- [ ] For XLSX: Get sheet count via PDF.co
- [ ] Return metadata object (fileType, size, pageCount, createdDate)
- [ ] Add author extraction for Office files
- [ ] Test with various file types

**Files**:
- `src/tools/get-metadata.ts`
- `src/lib/metadata-extractor.ts`

**Verification Criteria**:
- [ ] PDF page count accurate
- [ ] DOCX page estimation reasonable
- [ ] File size reported in bytes
- [ ] MIME type detected correctly
- [ ] Created date extracted when available
- [ ] Author metadata extracted for Office files
- [ ] Fast response (<2 seconds) for metadata-only
- [ ] Works without downloading full file when possible

**Exit Criteria**: `get_file_metadata` tool returns comprehensive file information quickly

---

## Phase 9: MCP Tool - convert_pptx_to_images
**Type**: API
**Estimated**: 1.5 hours

**Tasks**:
- [ ] Define tool schema (fileUrl, imageFormat: "png" | "jpg")
- [ ] Implement tool handler
- [ ] Download PPTX file
- [ ] Convert PPTX → PDF via PDF.co first
- [ ] Convert PDF → Images (one per slide) via PDF.co
- [ ] Upload images to R2
- [ ] Generate public URLs for each image
- [ ] Return array of image URLs + slide count
- [ ] Test with multi-slide presentations
- [ ] Add option to return specific slide ranges

**Files**:
- `src/tools/convert-pptx-images.ts`

**Verification Criteria**:
- [ ] PPTX → Images generates one image per slide
- [ ] Image quality good enough to read text
- [ ] All images uploaded to R2 successfully
- [ ] Public URLs work and are accessible
- [ ] Slide count matches presentation
- [ ] Works with 50+ slide presentations
- [ ] Image format selection (PNG vs JPG) works
- [ ] Slide range selection works (e.g., slides 1-5)

**Exit Criteria**: `convert_pptx_to_images` tool converts presentations to readable images

---

## Phase 10: MCP Server Integration & Registration
**Type**: Integration
**Estimated**: 1.5 hours

**Tasks**:
- [ ] Register all tools with MCP server
- [ ] Implement SSE endpoint handler (`/sse`)
- [ ] Add CORS configuration for better-chatbot origin
- [ ] Add rate limiting (100 requests/minute per client)
- [ ] Add request logging with timestamps
- [ ] Add health check with tool status
- [ ] Create tool usage documentation in README
- [ ] Test all tools via MCP SSE transport
- [ ] Test concurrent tool calls

**Files**:
- `src/mcp-server.ts` (tool registration)
- `src/middleware/cors.ts`
- `src/middleware/rate-limit.ts`
- `src/middleware/logging.ts`

**Verification Criteria**:
- [ ] SSE endpoint `/sse` accepts connections
- [ ] All 5 tools listed in MCP tool registry
- [ ] Tool schemas validate correctly (Zod)
- [ ] CORS allows better-chatbot origin
- [ ] Rate limiting blocks excessive requests
- [ ] Logs include tool name, duration, status
- [ ] Health check returns tool availability status
- [ ] Concurrent requests don't interfere

**Exit Criteria**: MCP server fully operational with all tools registered and accessible

---

## Phase 11: Deployment & Testing
**Type**: Infrastructure
**Estimated**: 1 hour

**Tasks**:
- [ ] Deploy to Cloudflare Workers (`npx wrangler deploy`)
- [ ] Verify production environment variables set
- [ ] Test deployed SSE endpoint from browser
- [ ] Configure R2 public access for converted files
- [ ] Set up custom domain (optional): `file-converter.yourdomain.com`
- [ ] Test all tools in production environment
- [ ] Add monitoring with Workers Analytics
- [ ] Document connection URL for better-chatbot
- [ ] Create example MCP client config

**Files**:
- `README.md` (connection instructions)
- `docs/EXAMPLES.md` (tool usage examples)
- `.github/workflows/deploy.yml` (optional CI/CD)

**Verification Criteria**:
- [ ] Deployed URL accessible: `https://file-converter.*.workers.dev/sse`
- [ ] SSE endpoint works in production
- [ ] All tools callable from production
- [ ] R2 URLs publicly accessible (CORS configured)
- [ ] PDF.co API key works in production
- [ ] Workers AI binding works in production
- [ ] Response times <30 seconds for conversions
- [ ] No CORS errors from better-chatbot origin

**Exit Criteria**: MCP server deployed and accessible from better-chatbot

---

## Phase 12: Better-Chatbot Integration
**Type**: Integration
**Estimated**: 30 minutes

**Tasks**:
- [ ] Open better-chatbot MCP Servers UI
- [ ] Add new MCP server with production URL
- [ ] Configure SSE transport
- [ ] Set headers (none needed if using Worker secrets)
- [ ] Verify tools appear in better-chatbot tools list
- [ ] Test: Upload DOCX, agent calls `convert_to_pdf`
- [ ] Test: Upload XLSX, agent calls `convert_excel_to_json`
- [ ] Test: Upload PPTX, agent calls `convert_pptx_to_images`
- [ ] Test: Agent calls `get_file_metadata` before conversion
- [ ] Test: Agent uses `extract_as_markdown` for RAG

**Verification Criteria**:
- [ ] MCP server appears as connected in UI
- [ ] All 5 tools visible in agent tools list
- [ ] Agent successfully calls tools autonomously
- [ ] File conversions complete without errors
- [ ] Converted files accessible via returned URLs
- [ ] Agent can read converted PDF files
- [ ] Agent can analyze Excel JSON data
- [ ] Agent can view PPTX images
- [ ] Markdown extraction works for long documents

**Exit Criteria**: Agents in better-chatbot successfully use all file conversion tools

---

## Notes

**Testing Strategy**: Each phase includes verification via manual testing. Phase 11 includes production testing.

**Deployment Strategy**: Deploy once in Phase 11 after all tools working locally, then connect in Phase 12.

**Context Management**: Phases sized to fit in single sessions. Phases 1-4 are infrastructure (run together), Phases 5-9 are individual tools (run separately), Phases 10-12 are integration (run together).

**Cost**:
- Cloudflare Workers: FREE (100k requests/day)
- Cloudflare Workers AI: FREE (included)
- Cloudflare R2: FREE (10GB storage)
- PDF.co API: ~$10-20/month (based on usage)

**Future Enhancements** (Phase 13+):
- RAG tools: `chunk_for_rag`, `generate_embeddings`, `index_to_vectorize`, `search_documents`
- Batch conversion: Process multiple files at once
- Webhook notifications: Async conversion with callback URLs
- Custom markdown templates: Configure output format
