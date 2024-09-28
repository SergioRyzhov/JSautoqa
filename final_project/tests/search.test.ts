import { test } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { PageFactory } from '../patterns/PageFactory';
import { keyWords } from '../data/keywords';

test.describe('Search Test Suite', () => {
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    searchPage = PageFactory.getPage(page, 'SearchPage') as SearchPage;
  });

  test('should return search results for a valid query', async () => {
    await searchPage.searchForItem(keyWords.searchPage.valid.searchText);
    await searchPage.assertSearchResults(keyWords.searchPage.valid.searchText);
  });

  test('should show no results message for an invalid query', async () => {
    await searchPage.searchForItem(keyWords.searchPage.invalid.searchText);
    await searchPage.assertNoResults();
  });
});