import { Base } from './Base';
import { locators } from './locators';
import { expect, Page } from '@playwright/test';

export class SearchPage extends Base {

  constructor(page: Page) {
    super(page);
  }

  async searchForItem(textItem: string) {
    await this.preparePage('/');
    await this.page.fill(locators.searchResultPage.searchInputLocator, textItem);
    await this.page.press(locators.searchResultPage.searchInputLocator, 'Enter');
  }

  async assertSearchResults(textItem: string) {
    await this.page.waitForURL(/.*\/search.*/, { timeout: 5000 });
    const searchResults = this.page.locator(locators.searchResultPage.searchHeader);
    await expect(searchResults).toHaveText(textItem);
    const searchResultCards = this.page.locator(locators.searchResultPage.searchResultCards);
    await expect(searchResultCards.first()).toBeVisible();
    const ariaLabelValue = await searchResultCards.first().getAttribute('aria-label');
    const regex = new RegExp(textItem, 'i');
    expect(ariaLabelValue).toMatch(regex);
  }

  async assertNoResults() {
    const noResultsMessage = this.page.locator(locators.searchResultPage.searchNoResultsMsg);
    await expect(noResultsMessage).toBeVisible();
    const messageText = (await noResultsMessage.textContent())?.trim();
    const regex = new RegExp("we haven[’']t found anything", 'i');
    expect(messageText).toMatch(regex);
  }
}
