import { expect, Page } from '@playwright/test';
import { Base } from './Base';
import { locators } from '../data/locators';
import { pageUrls } from '../data/pageurls';
import { keyWords } from '../data/keywords';

export class LoginPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  async login(email: string, password: string, expectSuccess: boolean = true) {
    await this.navigateToPage(pageUrls.loginPage);

    await this.page.locator(locators.loginPage.emailInput).waitFor();
    await this.page.locator(locators.loginPage.passwordInput).waitFor();
    await this.page.fill(locators.loginPage.emailInput, email);
    await this.page.fill(locators.loginPage.passwordInput, password);
    await this.page.click(locators.loginPage.submitButton);

    if (expectSuccess) {
      await this.assertLoginSuccess();
    } else {
      await this.assertLoginFailure();
    }
  }

  async assertLoginSuccess() {
    const accountTitle = await this.page.locator(locators.loginPage.accountTitle);
    await accountTitle.waitFor();
    await expect(accountTitle).toContainText(keyWords.loginPage.header);
    await expect(this.page).toHaveURL(new RegExp(`.*${pageUrls.accountPage}`));
  }

  async assertLoginFailure() {
    const errorMessage = await this.page.locator(locators.loginPage.errorMessage);
    await errorMessage.waitFor();
    await expect(errorMessage).toBeVisible();
  }
}