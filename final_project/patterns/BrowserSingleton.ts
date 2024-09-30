import { Browser, BrowserContext, Page, chromium } from 'playwright';

export class BrowserSingleton {
  private static instance: BrowserSingleton;
  private context!: BrowserContext;
  private browser!: Browser;
  private page!: Page;

  public static async getInstance(): Promise<BrowserSingleton> {
    if (!BrowserSingleton.instance) {
      BrowserSingleton.instance = new BrowserSingleton();
      await BrowserSingleton.instance.init();
    }
    return BrowserSingleton.instance;
  }

  private async init() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  public async getPage(): Promise<Page> {
    if (!this.page) {
      this.page = await this.context.newPage();
    }
    return this.page;
  }

  public async close() {
    await this.browser.close();
  }
}