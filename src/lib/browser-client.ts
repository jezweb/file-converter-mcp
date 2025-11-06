import puppeteer, { type Browser, type Page, type PDFOptions } from '@cloudflare/puppeteer';
import type { Bindings } from '../mcp/types';

/**
 * Launch a new browser instance using Cloudflare Browser Rendering
 * @param binding - Browser binding from env.BROWSER
 * @returns Browser instance (must be closed after use)
 */
export async function launchBrowser(binding: Bindings['BROWSER']): Promise<Browser> {
  return await puppeteer.launch(binding);
}

/**
 * Close browser and cleanup resources
 * @param browser - Browser instance to close
 */
export async function closeBrowser(browser: Browser): Promise<void> {
  await browser.close();
}

/**
 * Generate PDF from HTML content
 * @param browser - Active browser instance
 * @param html - HTML content to convert
 * @param options - PDF generation options
 * @returns PDF buffer
 */
export async function generatePdfFromHtml(
  browser: Browser,
  html: string,
  options: PDFOptions = {}
): Promise<Buffer> {
  const page = await browser.newPage();

  try {
    await page.setContent(html, { waitUntil: 'networkidle2' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true, // CRITICAL: Enable CSS backgrounds/colors
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm',
      },
      ...options,
    });

    return pdfBuffer;
  } finally {
    await page.close();
  }
}

/**
 * Generate PDF from URL
 * @param browser - Active browser instance
 * @param url - URL to convert
 * @param options - PDF generation options
 * @returns PDF buffer
 */
export async function generatePdfFromUrl(
  browser: Browser,
  url: string,
  options: PDFOptions = {}
): Promise<Buffer> {
  const page = await browser.newPage();

  try {
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm',
      },
      ...options,
    });

    return pdfBuffer;
  } finally {
    await page.close();
  }
}

/**
 * Generate screenshot from HTML content
 * @param browser - Active browser instance
 * @param html - HTML content to capture
 * @param format - Image format (png, jpeg, webp)
 * @param fullPage - Capture full page height
 * @returns Image buffer
 */
export async function generateScreenshotFromHtml(
  browser: Browser,
  html: string,
  format: 'png' | 'jpeg' | 'webp' = 'png',
  fullPage: boolean = true
): Promise<Buffer> {
  const page = await browser.newPage();

  try {
    await page.setContent(html, { waitUntil: 'networkidle2' });

    const screenshotBuffer = await page.screenshot({
      type: format,
      fullPage,
      omitBackground: format === 'png', // Transparent background for PNG
    });

    return screenshotBuffer as Buffer;
  } finally {
    await page.close();
  }
}

/**
 * Generate screenshot from URL
 * @param browser - Active browser instance
 * @param url - URL to capture
 * @param format - Image format (png, jpeg, webp)
 * @param fullPage - Capture full page height
 * @returns Image buffer
 */
export async function generateScreenshotFromUrl(
  browser: Browser,
  url: string,
  format: 'png' | 'jpeg' | 'webp' = 'png',
  fullPage: boolean = true
): Promise<Buffer> {
  const page = await browser.newPage();

  try {
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    const screenshotBuffer = await page.screenshot({
      type: format,
      fullPage,
      omitBackground: format === 'png',
    });

    return screenshotBuffer as Buffer;
  } finally {
    await page.close();
  }
}
