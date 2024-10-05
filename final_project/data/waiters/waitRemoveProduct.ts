import { Page } from '@playwright/test';

/**
 * Waits until the product count decreases.
 *
 * This function clicks the first "remove" button in the wishlist and waits for the total number of
 * "remove" buttons to decrease. It compares the number of products before the removal to ensure
 * that the product has been successfully removed from the wishlist.
 *
 * @async
 * @param {Page} page - The Playwright `Page` instance representing the browser page.
 * @param {WishlistLocators} locator - An object containing CSS selectors for the wishlist elements.
 * @param {number} beforeRemoveCount - The number of "remove" buttons/products before the removal.
 * @returns {Promise<void>} Resolves when the product has been successfully removed.
 * @throws Will throw an error if the product count does not decrease or if there is an issue with the locators.
 */
export async function waitUntilCountChange(
  page: Page,
  locator: string,
  beforeRemoveCount: number
) {
  await page.waitForFunction(
    ({ oldCount, wishlistSelector }) => {
      try {
        const removeButtons = document.querySelectorAll(wishlistSelector);
        return removeButtons.length < oldCount;
      } catch (error) {
        throw error;
      }
    },
    { oldCount: beforeRemoveCount, wishlistSelector: locator }
  );
}
