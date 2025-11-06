import type { MCPTool } from './types';

// Tool Registry - will be populated in later phases
export const tools: MCPTool[] = [
  // Phase 2: Browser Rendering PDFs
  // - html_to_pdf
  // - url_to_pdf
  // - markdown_to_pdf

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
