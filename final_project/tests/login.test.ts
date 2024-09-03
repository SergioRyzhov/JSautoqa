import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';

test('User should be able to log in with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('https://example.com/login');

  // Ensure the navigation is successful
  await expect(page).toHaveURL(/.*login/);

  await loginPage.login('validUser', 'validPassword');

  // Assertions can be added here
  await expect(page).toHaveURL('https://example.com/dashboard');
});

