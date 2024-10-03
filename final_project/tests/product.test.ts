import { test } from '@playwright/test';
import { ProductPage } from '../pages';
import { productPage as productPageLoactor } from '../data/locators';
import { PageFactory } from '../pages/PageFactory';

test.describe('Product Browsing Test Suite', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;
  });

  test('should navigate to product department successfully', async () => {
    await productPage.assertWomenDressesPageLoad();
  });

  test('should display correct product details', async () => {
    await productPage.openTheFirstItemOfProducts();

    const elementsToAssert = [
      productPageLoactor.productTitle,
      productPageLoactor.productPrice,
      productPageLoactor.productDescription
    ];
    await productPage.assertElementsVisibility(elementsToAssert);
  });
});