import { Page } from 'playwright';

/**
 * Waits for a price update on the page and returns the new price if it is greater than the old price.
 *
 * This function continuously checks the element containing the price until the new price is greater
 * than the old price. It cleans the price value by removing any non-numeric characters and
 * compares it to the provided old price. If the new price is greater, it returns the updated price.
 * 
 * @async
 * @param {Page} page - The Playwright `Page` instance representing the browser page.
 * @param {number} oldPrice - The previous price to compare against the new price.
 * @param {string} selector - The CSS selector for the element containing the price.
 * @returns {Promise<number>} The updated price if it is greater than the old price.
 * @throws Will throw an error if the new price is null or if the price element is not found.
 */
export async function getUpdatedPrice(page: Page, oldPrice: number, selector: string): Promise<number> {
  const newPriceHandle = await page.waitForFunction(
    ({ oldPrice, selector }) => {
      const newPriceElement = document.querySelector(selector);
      if (!newPriceElement) return null;

      const newPriceText = newPriceElement.textContent?.trim() || '';
      const cleanedNewPrice = parseFloat(newPriceText.replace(/[^\d.]/g, ''));

      return cleanedNewPrice > oldPrice ? cleanedNewPrice : null;
    },
    { oldPrice, selector },
  );

  const newPrice = await newPriceHandle.jsonValue();
  if (newPrice === null) {
    throw new Error('New price is null');
  }

  return newPrice as number;
}