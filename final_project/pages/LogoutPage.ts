import { Page } from '@playwright/test';
import { Base } from './Base';
import { logoutPage } from '../data/locators';
import { pageEndpoints } from '../data/endpoints';
import { StateValidator } from '../data/validation/assertions/LoginStateValidator';

export class LogoutPage extends Base {
  private stateValidator: StateValidator;

  constructor(page: Page) {
    super(page);
    this.stateValidator = new StateValidator(page);
  }

  async logout() {
    await this.navigateToPage(pageEndpoints.accountPage);
    const logoutButton = await this.page.locator(logoutPage.logoutButton);
    await logoutButton.click();
    await this.page.waitForLoadState('load');
    await this.assertLoggedOut();
  }

  async assertLoggedOut() {
    await this.stateValidator.assertLoggedOut();
  }
}