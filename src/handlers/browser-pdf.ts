import { marked } from 'marked';
import type { Bindings } from '../mcp/types';
import { launchBrowser, closeBrowser, generatePdfFromHtml, generatePdfFromUrl } from '../lib/browser-client';
import { uploadPdfToR2 } from '../lib/r2-storage';

// Type definitions for handler arguments
export interface HtmlToPdfArgs {
  html: string;
  format?: 'A4' | 'Letter' | 'Legal';
  landscape?: boolean;
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

export interface UrlToPdfArgs {
  url: string;
  format?: 'A4' | 'Letter' | 'Legal';
  landscape?: boolean;
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

export interface MarkdownToPdfArgs {
  markdown: string;
  format?: 'A4' | 'Letter' | 'Legal';
  landscape?: boolean;
  margin?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  css?: string;
}

/**
 * Convert HTML/CSS to PDF
 * @param args - HTML content and PDF options
 * @param env - Worker bindings
 * @returns Public URL to generated PDF
 */
export async function htmlToPdf(args: HtmlToPdfArgs, env: Bindings): Promise<{ pdfUrl: string }> {
  const { html, format = 'A4', landscape = false, margin } = args;

  // Validate HTML is not empty
  if (!html || html.trim().length === 0) {
    throw new Error('HTML content cannot be empty');
  }

  const browser = await launchBrowser(env.BROWSER);

  try {
    // Generate PDF with specified options
    const pdfBuffer = await generatePdfFromHtml(browser, html, {
      format,
      landscape,
      margin: margin || {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm',
      },
    });

    // Upload to R2 (detect dev mode by checking bucket name in error or via ENV)
    const isDev = true; // For now, set to true in dev mode
    const { publicUrl } = await uploadPdfToR2(env.R2_BUCKET, pdfBuffer, 'converted/html', isDev);

    return { pdfUrl: publicUrl };
  } catch (error: any) {
    if (error.message.includes('timeout')) {
      throw new Error('PDF generation timed out. Try simpler HTML or increase timeout.');
    }
    throw new Error(`Failed to generate PDF from HTML: ${error.message}`);
  } finally {
    await closeBrowser(browser);
  }
}

/**
 * Convert webpage to PDF by URL
 * @param args - URL and PDF options
 * @param env - Worker bindings
 * @returns Public URL to generated PDF
 */
export async function urlToPdf(args: UrlToPdfArgs, env: Bindings): Promise<{ pdfUrl: string }> {
  const { url, format = 'A4', landscape = false, margin } = args;

  // Validate URL format
  try {
    new URL(url);
  } catch {
    throw new Error('Invalid URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  const browser = await launchBrowser(env.BROWSER);

  try {
    // Generate PDF from URL
    const pdfBuffer = await generatePdfFromUrl(browser, url, {
      format,
      landscape,
      margin: margin || {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm',
      },
    });

    // Upload to R2
    const isDev = true; // For now, set to true in dev mode
    const { publicUrl } = await uploadPdfToR2(env.R2_BUCKET, pdfBuffer, 'converted/url', isDev);

    return { pdfUrl: publicUrl };
  } catch (error: any) {
    if (error.message.includes('timeout')) {
      throw new Error('PDF generation timed out. The webpage may be too complex or slow to load.');
    }
    if (error.message.includes('net::')) {
      throw new Error('Failed to load URL. Check that the URL is publicly accessible.');
    }
    throw new Error(`Failed to generate PDF from URL: ${error.message}`);
  } finally {
    await closeBrowser(browser);
  }
}

/**
 * Convert markdown to styled PDF
 * @param args - Markdown content and PDF options
 * @param env - Worker bindings
 * @returns Public URL to generated PDF
 */
export async function markdownToPdf(args: MarkdownToPdfArgs, env: Bindings): Promise<{ pdfUrl: string }> {
  const { markdown, format = 'A4', landscape = false, margin, css = '' } = args;

  // Validate markdown is not empty
  if (!markdown || markdown.trim().length === 0) {
    throw new Error('Markdown content cannot be empty');
  }

  // Convert markdown to HTML
  const contentHtml = await marked(markdown);

  // Wrap in styled template
  const styledHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown PDF</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      background: white;
    }

    h1, h2, h3, h4, h5, h6 {
      color: #111;
      margin-top: 1.5rem;
      margin-bottom: 0.75rem;
      font-weight: 600;
      line-height: 1.25;
    }

    h1 {
      font-size: 2.5rem;
      border-bottom: 2px solid #eee;
      padding-bottom: 0.5rem;
    }

    h2 {
      font-size: 2rem;
      border-bottom: 1px solid #eee;
      padding-bottom: 0.5rem;
    }

    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1.1rem; }
    h6 { font-size: 1rem; }

    p {
      margin-bottom: 1rem;
    }

    a {
      color: #0066cc;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    ul, ol {
      margin-bottom: 1rem;
      padding-left: 2rem;
    }

    li {
      margin-bottom: 0.5rem;
    }

    blockquote {
      border-left: 4px solid #ddd;
      margin-left: 0;
      margin-bottom: 1rem;
      padding-left: 1rem;
      color: #666;
      font-style: italic;
    }

    code {
      background: #f4f4f4;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
      font-size: 0.9em;
      color: #d73a49;
    }

    pre {
      background: #f6f8fa;
      border: 1px solid #e1e4e8;
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 1rem;
      overflow-x: auto;
      line-height: 1.45;
    }

    pre code {
      background: none;
      padding: 0;
      border-radius: 0;
      color: #24292e;
      font-size: 0.85rem;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
    }

    th, td {
      border: 1px solid #ddd;
      padding: 0.75rem;
      text-align: left;
    }

    th {
      background: #f6f8fa;
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: #f9f9f9;
    }

    img {
      max-width: 100%;
      height: auto;
      margin-bottom: 1rem;
    }

    hr {
      border: none;
      border-top: 2px solid #eee;
      margin: 2rem 0;
    }

    /* Custom CSS from user */
    ${css}
  </style>
</head>
<body>
${contentHtml}
</body>
</html>
`;

  const browser = await launchBrowser(env.BROWSER);

  try {
    // Generate PDF with styled HTML
    const pdfBuffer = await generatePdfFromHtml(browser, styledHtml, {
      format,
      landscape,
      margin: margin || {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm',
      },
    });

    // Upload to R2
    const isDev = true; // For now, set to true in dev mode
    const { publicUrl } = await uploadPdfToR2(env.R2_BUCKET, pdfBuffer, 'converted/markdown', isDev);

    return { pdfUrl: publicUrl };
  } catch (error: any) {
    if (error.message.includes('timeout')) {
      throw new Error('PDF generation timed out. Try simpler markdown content.');
    }
    throw new Error(`Failed to generate PDF from markdown: ${error.message}`);
  } finally {
    await closeBrowser(browser);
  }
}
