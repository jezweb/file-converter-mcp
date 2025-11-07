import type { Bindings } from '../mcp/types';
import { launchBrowser, closeBrowser, generateScreenshotFromHtml, generateScreenshotFromUrl } from '../lib/browser-client';
import { uploadImageToR2 } from '../lib/r2-storage';

// Type definitions for handler arguments
export interface HtmlToScreenshotArgs {
  html: string;
  format?: 'png' | 'jpeg' | 'webp';
  fullPage?: boolean;
  viewport?: {
    width?: number;
    height?: number;
  };
}

export interface UrlToScreenshotArgs {
  url: string;
  format?: 'png' | 'jpeg' | 'webp';
  fullPage?: boolean;
  viewport?: {
    width?: number;
    height?: number;
  };
}

/**
 * Convert HTML/CSS to screenshot image
 * @param args - HTML content and screenshot options
 * @param env - Worker bindings
 * @returns Public URL to generated screenshot
 */
export async function htmlToScreenshot(args: HtmlToScreenshotArgs, env: Bindings): Promise<{ imageUrl: string }> {
  const { html, format = 'png', fullPage = true, viewport } = args;

  // Validate HTML is not empty
  if (!html || html.trim().length === 0) {
    throw new Error('HTML content cannot be empty');
  }

  const browser = await launchBrowser(env.BROWSER);

  try {
    // Set custom viewport if provided
    if (viewport) {
      const page = await browser.newPage();
      await page.setViewport({
        width: viewport.width || 1280,
        height: viewport.height || 720,
        deviceScaleFactor: 2, // High DPI for sharp images
      });
      await page.close();
    }

    // Generate screenshot with specified options
    const imageBuffer = await generateScreenshotFromHtml(browser, html, format, fullPage);

    // Upload to R2 (detect dev mode)
    const isDev = true; // For now, set to true in dev mode
    const { publicUrl } = await uploadImageToR2(env.R2_BUCKET, imageBuffer, format, 'converted/html-screenshot', isDev);

    return { imageUrl: publicUrl };
  } catch (error: any) {
    if (error.message.includes('timeout')) {
      throw new Error('Screenshot generation timed out. Try simpler HTML or increase timeout.');
    }
    throw new Error(`Failed to generate screenshot from HTML: ${error.message}`);
  } finally {
    await closeBrowser(browser);
  }
}

/**
 * Convert webpage to screenshot image by URL
 * @param args - URL and screenshot options
 * @param env - Worker bindings
 * @returns Public URL to generated screenshot
 */
export async function urlToScreenshot(args: UrlToScreenshotArgs, env: Bindings): Promise<{ imageUrl: string }> {
  const { url, format = 'png', fullPage = true, viewport } = args;

  // Validate URL format
  try {
    new URL(url);
  } catch {
    throw new Error('Invalid URL provided. Must be a valid HTTP/HTTPS URL.');
  }

  const browser = await launchBrowser(env.BROWSER);

  try {
    // Set custom viewport if provided
    if (viewport) {
      const page = await browser.newPage();
      await page.setViewport({
        width: viewport.width || 1280,
        height: viewport.height || 720,
        deviceScaleFactor: 2, // High DPI for sharp images
      });
      await page.close();
    }

    // Generate screenshot from URL
    const imageBuffer = await generateScreenshotFromUrl(browser, url, format, fullPage);

    // Upload to R2
    const isDev = true; // For now, set to true in dev mode
    const { publicUrl } = await uploadImageToR2(env.R2_BUCKET, imageBuffer, format, 'converted/url-screenshot', isDev);

    return { imageUrl: publicUrl };
  } catch (error: any) {
    if (error.message.includes('timeout')) {
      throw new Error('Screenshot generation timed out. The webpage may be too complex or slow to load.');
    }
    if (error.message.includes('net::')) {
      throw new Error('Failed to load URL. Check that the URL is publicly accessible.');
    }
    throw new Error(`Failed to generate screenshot from URL: ${error.message}`);
  } finally {
    await closeBrowser(browser);
  }
}
