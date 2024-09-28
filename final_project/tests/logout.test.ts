import { test } from '@playwright/test';
import { LogoutPage } from '../pages/LogoutPage';
import { PageFactory } from '../patterns/PageFactory';
import { LoginPage } from '../pages/LoginPage';
import { loginCredentials } from '../data/creds'

test.describe('Logout Test', () => {
  test('should successfully logout the user', async ({ page }) => {

    const logoutPage = PageFactory.getPage(page, 'LogoutPage') as LogoutPage;
    const loginPage = PageFactory.getPage(page, 'LoginPage') as LoginPage;

    await loginPage.login(loginCredentials.valid.login!, loginCredentials.valid.pass!, true);

    await logoutPage.logout();
  });
});