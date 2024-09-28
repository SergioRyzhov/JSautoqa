import { BrowserContext, Page } from '@playwright/test';
import { locators } from '../data/locators';

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
      const acceptCookieMainWindow = this.page.locator(locators.basePage.acceptCookieMainWindow);

      if (await acceptCookieMainWindow.isVisible()) {
        await this.page.locator(locators.basePage.acceptCookieButton).click();
      }
    } catch (error) { }
  }

  async handleCaptcha() {
    try {
      const captchaLocator = this.page.locator(locators.basePage.captchaFrameSelector);
      const captchaExists = await captchaLocator.first().isVisible();

      if (captchaExists) {
        console.log('Captcha detected');
        await this.page.pause();
      }
    } catch (error) {
      // console.log('Error:', error);
    }
  }

  async navigateToPage(url: string) {
    await this.page.goto(url, { waitUntil: 'load' });
  }
}