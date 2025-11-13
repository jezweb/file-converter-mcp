# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-15

### Fixed
- **Screenshot timeout issue**: Changed `waitUntil` from `networkidle2` to `load` for URL-based screenshots and PDFs
  - Resolves timeout errors on WordPress sites with analytics and chat widgets
  - Reduced timeout from 30s to 15s for faster failure on broken sites
  - Tested on jezweb.com.au: completes in ~17s (was timing out at 30s)

### Added
- **Screenshot quality control**: `quality` parameter (1-100) for JPEG/WebP compression
  - Default: 80
  - Example: quality=60 reduces file size by 84% (220K PNG → 35K JPEG)

- **Element-specific capture**: `clipSelector` parameter to capture specific page elements
  - Accepts any CSS selector (e.g., `"header"`, `".hero"`, `"#main-content"`)
  - Returns clear error if element not found
  - Example: capturing header only reduces from 800x600px to 785x102px

- **Lazy-loading support**: `scrollDelay` parameter (milliseconds)
  - Waits between scroll steps when capturing full page
  - Recommended: 100-500ms for sites with lazy-loading images
  - Automatically scrolls through page before final screenshot

### Changed
- Screenshot tools now accept options object instead of individual parameters
- Browser client functions refactored for better maintainability

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
