import { test } from '@playwright/test';
import { PageFactory } from '../patterns/PageFactory';
import { LoginPage } from '../pages/LoginPage';
import { loginCredentials } from '../data/creds'

test.describe('Login Test Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = PageFactory.getPage(page, 'LoginPage') as LoginPage;
  });

  test('should successfully login with valid credentials', async () => {
    await loginPage.login(loginCredentials.valid.login!, loginCredentials.valid.pass!, true);
  });

  test('should fail to login with invalid credentials', async () => {
    await loginPage.login(loginCredentials.invalid.login, loginCredentials.invalid.pass, false);
  });
});