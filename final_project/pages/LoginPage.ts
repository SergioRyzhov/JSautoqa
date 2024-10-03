import { Page } from '@playwright/test';
import { Base } from './Base';
import { loginPage } from '../data/locators';
import { pageEndpoints } from '../data/endpoints';
import { StateValidator } from '../data/validation/assertions/LoginStateValidator';

export class LoginPage extends Base {
  private stateValidator: StateValidator;

  constructor(page: Page) {
    super(page);
    this.stateValidator = new StateValidator(page);
  }

  async login(email: string, password: string, expectSuccess: boolean = true) {
    await this.navigateToPage(pageEndpoints.loginPage);

    await this.page.locator(loginPage.emailInput).waitFor();
    await this.page.locator(loginPage.passwordInput).waitFor();
    await this.page.fill(loginPage.emailInput, email);
    await this.page.fill(loginPage.passwordInput, password);
    await this.page.click(loginPage.submitButton);

    if (expectSuccess) {
      await this.assertLoginSuccess();
    } else {
      await this.assertLoginFailure();
    }
  }

  async assertLoginSuccess() {
    await this.stateValidator.assertLoginSuccess();
  }

  async assertLoginFailure() {
    await this.stateValidator.assertLoginFailure();
  }
}