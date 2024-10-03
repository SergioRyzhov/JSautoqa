import { test } from '@playwright/test';
import { LogoutPage, LoginPage } from '../pages';
import { loginCredentials } from '../data/creds';
import { PageFactory } from '../pages/PageFactory';

test.describe('Logout Test', () => {
  test('should successfully logout the user', async ({ page }) => {
    const logoutPage = PageFactory.getPage(page, 'LogoutPage') as LogoutPage;
    const loginPage = PageFactory.getPage(page, 'LoginPage') as LoginPage;

    await loginPage.login(
      loginCredentials.valid.login!,
      loginCredentials.valid.pass!,
      true
    );

    await logoutPage.logout();
  });
});
