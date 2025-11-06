// MCP Protocol Types
export interface MCPRequest {
  jsonrpc: '2.0';
  id: number | string;
  method: string;
  params?: Record<string, any>;
}

export interface MCPResponse {
  jsonrpc: '2.0';
  id: number | string;
  result?: any;
  error?: MCPError;
}

export interface MCPError {
  code: number;
  message: string;
  data?: any;
}

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, any>;
    required?: string[];
  };
}

export interface MCPToolResult {
  content: Array<{
    type: 'text' | 'image' | 'resource';
    text?: string;
    data?: string;
    mimeType?: string;
  }>;
  isError?: boolean;
}

// Cloudflare Bindings
export interface Bindings {
  BROWSER: Fetcher;
  AI: Ai;
  R2_BUCKET: R2Bucket;
  PDFCO_API_KEY: string;
  AUTH_TOKEN: string;
}

// PDF.co API Types
export interface PdfCoResponse {
  error: boolean;
  status: number;
  url?: string;
  urls?: string[];
  message?: string;
  remainingCredits?: number;
  pageCount?: number;
  body?: string;
}

// Workers AI Types
export interface MarkdownConversionResult {
  mimeType: string;
  format: 'markdown';
  tokens: number;
  data: string;
}

export interface SupportedFormat {
  extension: string;
  mimeType: string;
}
