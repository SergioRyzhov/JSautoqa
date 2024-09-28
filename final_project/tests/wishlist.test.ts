import { expect, test } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { WishlistPage } from '../pages/WishlistPage';
import { PageFactory } from '../patterns/PageFactory';
import { BrowserSingleton } from '../patterns/BrowserSingleton';
import { LoginPage } from '../pages/LoginPage';
import { getCleanNumbers } from '../helpers/cleanNumbers';
import { LogoutPage } from '../pages/LogoutPage';

test.afterAll(async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    await browserSingleton.clearCacheAndCookies();
    await browserSingleton.close();
  });

test('should allow user to add a product to the wishlist', async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    const page = await browserSingleton.getPage();
  
    const loginPage = PageFactory.getPage(page, 'LoginPage') as LoginPage;
    const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;
    const wishlistPage = PageFactory.getPage(page, 'WishlistPage') as WishlistPage;


    const loginName = process.env.LOGIN_NAME || '';
    const loginPassword = process.env.LOGIN_PASSWORD || '';
    await loginPage.login(loginName, loginPassword, true);

    await productPage.navigateToCategory('women');
    await productPage.openTheFirstItemOfProducts();
    await wishlistPage.addChoosenProductToWishlist();
    // await productPage.addProductsToWishlist(1);

    const countOfProducts = await page.locator('span[data-ref="wishlistCount"]').textContent();
    expect(getCleanNumbers(countOfProducts!)).toBeGreaterThan(0);
});

test('should display the added product in the wishlist', async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    const page = await browserSingleton.getPage();
  
    const wishlistPage = PageFactory.getPage(page, 'WishlistPage') as WishlistPage;

    await wishlistPage.navigateToPage('/wishlist');
    const productsInWishlist = await wishlistPage.isProductInWishlist();
    expect(productsInWishlist).toBeTruthy();
});

test('should allow user to remove a product from the wishlist', async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    const page = await browserSingleton.getPage();

    const wishlistPage = PageFactory.getPage(page, 'WishlistPage') as WishlistPage;

    await wishlistPage.navigateToPage('/wishlist');
    await wishlistPage.removeProductsFromWishlist();
    const productsInWishlist = await wishlistPage.isProductInWishlist();
    expect(productsInWishlist).toBeFalsy();
});

test('should allow user to add multiple products to the wishlist', async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    const page = await browserSingleton.getPage();
  
    const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;
    const wishlistPage = PageFactory.getPage(page, 'WishlistPage') as WishlistPage;

    await productPage.navigateToCategory('women');
    await productPage.addProductsToWishlist(6);

    const countOfProducts = await page.locator('span[data-ref="wishlistCount"]').textContent();
    expect(getCleanNumbers(countOfProducts!)).toBeGreaterThan(3);
    await wishlistPage.navigateToPage('/wishlist');
    await wishlistPage.removeProductsFromWishlist();
});

test('should not allow duplicate products in the wishlist', async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    const page = await browserSingleton.getPage();
  
    const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;
    const wishlistPage = PageFactory.getPage(page, 'WishlistPage') as WishlistPage;

    await productPage.navigateToCategory('women');
    await productPage.addProductsToWishlist(1);
    await productPage.openTheFirstItemOfProducts();
    await wishlistPage.addChoosenProductToWishlist();
    await wishlistPage.checkDuplicateErrorMessage();

    const countOfProducts = await page.locator('span[data-ref="wishlistCount"]').textContent();
    expect(getCleanNumbers(countOfProducts!)).toBe(1);
});

test('should display an empty message when wishlist is empty', async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    const page = await browserSingleton.getPage();

    const wishlistPage = PageFactory.getPage(page, 'WishlistPage') as WishlistPage;

    await wishlistPage.navigateToPage('/wishlist');
    await wishlistPage.removeProductsFromWishlist();

    // Проверить, что отображается сообщение о пустом списке
    const emptyMessage = await wishlistPage.getEmptyWishlistMessage();
    await expect(emptyMessage).toBe('You don\'t have any items saved for later (yet)');
});

test('should prompt login when trying to add to wishlist without authentication', async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    const page = await browserSingleton.getPage();
  
    const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;
    const wishlistPage = PageFactory.getPage(page, 'WishlistPage') as WishlistPage;
    const logoutPage = PageFactory.getPage(page, 'LogoutPage') as LogoutPage;

    await wishlistPage.navigateToPage('/myaccount');
    await logoutPage.logout();

    // Открыть страницу продукта
    await productPage.navigateToCategory('women');
    // await productPage.addProductsToWishlist(1);
    await productPage.openTheFirstItemOfProducts();
    await wishlistPage.addChoosenProductToWishlist();

    // Проверяем, что появляется запрос на авторизацию
    await wishlistPage.navigateToPage('/wishlist');
    const loginPrompt = await page.locator('p[aria-label="Check order status"]').textContent();
    await expect(loginPrompt).toContain('These products are only available on this device and will expire after 7 days.');
    await expect(loginPrompt).toContain('Sign in');
    await expect(loginPrompt).toContain('Create account');
});