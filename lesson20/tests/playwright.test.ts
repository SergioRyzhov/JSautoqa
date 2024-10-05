import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { DocsPage } from '../pages/docs.page';

test.describe('Playwright Site Tests', () => {

  test('Check main page title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
    const title = await page.title();
    expect(title).toBe('Playwright');
  });

  test('Navigate to Docs page', async ({ page }) => {
    const homePage = new HomePage(page);
    const docsPage = new DocsPage(page);

    await homePage.navigate();
    await homePage.clickDocsLink();
    await expect(page).toHaveURL(/.*\/docs\/intro/);

    const header = await docsPage.getHeader();
    expect(['Playwright enables reliable end-to-end testing for modern web apps.', 'Installation']).toContain(header);
  });

  test('Search functionality on Docs page', async ({ page }) => {
    const homePage = new HomePage(page);
    const docsPage = new DocsPage(page);

    await homePage.navigate();
    await homePage.clickDocsLink();
    const searchResults = await docsPage.search('Browser');
    expect(searchResults).toContain('Browser');
  });

  test('Navigate to GitHub page', async ({ page, context }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      homePage.clickGitHubLink(),
    ]);
    
    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://github.com/microsoft/playwright');
  });
});