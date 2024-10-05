import { test } from '@playwright/test';
import { SearchPage } from '../pages';
import { textData } from '../data/textData';
import { PageFactory } from '../pages/PageFactory';

test.describe('Search Test Suite', () => {
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = PageFactory.getPage(page, 'SearchPage') as SearchPage;
  });

  test('should return search results for a valid query', async () => {
    await searchPage.searchForItem(textData.searchPage.valid.searchText);
    await searchPage.assertSearchResults(textData.searchPage.valid.searchText);
  });

  test('should show no results message for an invalid query', async () => {
    await searchPage.searchForItem(textData.searchPage.invalid.searchText);
    await searchPage.assertNoResults();
  });
});
