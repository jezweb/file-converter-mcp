# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-15

### Added

#### PDF Generation (Cloudflare Browser Rendering)
- `html_to_pdf` - Convert HTML/CSS to PDF with custom formatting
- `url_to_pdf` - Convert any webpage to PDF
- `markdown_to_pdf` - Convert markdown to styled PDF with syntax highlighting

#### Screenshot Capture (Cloudflare Browser Rendering)
- `html_to_screenshot` - Generate PNG/JPEG/WebP from HTML
- `url_to_screenshot` - Capture webpage screenshots
- `pdf_to_images` - Convert PDF pages to individual images
- `document_to_images` - Convert Office documents to images (DOCX/PPTX/XLSX)

#### Document Processing (Workers AI)
- `document_to_markdown` - Convert PDF/DOCX/XLSX/images to RAG-ready markdown

#### Data Extraction (PDF.co)
- `excel_to_json` - Parse Excel to structured JSON with formula support
- `office_to_pdf` - High-quality DOCX/PPTX/XLSX to PDF conversion

#### PDF Operations (PDF.co)
- `merge_pdfs` - Combine multiple PDFs with bookmarks
- `split_pdf` - Extract specific page ranges from PDFs
- `extract_pdf_tables` - Pull table data from PDFs as CSV/JSON

#### Infrastructure
- Cloudflare Workers edge deployment (300+ data centers)
- R2 storage for permanent file hosting
- Bearer token authentication
- HTML discovery page with client configuration examples
- MCP JSON-RPC 2.0 protocol support

### Technical Details
- TypeScript with strict mode
- Hono web framework
- Zod validation
- Browser Rendering API integration
- Workers AI integration
- PDF.co API integration

[1.0.0]: https://github.com/YOUR_USERNAME/file-converter-mcp/releases/tag/v1.0.0
