import type { Bindings, MCPRequest, MCPResponse } from './types';
import { tools, getToolByName } from './tools';
import {
  createMCPResponse,
  createMethodNotFound,
  createInvalidParams,
  createInternalError,
  createJsonResult,
} from '../utils/responses';
import { htmlToPdf, urlToPdf, markdownToPdf } from '../handlers/browser-pdf';
import { htmlToScreenshot, urlToScreenshot } from '../handlers/browser-screenshot';
import { documentToMarkdown } from '../handlers/ai-markdown';
import { excelToJson } from '../handlers/pdfco-excel';
import { officeToPdf } from '../handlers/pdfco-convert';
import { handleMergePdfs, handleSplitPdf, handleExtractPdfTables } from '../handlers/pdfco-operations';
import { handlePdfToImages, handleDocumentToImages } from '../handlers/browser-images';

export async function handleMCPRequest(
  request: MCPRequest,
  env: Bindings
): Promise<MCPResponse> {
  const { id, method, params } = request;

  try {
    // Handle MCP protocol methods
    switch (method) {
      case 'initialize':
        return createMCPResponse(id, {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                protocolVersion: '2024-11-05',
                serverInfo: {
                  name: 'file-converter-mcp',
                  version: '1.0.0',
                },
                capabilities: {
                  tools: {},
                },
              }),
            },
          ],
        });

      case 'tools/list':
        return createMCPResponse(id, {
          content: [
            {
              type: 'text',
              text: JSON.stringify({ tools }),
            },
          ],
        });

      case 'tools/call': {
        const toolName = params?.name;
        const args = params?.arguments || {};

        if (!toolName) {
          return createInvalidParams(id, 'Tool name is required');
        }

        const tool = getToolByName(toolName);
        if (!tool) {
          return createMethodNotFound(id);
        }

        // Dispatch to tool handlers
        try {
          let result: any;

          switch (toolName) {
            // Phase 2: Browser Rendering PDFs
            case 'html_to_pdf':
              result = await htmlToPdf(args, env);
              break;

            case 'url_to_pdf':
              result = await urlToPdf(args, env);
              break;

            case 'markdown_to_pdf':
              result = await markdownToPdf(args, env);
              break;

            // Phase 3: Browser Rendering Screenshots
            case 'html_to_screenshot':
              result = await htmlToScreenshot(args, env);
              break;

            case 'url_to_screenshot':
              result = await urlToScreenshot(args, env);
              break;

            // Phase 4: Workers AI Markdown
            case 'document_to_markdown':
              result = await documentToMarkdown(args, env);
              break;

            // Phase 5: PDF.co Data Extraction
            case 'excel_to_json':
              result = await excelToJson(args, env);
              break;

            // Phase 6: PDF.co Office Conversions
            case 'office_to_pdf':
              result = await officeToPdf(args, env);
              break;

            // Phase 7: PDF.co PDF Operations
            case 'merge_pdfs':
              result = await handleMergePdfs(args, env);
              break;
            case 'split_pdf':
              result = await handleSplitPdf(args, env);
              break;
            case 'extract_pdf_tables':
              result = await handleExtractPdfTables(args, env);
              break;

            // Phase 8: Browser Rendering Images
            case 'pdf_to_images':
              result = await handlePdfToImages(args, env);
              break;
            case 'document_to_images':
              result = await handleDocumentToImages(args, env);
              break;

            // Future phases will add more tools here
            default:
              return createInternalError(
                id,
                `Tool "${toolName}" not yet implemented`
              );
          }

          return createMCPResponse(id, {
            content: [
              {
                type: 'text',
                text: JSON.stringify(result),
              },
            ],
          });
        } catch (error: any) {
          console.error(`Tool execution error (${toolName}):`, error);
          return createInternalError(id, error.message);
        }
      }

      default:
        return createMethodNotFound(id);
    }
  } catch (error: any) {
    console.error('MCP request error:', error);
    return createInternalError(id, error.message);
  }
}
