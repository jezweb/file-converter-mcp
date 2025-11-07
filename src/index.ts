import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { bearerAuth } from 'hono/bearer-auth';
import type { Bindings, MCPRequest } from './mcp/types';
import { handleMCPRequest } from './mcp/server';
import { createInvalidRequest, createParseError } from './utils/responses';

const app = new Hono<{ Bindings: Bindings }>();

// CORS middleware - allow all origins for MCP
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint (public)
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    version: '1.0.0',
    tools: 5, // Phase 3: 5 tools implemented (3 PDF + 2 screenshots)
    totalPlanned: 13,
  });
});

// HTML discovery page (public)
app.get('/', (c) => {
  const deployUrl = c.req.url.replace(new URL(c.req.url).pathname, '');

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Converter MCP Server</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 2rem;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      padding: 3rem;
    }
    h1 {
      color: #2d3748;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: #718096;
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }
    .section {
      margin: 2rem 0;
    }
    .section h2 {
      color: #667eea;
      font-size: 1.5rem;
      margin-bottom: 1rem;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 0.5rem;
    }
    .code-block {
      background: #1a202c;
      color: #68d391;
      padding: 1.5rem;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.5;
    }
    .tool-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    .tool-card {
      background: #f7fafc;
      padding: 1rem;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
    .tool-name {
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }
    .tool-desc {
      color: #718096;
      font-size: 0.9rem;
    }
    .warning {
      background: #fff5f5;
      border-left: 4px solid #f56565;
      padding: 1rem;
      border-radius: 4px;
      color: #742a2a;
      margin: 1rem 0;
    }
    .badge {
      display: inline-block;
      background: #667eea;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 500;
      margin-right: 0.5rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📄 File Converter MCP Server</h1>
    <p class="subtitle">Document conversion & processing for AI agents</p>

    <div class="section">
      <h2>🚀 MCP Configuration</h2>
      <p style="margin-bottom: 1rem;">Add this server to your MCP client:</p>
      <div class="code-block">{
  "name": "File Converter",
  "url": "${deployUrl}/mcp",
  "transport": "http",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN"
  }
}</div>
    </div>

    <div class="section">
      <h2>🔧 Available Tools (13)</h2>

      <h3 style="margin-top: 1.5rem; color: #4a5568;">PDF Generation (Browser Rendering)</h3>
      <div class="tool-grid">
        <div class="tool-card">
          <div class="tool-name">html_to_pdf</div>
          <div class="tool-desc">Convert HTML/CSS to PDF</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">url_to_pdf</div>
          <div class="tool-desc">Convert webpages to PDF</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">markdown_to_pdf</div>
          <div class="tool-desc">Styled markdown PDFs</div>
        </div>
      </div>

      <h3 style="margin-top: 1.5rem; color: #4a5568;">Screenshots & Images</h3>
      <div class="tool-grid">
        <div class="tool-card">
          <div class="tool-name">html_to_screenshot</div>
          <div class="tool-desc">HTML → PNG/JPG</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">url_to_screenshot</div>
          <div class="tool-desc">Webpage capture</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">pdf_to_images</div>
          <div class="tool-desc">PDF pages → images</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">document_to_images</div>
          <div class="tool-desc">Office → images</div>
        </div>
      </div>

      <h3 style="margin-top: 1.5rem; color: #4a5568;">Document Processing</h3>
      <div class="tool-grid">
        <div class="tool-card">
          <div class="tool-name">document_to_markdown</div>
          <div class="tool-desc">Extract text as markdown (RAG-ready)</div>
        </div>
      </div>

      <h3 style="margin-top: 1.5rem; color: #4a5568;">Data Extraction & PDF Operations</h3>
      <div class="tool-grid">
        <div class="tool-card">
          <div class="tool-name">excel_to_json</div>
          <div class="tool-desc">Parse spreadsheets</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">office_to_pdf</div>
          <div class="tool-desc">DOCX/PPTX/XLSX → PDF</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">merge_pdfs</div>
          <div class="tool-desc">Combine PDFs</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">split_pdf</div>
          <div class="tool-desc">Extract pages</div>
        </div>
        <div class="tool-card">
          <div class="tool-name">extract_pdf_tables</div>
          <div class="tool-desc">Table data → CSV/JSON</div>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>📊 Tech Stack</h2>
      <p style="margin-bottom: 0.5rem;">
        <span class="badge">Cloudflare Workers</span>
        <span class="badge">Browser Rendering</span>
        <span class="badge">Workers AI</span>
        <span class="badge">PDF.co</span>
        <span class="badge">R2 Storage</span>
      </p>
    </div>

    <div class="warning">
      <strong>⚠️ Authentication Required:</strong> The /mcp endpoint requires a Bearer token.
      Set AUTH_TOKEN in your environment or .dev.vars file.
    </div>

    <div class="section">
      <h2>📝 Example Request</h2>
      <div class="code-block">curl -X POST ${deployUrl}/mcp \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'</div>
    </div>

    <div class="section" style="text-align: center; color: #718096; padding-top: 2rem; border-top: 1px solid #e2e8f0;">
      <p>Built by Jeremy Dawes (Jez) | Powered by Cloudflare & PDF.co</p>
      <p style="margin-top: 0.5rem; font-size: 0.9rem;">
        <a href="https://www.jezweb.com.au" style="color: #667eea; text-decoration: none;">jezweb.com.au</a> |
        <a href="mailto:jeremy@jezweb.net" style="color: #667eea; text-decoration: none;">jeremy@jezweb.net</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;

  return c.html(html);
});

// MCP endpoint (protected with bearer auth)
app.post('/mcp', async (c) => {
  // Manual bearer token check
  const authHeader = c.req.header('Authorization');
  const token = authHeader?.replace('Bearer ', '');

  if (!token || token !== c.env.AUTH_TOKEN) {
    return c.text('Unauthorized', 401);
  }

  try {
    const body = await c.req.json() as MCPRequest;

    // Validate JSON-RPC format
    if (!body || body.jsonrpc !== '2.0' || !body.method) {
      return c.json(createInvalidRequest(body?.id || 0));
    }

    const response = await handleMCPRequest(body, c.env);
    return c.json(response);
  } catch (error) {
    console.error('Failed to parse request:', error);
    return c.json(createParseError());
  }
});

export default app;
