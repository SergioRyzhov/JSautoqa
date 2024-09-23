import { expect, Page } from '@playwright/test';
import { Base } from './Base';
import { locators } from './locators';

export class LoginPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  async getLogin(email: string, password: string) {
    await this.preparePage('/login');
    const emailElement = this.page.locator(locators.loginPage.emailInput);
    const passwordElement = this.page.locator(locators.loginPage.passwordInput);
    
    await emailElement.waitFor();
    await passwordElement.waitFor();

    await this.page.fill(locators.loginPage.emailInput, email);
    await this.page.fill(locators.loginPage.passwordInput, password);
    await this.page.click(locators.loginPage.submitButton);
  }

  async assertLoginSuccess() {
    const accountTitle = this.page.locator(locators.loginPage.accountTitle);
    await accountTitle.waitFor();
    await expect(accountTitle).toContainText('Account'); 
  }

  async assertLoginFailure() {
    const errorMessage = this.page.locator(locators.loginPage.errorMessage);
    await errorMessage.waitFor();
    await expect(errorMessage).toBeVisible();
  }
}