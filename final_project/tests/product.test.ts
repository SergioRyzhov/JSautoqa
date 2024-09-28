import { test } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { PageFactory } from '../patterns/PageFactory';

test.describe('Product Browsing Test Suite', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;
  });

  test('should navigate to product department successfully', async () => {
    await productPage.navigateToWomenDresses();
  });

  test('should display correct product details', async () => {
    await productPage.openTheFirstItemOfProducts();
    await productPage.verifyProductDetails();
  });
});