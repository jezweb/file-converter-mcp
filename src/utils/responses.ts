import type { MCPResponse, MCPError, MCPToolResult } from '../mcp/types';

// JSON-RPC Error Codes
export const ErrorCodes = {
  PARSE_ERROR: -32700,
  INVALID_REQUEST: -32600,
  METHOD_NOT_FOUND: -32601,
  INVALID_PARAMS: -32602,
  INTERNAL_ERROR: -32603,
} as const;

// Create successful MCP response
export function createMCPResponse(
  id: number | string,
  result: MCPToolResult
): MCPResponse {
  return {
    jsonrpc: '2.0',
    id,
    result,
  };
}

// Create error response
export function createMCPError(
  id: number | string,
  code: number,
  message: string,
  data?: any
): MCPResponse {
  return {
    jsonrpc: '2.0',
    id,
    error: {
      code,
      message,
      data,
    },
  };
}

// Specific error creators
export function createParseError(id: number | string = 0): MCPResponse {
  return createMCPError(id, ErrorCodes.PARSE_ERROR, 'Parse error');
}

export function createInvalidRequest(id: number | string = 0): MCPResponse {
  return createMCPError(id, ErrorCodes.INVALID_REQUEST, 'Invalid request');
}

export function createMethodNotFound(id: number | string): MCPResponse {
  return createMCPError(id, ErrorCodes.METHOD_NOT_FOUND, 'Method not found');
}

export function createInvalidParams(id: number | string, message?: string): MCPResponse {
  return createMCPError(
    id,
    ErrorCodes.INVALID_PARAMS,
    message || 'Invalid params'
  );
}

export function createInternalError(id: number | string, message?: string): MCPResponse {
  return createMCPError(
    id,
    ErrorCodes.INTERNAL_ERROR,
    message || 'Internal error'
  );
}

// Create tool result with text content
export function createTextResult(text: string, isError = false): MCPToolResult {
  return {
    content: [
      {
        type: 'text',
        text,
      },
    ],
    isError,
  };
}

// Create tool result from object (JSON stringified)
export function createJsonResult(data: any, isError = false): MCPToolResult {
  return createTextResult(JSON.stringify(data, null, 2), isError);
}
