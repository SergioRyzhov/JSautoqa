import { expect, Page } from '@playwright/test';
import { Base } from './Base';
import { locators } from '../data/locators';
import { keyWords } from '../data/keywords';
import { pageUrls } from '../data/pageurls';

export class LogoutPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  async logout() {
    await this.navigateToPage(pageUrls.accountPage);
    const logoutButton = await this.page.locator(locators.logoutPage.logoutButton);
    await logoutButton.click();
    await this.page.waitForLoadState('load');
    await this.isLoggedOut();
  }

  async isLoggedOut() {
    const title = await this.page.locator(locators.logoutPage.loginHeader);
    await expect(title).toContainText(keyWords.logoutPage.header);
    await expect(this.page).toHaveURL(new RegExp(`.*${pageUrls.loginPage}`));
  }
}