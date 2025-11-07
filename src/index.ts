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
    tools: 13, // Phase 8: 13/13 tools complete! (3 PDF + 2 screenshots + 2 images + 1 markdown + 1 excel + 1 office + 3 PDF ops)
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
    .connection-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }
    .connection-card {
      background: #ffffff;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      padding: 1.5rem;
      transition: all 0.2s ease;
      position: relative;
    }
    .connection-card:hover {
      border-color: #667eea;
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
      transform: translateY(-2px);
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    .client-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 1.25rem;
      flex-shrink: 0;
    }
    .client-name {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }
    .client-desc {
      font-size: 0.85rem;
      color: #718096;
      margin: 0.25rem 0 0 0;
    }
    .connection-code {
      background: #1a202c;
      color: #68d391;
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      font-family: 'Courier New', monospace;
      font-size: 0.85rem;
      line-height: 1.6;
      margin: 1rem 0;
      white-space: pre-wrap;
      word-break: break-all;
    }
    .copy-btn {
      width: 100%;
      background: #667eea;
      color: white;
      border: none;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s ease;
    }
    .copy-btn:hover {
      background: #5568d3;
      transform: translateY(-1px);
    }
    .copy-btn:active {
      transform: translateY(0);
    }
    .copy-btn.copied {
      background: #10b981;
    }
    .copy-btn.copied svg {
      display: none;
    }
  </style>
  <script>
    const configs = {
      'better-chatbot': \`{
  "url": "${deployUrl}/mcp",
  "transport": "http",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN"
  }
}\`,
      'claude-desktop': \`{
  "file-converter": {
    "url": "${deployUrl}/mcp",
    "transport": "http",
    "headers": {
      "Authorization": "Bearer YOUR_TOKEN"
    }
  }
}\`,
      'fastmcp': \`from fastmcp import Client

client = Client("${deployUrl}/mcp",
  headers={
    "Authorization": "Bearer YOUR_TOKEN"
  }
)\`,
      'openai': \`const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const response = await client.responses.create({
  tools: [{
    type: "custom_mcp",
    mcp: {
      url: "${deployUrl}/mcp",
      headers: {
        Authorization: "Bearer YOUR_TOKEN"
      }
    }
  }]
});\`,
      'curl': \`curl -X POST ${deployUrl}/mcp \\\\
  -H "Authorization: Bearer YOUR_TOKEN" \\\\
  -H "Content-Type: application/json" \\\\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'\`,
      'generic': \`{
  "name": "File Converter",
  "url": "${deployUrl}/mcp",
  "transport": "http",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN"
  }
}\`
    };

    function copyConfig(client) {
      const text = configs[client];
      navigator.clipboard.writeText(text).then(() => {
        const btn = event.target.closest('.copy-btn');
        const originalText = btn.textContent;
        btn.classList.add('copied');
        btn.textContent = '✓ Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalText;
        }, 2000);
      });
    }
  </script>
</head>
<body>
  <div class="container">
    <h1>📄 File Converter MCP Server</h1>
    <p class="subtitle">Document conversion & processing for AI agents</p>

    <div class="section">
      <h2>🚀 Connect to MCP Clients</h2>
      <p style="margin-bottom: 1rem; color: #4a5568;">Choose your preferred client to get started:</p>

      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1rem; border-radius: 4px; margin-bottom: 1.5rem;">
        <strong style="color: #92400e;">⚠️ Important:</strong>
        <span style="color: #78350f;">This server uses <strong>HTTP transport</strong>, not SSE. Always include <code style="background: #fed7aa; padding: 0.125rem 0.25rem; border-radius: 3px;">"transport": "http"</code> in your configuration.</span>
      </div>

      <div class="connection-grid">
        <!-- Better Chatbot -->
        <div class="connection-card">
          <div class="card-header">
            <div class="client-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">BC</div>
            <div>
              <h3 class="client-name">Better Chatbot</h3>
              <p class="client-desc">HTTP transport config</p>
            </div>
          </div>
          <pre class="connection-code">{
  "url": "${deployUrl}/mcp",
  "transport": "http",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN"
  }
}</pre>
          <button class="copy-btn" onclick="copyConfig('better-chatbot')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Config
          </button>
        </div>

        <!-- Claude Desktop -->
        <div class="connection-card">
          <div class="card-header">
            <div class="client-icon" style="background: #D97757;">C</div>
            <div>
              <h3 class="client-name">Claude Desktop</h3>
              <p class="client-desc">Add to MCP settings</p>
            </div>
          </div>
          <pre class="connection-code">{
  "file-converter": {
    "url": "${deployUrl}/mcp",
    "transport": "http",
    "headers": {
      "Authorization": "Bearer YOUR_TOKEN"
    }
  }
}</pre>
          <button class="copy-btn" onclick="copyConfig('claude-desktop')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Config
          </button>
        </div>

        <!-- FastMCP Client -->
        <div class="connection-card">
          <div class="card-header">
            <div class="client-icon" style="background: #10b981;">F</div>
            <div>
              <h3 class="client-name">FastMCP Client</h3>
              <p class="client-desc">Python SDK integration</p>
            </div>
          </div>
          <pre class="connection-code">from fastmcp import Client

client = Client("${deployUrl}/mcp",
  headers={
    "Authorization": "Bearer YOUR_TOKEN"
  }
)</pre>
          <button class="copy-btn" onclick="copyConfig('fastmcp')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Code
          </button>
        </div>

        <!-- OpenAI SDK -->
        <div class="connection-card">
          <div class="card-header">
            <div class="client-icon" style="background: #000000;">AI</div>
            <div>
              <h3 class="client-name">OpenAI Responses API</h3>
              <p class="client-desc">Access via responses.create()</p>
            </div>
          </div>
          <pre class="connection-code">const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const response = await client.responses.create({
  tools: [{
    type: "custom_mcp",
    mcp: {
      url: "${deployUrl}/mcp",
      headers: {
        Authorization: "Bearer YOUR_TOKEN"
      }
    }
  }]
});</pre>
          <button class="copy-btn" onclick="copyConfig('openai')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Code
          </button>
        </div>

        <!-- cURL -->
        <div class="connection-card">
          <div class="card-header">
            <div class="client-icon" style="background: #3b82f6;">⚡</div>
            <div>
              <h3 class="client-name">cURL / HTTP</h3>
              <p class="client-desc">Direct API testing</p>
            </div>
          </div>
          <pre class="connection-code">curl -X POST ${deployUrl}/mcp \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }'</pre>
          <button class="copy-btn" onclick="copyConfig('curl')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Command
          </button>
        </div>

        <!-- Generic HTTP -->
        <div class="connection-card">
          <div class="card-header">
            <div class="client-icon" style="background: #8b5cf6;">🔗</div>
            <div>
              <h3 class="client-name">Generic HTTP Client</h3>
              <p class="client-desc">For any MCP-compatible client</p>
            </div>
          </div>
          <pre class="connection-code">{
  "name": "File Converter",
  "url": "${deployUrl}/mcp",
  "transport": "http",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN"
  }
}</pre>
          <button class="copy-btn" onclick="copyConfig('generic')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Config
          </button>
        </div>
      </div>
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
      <strong>⚠️ Authentication Required:</strong> The /mcp endpoint requires a Bearer token. Replace <code>YOUR_TOKEN</code> in the configs above with your actual token.
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
