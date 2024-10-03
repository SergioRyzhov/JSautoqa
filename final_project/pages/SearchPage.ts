import { Base } from './Base';
import { searchResultPage } from '../data/locators';
import { expect, Page } from '@playwright/test';
import { pageEndpoints } from '../data/endpoints';
import { textData } from '../data/textData';

export class SearchPage extends Base {

  constructor(page: Page) {
    super(page);
  }

  async searchForItem(text: string) {
    await this.navigateToPage(pageEndpoints.homePage);
    await this.page.fill(searchResultPage.searchInput, text);
    await this.page.press(searchResultPage.searchInput, 'Enter');
  }

  async assertSearchResults(text: string) {
    await this.page.waitForURL(new RegExp(`.*${pageEndpoints.searchPageResult}`));

    const searchResults = await this.page.locator(searchResultPage.searchHeader);
    await expect(searchResults).toHaveText(text);

    const searchResultCards = await this.page.locator(searchResultPage.searchResultCards);
    await expect(searchResultCards.first()).toBeVisible();

    const ariaLabelValue = await searchResultCards.first().getAttribute('aria-label');
    await expect(ariaLabelValue).toMatch(new RegExp(text, 'i'));
  }

  async assertNoResults() {
    const noResultsMessage = this.page.locator(searchResultPage.searchNoResultsMsg);
    await expect(noResultsMessage).toBeVisible();

    const messageText = (await noResultsMessage.textContent())?.trim();
    await expect(messageText).toMatch(new RegExp(textData.searchPage.noResultFrase, 'i'));
  }
}