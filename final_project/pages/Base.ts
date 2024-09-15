import { Page } from '@playwright/test';
import { locators } from './locators';

export class Base {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async passAcceptCookieWindow() {
    let acceptCookieExists = await this.page.locator(locators.basePage.acceptCookieMainWindow).isVisible();
    while (acceptCookieExists) {
        await this.page.locator(locators.basePage.acceptCookieButton).click();
        acceptCookieExists = await this.page.locator(locators.basePage.acceptCookieMainWindow).isVisible();
    }
  }

  async handleCaptcha() {
    const captchaExists = await this.page.locator(locators.basePage.captchaFrameSelector).isVisible();
    
    if (captchaExists) {
      console.log('CAPTCHA detected');
      await this.page.pause();
    }
  }

  async visit(path: string) {
    await this.page.goto(path);
    await this.passAcceptCookieWindow();
    await this.handleCaptcha();
  }
}