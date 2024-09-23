import { test } from '@playwright/test';
import { PageFactory } from '../pages/PageFactory';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Test Suite', () => {
  test('should successfully login with valid credentials', async ({ page }) => {    
    const loginPage = PageFactory.getPage(page, 'LoginPage') as LoginPage;
    const loginName = process.env.LOGIN_NAME || '';
    const loginPassword = process.env.LOGIN_PASSWORD || '';

    await loginPage.getLogin(loginName, loginPassword);  
    await loginPage.assertLoginSuccess();
  });

  test('should fail to login with invalid credentials', async ({ page }) => {
    const loginPage = PageFactory.getPage(page, 'LoginPage') as LoginPage;
    
    await loginPage.getLogin('invalid-email@example.com', 'invalidPassword');
    await loginPage.assertLoginFailure();
  });
});