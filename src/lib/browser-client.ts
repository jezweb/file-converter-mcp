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
      waitUntil: 'load', // Wait for DOM + resources (images, CSS, fonts)
      timeout: 15000,     // Fail faster for slow/broken sites
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
 * Screenshot options interface
 */
export interface ScreenshotOptions {
  format?: 'png' | 'jpeg' | 'webp';
  fullPage?: boolean;
  viewport?: {
    width?: number;
    height?: number;
  };
  scrollDelay?: number;
  quality?: number;
  clipSelector?: string;
}

/**
 * Generate screenshot from HTML content
 * @param browser - Active browser instance
 * @param html - HTML content to capture
 * @param options - Screenshot options
 * @returns Image buffer
 */
export async function generateScreenshotFromHtml(
  browser: Browser,
  html: string,
  options: ScreenshotOptions = {}
): Promise<Buffer> {
  const {
    format = 'png',
    fullPage = true,
    viewport,
    scrollDelay = 0,
    quality = 80,
    clipSelector,
  } = options;

  const page = await browser.newPage();

  try {
    // Set custom viewport if provided
    if (viewport) {
      await page.setViewport({
        width: viewport.width || 1280,
        height: viewport.height || 720,
        deviceScaleFactor: 2, // High DPI for sharp images
      });
    }

    await page.setContent(html, { waitUntil: 'networkidle2' });

    // Handle clipSelector (capture specific element only)
    let screenshotBuffer: Buffer | Uint8Array;

    if (clipSelector) {
      const element = await page.$(clipSelector);
      if (!element) {
        throw new Error(`Element not found for selector: ${clipSelector}`);
      }
      screenshotBuffer = await element.screenshot({
        type: format,
        omitBackground: format === 'png',
        ...(format !== 'png' && { quality }),
      });
    } else {
      // Full page or viewport screenshot
      screenshotBuffer = await page.screenshot({
        type: format,
        fullPage,
        omitBackground: format === 'png',
        ...(format !== 'png' && { quality }),
        ...(scrollDelay > 0 && fullPage && {
          captureBeyondViewport: true,
          // Note: Puppeteer doesn't have native scrollDelay, but captureBeyondViewport helps
        }),
      });
    }

    // Simulate scroll delay for lazy-loading if requested
    if (scrollDelay > 0 && fullPage && !clipSelector) {
      const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = viewport?.height || 720;
      const scrollSteps = Math.ceil(bodyHeight / viewportHeight);

      for (let i = 0; i < scrollSteps; i++) {
        await page.evaluate((step: number, vpHeight: number) => {
          window.scrollTo(0, step * vpHeight);
        }, i, viewportHeight);
        await new Promise(resolve => setTimeout(resolve, scrollDelay));
      }

      // Take final screenshot after scrolling
      screenshotBuffer = await page.screenshot({
        type: format,
        fullPage,
        omitBackground: format === 'png',
        ...(format !== 'png' && { quality }),
      });
    }

    return screenshotBuffer as Buffer;
  } finally {
    await page.close();
  }
}

/**
 * Generate screenshot from URL
 * @param browser - Active browser instance
 * @param url - URL to capture
 * @param options - Screenshot options
 * @returns Image buffer
 */
export async function generateScreenshotFromUrl(
  browser: Browser,
  url: string,
  options: ScreenshotOptions = {}
): Promise<Buffer> {
  const {
    format = 'png',
    fullPage = true,
    viewport,
    scrollDelay = 0,
    quality = 80,
    clipSelector,
  } = options;

  const page = await browser.newPage();

  try {
    // Set custom viewport if provided
    if (viewport) {
      await page.setViewport({
        width: viewport.width || 1280,
        height: viewport.height || 720,
        deviceScaleFactor: 2, // High DPI for sharp images
      });
    }

    await page.goto(url, {
      waitUntil: 'load', // Wait for DOM + resources (images, CSS, fonts)
      timeout: 15000,     // Fail faster for slow/broken sites
    });

    // Simulate scroll delay for lazy-loading if requested
    if (scrollDelay > 0 && fullPage && !clipSelector) {
      const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = viewport?.height || 720;
      const scrollSteps = Math.ceil(bodyHeight / viewportHeight);

      for (let i = 0; i < scrollSteps; i++) {
        await page.evaluate((step: number, vpHeight: number) => {
          window.scrollTo(0, step * vpHeight);
        }, i, viewportHeight);
        await new Promise(resolve => setTimeout(resolve, scrollDelay));
      }
    }

    // Handle clipSelector (capture specific element only)
    let screenshotBuffer: Buffer | Uint8Array;

    if (clipSelector) {
      const element = await page.$(clipSelector);
      if (!element) {
        throw new Error(`Element not found for selector: ${clipSelector}`);
      }
      screenshotBuffer = await element.screenshot({
        type: format,
        omitBackground: format === 'png',
        ...(format !== 'png' && { quality }),
      });
    } else {
      // Full page or viewport screenshot
      screenshotBuffer = await page.screenshot({
        type: format,
        fullPage,
        omitBackground: format === 'png',
        ...(format !== 'png' && { quality }),
      });
    }

    return screenshotBuffer as Buffer;
  } finally {
    await page.close();
  }
}
