import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://playwright.dev/');
  }

  async clickDocsLink() {
    await this.page.click('text=Docs');
  }

  async clickCommunityLink() {
    await this.page.click('text=Community');
  }

  async clickGitHubLink() {
    await this.page.click('a[aria-label="GitHub repository"]');
  }
}