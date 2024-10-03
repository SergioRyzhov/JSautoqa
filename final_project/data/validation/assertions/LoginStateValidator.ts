import { Page, expect } from '@playwright/test';
import { pageEndpoints } from '../../endpoints';
import { logoutPage, loginPage } from '../../locators';
import { textData } from '../../textData';

export class StateValidator {
  constructor(private page: Page) {}

  async assertPageState(headerLocator: string, expectedText: string, expectedUrlEndpoint: string) {
    const title = await this.page.locator(headerLocator);
    await title.waitFor();
    await expect(title).toContainText(expectedText);
    await expect(this.page).toHaveURL(new RegExp(`.*${expectedUrlEndpoint}`));
  }

  async assertLoggedOut() {
    await this.assertPageState(logoutPage.loginHeader, textData.logoutPage.header, pageEndpoints.loginPage);
  }

  async assertLoginSuccess() {
    await this.assertPageState(loginPage.accountTitle, textData.loginPage.header, pageEndpoints.accountPage);
  }

  async assertLoginFailure() {
    const errorMessage = await this.page.locator(loginPage.errorMessage);
    await errorMessage.waitFor();
    await expect(errorMessage).toBeVisible();
  }
}