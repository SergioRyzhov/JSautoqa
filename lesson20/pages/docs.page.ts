import { Page } from '@playwright/test';

export class DocsPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('https://playwright.dev/docs/intro');
  }

  async search(query: string) {
    const searchButton = this.page.locator('.DocSearch.DocSearch-Button');
    await searchButton.click();

    const searchInput = this.page.getByPlaceholder('Search docs');
    await searchInput.waitFor({ state: 'visible', timeout: 5000 });
    await searchInput.fill(query);

    const searchConfirm = this.page.getByRole('option', { name: 'Browsers', exact: true }).getByRole('link');
    await searchConfirm.waitFor({ state: 'visible', timeout: 5000 });
    await searchConfirm.click();

    await this.page.waitForLoadState('networkidle');
    const searchResult = await this.page.content();

    return searchResult;
  }

  async getHeader() {
    const header = this.page.locator('h1');
    await header.waitFor({ state: 'visible', timeout: 5000 });
    return await header.textContent();
  }
}
