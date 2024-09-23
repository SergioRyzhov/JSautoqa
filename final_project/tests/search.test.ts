import { test } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { PageFactory } from '../pages/PageFactory';

test.describe('Search Test Suite', () => {

  test('should return search results for a valid query', async ({ page }) => {
    const searchPage = PageFactory.getPage(page, 'SearchPage') as SearchPage;
    await searchPage.searchForItem('dress');
    await searchPage.assertSearchResults('dress');
  });

  test('should show no results message for an invalid query', async ({ page }) => {
    const searchPage = PageFactory.getPage(page, 'SearchPage') as SearchPage;
    await searchPage.searchForItem('invalid-query');
    await searchPage.assertNoResults();
  });
});
