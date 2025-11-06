import type { Bindings, MCPRequest, MCPResponse } from './types';
import { tools, getToolByName } from './tools';
import {
  createMCPResponse,
  createMethodNotFound,
  createInvalidParams,
  createInternalError,
  createJsonResult,
} from '../utils/responses';

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

        // Tool handlers will be added in later phases
        // For now, return not implemented
        return createInternalError(
          id,
          `Tool "${toolName}" not yet implemented`
        );
      }

      default:
        return createMethodNotFound(id);
    }
  } catch (error: any) {
    console.error('MCP request error:', error);
    return createInternalError(id, error.message);
  }
}
