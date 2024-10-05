import { test, expect, Page } from '@playwright/test';
import { CartPage } from '../pages';
import { BrowserSingleton } from '../data/helpers/BrowserSingleton';
import { PageFactory } from '../pages/PageFactory';

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
    await cartPage.assertCartItemCount(1);
  });

  test('should persist the cart after page refresh', async () => {
    await cartPage.refreshThePage();
    await cartPage.assertCartItemCount(1);
  });

  test('should update the product quantity in the cart', async () => {
    await cartPage.updateProductQtyInTheCart(2);
    await cartPage.assertCartItemCount(2);
  });

  test('should correctly add total price in the cart', async () => {
    const { oldPrice, newPrice } =
      await cartPage.calculateUpdatedTotalPriceInCart(3);
    await expect(newPrice).toBeGreaterThan(oldPrice);
  });

  test('should remove a product from the cart', async () => {
    await cartPage.removeProductFromTheCart();
    await cartPage.assertCartEmpty();
  });
});
