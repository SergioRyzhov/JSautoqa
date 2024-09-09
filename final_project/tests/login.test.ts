import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

test.describe('Login Test Suite', () => {
  test('should successfully login with valid credentials', async ({ page }) => {    
    const loginPage = new LoginPage(page);
    const loginName = process.env.LOGIN_NAME || '';
    const loginPassword = process.env.LOGIN_PASSWORD || '';

    await loginPage.navigate();
    await loginPage.enterEmail(loginName);
    await loginPage.enterPassword(loginPassword);
    await loginPage.submit();
    
    await loginPage.assertLoginSuccess();
  });

  test('should fail to login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigate();
    await loginPage.enterEmail('invalid-email@example.com');
    await loginPage.enterPassword('invalidPassword');
    await loginPage.submit();
    
    await loginPage.assertLoginFailure();
  });
});