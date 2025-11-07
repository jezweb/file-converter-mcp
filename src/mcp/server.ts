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
