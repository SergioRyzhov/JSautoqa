import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput = 'input[name="username"]';
  private passwordInput = 'input[name="password"]';
  private loginButton = 'button[type="submit"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.page.waitForSelector(this.usernameInput);
    await this.page.fill(this.usernameInput, username);

    await this.page.waitForSelector(this.passwordInput);
    await this.page.fill(this.passwordInput, password);

    await this.page.waitForSelector(this.loginButton);
    await this.page.click(this.loginButton);
  }
}
