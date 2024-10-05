import { test } from '@playwright/test';
import { LoginPage } from '../pages';
import { loginCredentials } from '../data/creds';
import { PageFactory } from '../pages/PageFactory';

test.describe('Login Test Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = PageFactory.getPage(page, 'LoginPage') as LoginPage;
  });

  test('should successfully login with valid credentials', async () => {
    await loginPage.login(
      loginCredentials.valid.login!,
      loginCredentials.valid.pass!,
      true
    );
  });

  test('should fail to login with invalid credentials', async () => {
    await loginPage.login(
      loginCredentials.invalid.login,
      loginCredentials.invalid.pass,
      false
    );
  });
});
