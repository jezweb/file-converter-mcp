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

  // Phase 3: Browser Rendering Screenshots
  // - html_to_screenshot
  // - url_to_screenshot

  // Phase 4: Workers AI Markdown
  // - document_to_markdown

  // Phase 5: PDF.co Data Extraction
  // - excel_to_json

  // Phase 6: PDF.co Office Conversions
  // - office_to_pdf

  // Phase 7: PDF.co PDF Operations
  // - merge_pdfs
  // - split_pdf
  // - extract_pdf_tables

  // Phase 8: Browser Rendering Images
  // - pdf_to_images
  // - document_to_images
];

// Total: 13 tools
export const getToolByName = (name: string): MCPTool | undefined => {
  return tools.find((tool) => tool.name === name);
};
