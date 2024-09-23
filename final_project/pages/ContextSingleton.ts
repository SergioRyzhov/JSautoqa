import { BrowserContext, chromium } from '@playwright/test';

export class ContextSingleton {
  private static instance: BrowserContext;

  private constructor() {}

  public static async getInstance(): Promise<BrowserContext> {
    if (!ContextSingleton.instance) {
      const browser = await chromium.launch({ headless: false });
      ContextSingleton.instance = await browser.newContext();
    }
    return ContextSingleton.instance;
  }
}