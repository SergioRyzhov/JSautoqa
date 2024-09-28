import { test, expect, Page } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/ProductPage';
import { PageFactory } from '../patterns/PageFactory';
import { BrowserSingleton } from '../patterns/BrowserSingleton';
import { pageUrls } from '../data/pageurls';

test.afterAll(async () => {
  const browserSingleton = await BrowserSingleton.getInstance();
  await browserSingleton.close();
});

test.describe('Cart Test Suite', () => {
  let cartPage: CartPage;
  let page: Page;

  test.beforeEach(async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    page = await browserSingleton.getPage();

    cartPage = PageFactory.getPage(page, 'CartPage') as CartPage;
  });

  test('should add a product to the cart', async () => {
    await cartPage.addFirstProductToTheCart();
    await expect(await cartPage.getCartItemCount()).toBeGreaterThan(0);
  });

  test('should persist the cart after page refresh', async () => {
    await cartPage.refreshTheCart();
    await expect(await cartPage.getCartItemCount()).toBeGreaterThan(0);
  });

  test('should update the product quantity in the cart', async () => {
    const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;

    await productPage.navigateToPage('/cart');
    await cartPage.updateProductQuantity(2);

    await productPage.navigateToPage('/cart');
    expect(await cartPage.getCartItemCount()).toBe(2);
  });

  test('should correctly calculate total price in the cart', async () => {
    const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;

    await productPage.navigateToPage('/cart');
    const oldPrice = await cartPage.getCartTotalPrice();

    await cartPage.updateProductQuantity(3);

    const newPriceHandle = await page.waitForFunction(
      (oldPrice) => {
        const newPriceElement = document.querySelector('tr.b-summary_table-item.m-total > td');
        if (!newPriceElement) return false;

        const newPriceText = newPriceElement.textContent?.trim() || '';
        const cleanedNewPrice = parseFloat(newPriceText.replace(/[^\d.]/g, ''));

        return cleanedNewPrice > oldPrice ? cleanedNewPrice : null;
      },
      oldPrice,
      { timeout: 5000 }
    );
    const newPrice = await newPriceHandle.jsonValue();
    if (newPrice === null) {
      throw new Error('New price is null(');
    }

    await expect(newPrice).toBeGreaterThan(oldPrice);

  });

  test('should remove a product from the cart', async () => {
    await cartPage.removeProduct();
    await cartPage.verifyCartEmpty();
  });

})