import { test, expect, Page } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { PageFactory } from '../patterns/PageFactory';
import { BrowserSingleton } from '../patterns/BrowserSingleton';

test.afterAll(async () => {
  const browserSingleton = await BrowserSingleton.getInstance();
  await browserSingleton.close();
});

test.describe('Cart Test Suite as a guest', () => {
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
    await cartPage.updateProductQtyInTheCart(2);
    await expect(await cartPage.getCartItemCount()).toBe(2);
  });

  test('should correctly add total price in the cart', async () => {
    const { oldPrice, newPrice } = await cartPage.getNewTotalPriceInTheCart();
    await expect(newPrice).toBeGreaterThan(oldPrice);
  });

  test('should remove a product from the cart', async () => {
    await cartPage.removeProductFromTheCart();
    await cartPage.verifyCartEmpty();
  });
})