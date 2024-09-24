import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { ProductPage } from '../pages/ProductPage';
import { PageFactory } from '../pages/PageFactory';

test('should add a product to the cart', async ({ page }) => {
    const cartPage = PageFactory.getPage(page, 'CartPage') as CartPage;
    const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;
  
    // Select product size and add to cart
    await productPage.selectSize('M');
    await productPage.addToCart();
  
    // Verify the product has been added to the cart
    expect(await cartPage.getCartItemCount()).toBeGreaterThan(0);
    await cartPage.verifyProductDetails('Product Name', 'M', '$50');
});

// test('should persist the cart after page refresh', async ({ page }) => {
//     const cartPage = new CartPage(page);
  
//     // Refresh the page
//     await page.reload();
  
//     // Verify the cart is still populated
//     expect(await cartPage.getCartItemCount()).toBeGreaterThan(0);
// });

// test('should update the product quantity in the cart', async ({ page }) => {
//     const cartPage = new CartPage(page);
  
//     // Update the product quantity
//     await cartPage.updateProductQuantity('Product Name', 2);
  
//     // Verify that the quantity has been updated
//     const quantity = await cartPage.getCartItemCount();
//     expect(quantity).toBe(2);
//   });

// test('should remove a product from the cart', async ({ page }) => {
//     const cartPage = new CartPage(page);

//     // Remove the product from the cart
//     await cartPage.removeProduct('Product Name');

//     // Verify the cart is empty after removal
//     await cartPage.verifyCartEmpty();
// });

// test('should persist the cart between sessions', async ({ page, context }) => {
//     const cartPage = new CartPage(page);
  
//     // Add a product to the cart
//     await cartPage.getCartItemCount();
    
//     // Close the browser and reopen
//     await context.storageState({ path: 'state.json' });
//     const newContext = await browser.newContext({ storageState: 'state.json' });
//     const newPage = await newContext.newPage();
//     const newCartPage = new CartPage(newPage);
  
//     // Verify the cart persists
//     await newPage.goto('https://example.com/cart');
//     expect(await newCartPage.getCartItemCount()).toBeGreaterThan(0);
// });
