import { BrowserContext, Page } from '@playwright/test';
import { basePage } from '../data/locators';

export class Base {
  protected page: Page;
  protected context?: BrowserContext;

  constructor(page: Page) {
    this.page = page;
    this.page.on('framenavigated', async () => {
      await this.closeCookiePopup();
      await this.handleCaptcha();
    });
  }

  async closeCookiePopup() {
    try {
      const acceptCookieMainWindow = this.page.locator(
        basePage.acceptCookieMainWindow
      );

      if (await acceptCookieMainWindow.isVisible()) {
        await this.page.locator(basePage.acceptCookieButton).click();
      }
    } catch (error) {}
  }

  async handleCaptcha() {
    try {
      const captchaLocator = this.page.locator(basePage.captchaFrameSelector);
      const captchaExists = await captchaLocator.first().isVisible();

      if (captchaExists) {
        await this.page.pause();
      }
    } catch (error) {}
  }

  async refreshThePage() {
    await this.page.reload({ waitUntil: 'load' });
  }

  async navigateToPage(url: string) {
    await this.page.goto(url, { waitUntil: 'load' });
  }
}
