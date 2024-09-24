import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { PageFactory } from '../pages/PageFactory';

test.describe('Product Browsing Test Suite', () => {
  
  test('should navigate to mens and womens product department successfully', async ({ page }) => {
    const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;
    
    await productPage.navigateToCategory('women');
    await expect(page).toHaveURL(/.*women.*/);

  });

  test('should display correct product details', async ({ page }) => {
    const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;

    await productPage.navigateToCategory('women');
    await productPage.chooseFirstItem();
    await productPage.verifyProductDetails();
  });
});