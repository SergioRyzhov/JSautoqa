import { expect, Page } from '@playwright/test';
import { Base } from './Base';
import { locators  } from './locators';

export class LoginPage extends Base {

  constructor(page: Page) {
    super(page);
  }

  async getLogin(email: string, password: string) {
    await this.visit('/login');
    await this.page.fill(locators.loginPage.emailInput, email);
    await this.page.fill(locators.loginPage.passwordInput, password);
    await this.page.click(locators.loginPage.submitButton);
  }

  async assertLoginSuccess() {
    const accountTitle = this.page.locator(locators.loginPage.accountTitle);
    await expect(accountTitle).toBeVisible();
    await expect(accountTitle).toContainText('Account'); 
  }

  async assertLoginFailure() {
    const errorMessage = this.page.locator(locators.loginPage.errorMessage);
    await expect(errorMessage).toBeVisible();
  }
}