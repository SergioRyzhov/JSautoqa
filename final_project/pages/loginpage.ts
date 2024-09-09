import { expect, Page } from '@playwright/test';

export class LoginPage {
  private emailInput = 'input#dwfrm_login_email';
  private passwordInput = 'input#dwfrm_login_password';
  private submitButton = 'button[data-tau="login_submit"]';
  private accountTitle = 'h1.b-page_title';
  private errorMessage = 'div[data-tau="login_error_message"]';

  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/login');
  }

  async enterEmail(email: string) {
    await this.page.fill(this.emailInput, email);
  }

  async enterPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  async submit() {
    await this.page.click(this.submitButton);
  }

  async assertLoginSuccess() {
    const accountTitle = this.page.locator(this.accountTitle);
    await expect(accountTitle).toBeVisible();
    await expect(accountTitle).toContainText('Account'); 
  }

  async assertLoginFailure() {
    const errorMessage = this.page.locator(this.errorMessage);
    await expect(errorMessage).toBeVisible();
  }
}