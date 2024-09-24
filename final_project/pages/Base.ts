import { BrowserContext, Page } from '@playwright/test';
import { locators } from './locators';
import { ContextSingleton } from './ContextSingleton';

export class Base {
  protected page: Page;
  protected context?: BrowserContext;

  constructor(page: Page) {
    this.page = page;
    this.page.on('framenavigated', async () => {
      await this.closeCookiePopup();
    });
  }

  async initContext() {
    this.context = await ContextSingleton.getInstance();
  }

  async setCookie() {
    await this.initContext();
    const cookie = {
      name: 'cookieConsent',
      value: 'true',
      domain: 'boohoo.com',
      path: '/',
      secure: true,
      httpOnly: false,
      sameSite: 'Lax' as 'Lax',
    };
    await this.context?.addCookies([cookie]);
  }
  
  async closeCookiePopup() {
    try {
      const acceptCookieMainWindow = this.page.locator(locators.basePage.acceptCookieMainWindow);
          
      if (await acceptCookieMainWindow.isVisible()) {
          await this.page.locator(locators.basePage.acceptCookieButton).click();
      }
    } catch (error) {}    
  }

  async handleCaptcha() {
    const captchaExists = await this.page.locator(locators.basePage.captchaFrameSelector).isVisible();
    
    if (captchaExists) {
      console.log('CAPTCHA detected');
      await this.page.pause();
    }
  }

  async preparePage(path: string) {
    await this.initContext();
    await this.setCookie();
    await this.page.goto(path);
    await this.handleCaptcha();
  }
}