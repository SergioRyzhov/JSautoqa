import { Page } from 'playwright';

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