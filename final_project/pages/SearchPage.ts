import { Base } from './Base';
import { locators } from '../data/locators';
import { expect, Page } from '@playwright/test';
import { pageUrls } from '../data/pageurls';
import { keyWords } from '../data/keywords';

export class SearchPage extends Base {

  constructor(page: Page) {
    super(page);
  }

  async searchForItem(text: string) {
    await this.navigateToPage(pageUrls.homePage);
    await this.page.fill(locators.searchResultPage.searchInput, text);
    await this.page.press(locators.searchResultPage.searchInput, 'Enter');
  }

  async assertSearchResults(text: string) {
    await this.page.waitForURL(new RegExp(`.*${pageUrls.searchPageResult}`));

    const searchResults = await this.page.locator(locators.searchResultPage.searchHeader);
    await expect(searchResults).toHaveText(text);

    const searchResultCards = await this.page.locator(locators.searchResultPage.searchResultCards);
    await expect(searchResultCards.first()).toBeVisible();

    const ariaLabelValue = await searchResultCards.first().getAttribute('aria-label');
    await expect(ariaLabelValue).toMatch(new RegExp(text, 'i'));
  }

  async assertNoResults() {
    const noResultsMessage = this.page.locator(locators.searchResultPage.searchNoResultsMsg);
    await expect(noResultsMessage).toBeVisible();

    const messageText = (await noResultsMessage.textContent())?.trim();
    await expect(messageText).toMatch(new RegExp(keyWords.searchPage.noResultFrase, 'i'));
  }
}