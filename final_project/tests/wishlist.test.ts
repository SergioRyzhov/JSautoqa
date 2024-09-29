import { expect, Page, test } from '@playwright/test';
import { ProductPage } from '../pages/ProductPage';
import { WishlistPage } from '../pages/WishlistPage';
import { PageFactory } from '../patterns/PageFactory';
import { BrowserSingleton } from '../patterns/BrowserSingleton';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';
import { loginCredentials } from '../data/creds';
import { keyWords } from '../data/keywords';

test.afterAll(async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    await browserSingleton.clearCacheAndCookies();
    await browserSingleton.close();
});

test.describe('Wishlist Test Suite as a user', () => {
    let wishlistPage: WishlistPage;
    let page: Page;

    test.beforeEach(async () => {
        const browserSingleton = await BrowserSingleton.getInstance();
        page = await browserSingleton.getPage();

        wishlistPage = PageFactory.getPage(page, 'WishlistPage') as WishlistPage;
    });

    test('should allow user to add a product to the wishlist', async () => {
        const loginPage = PageFactory.getPage(page, 'LoginPage') as LoginPage;

        await loginPage.login(loginCredentials.valid.login!, loginCredentials.valid.pass!, true);

        await wishlistPage.addTheFirstProductToTheWishlist();
        const countItems = await wishlistPage.getProductsCountFromTheSmallIcon();
        await expect(countItems).toBeGreaterThan(0);
    });

    test('should display the added product in the wishlist', async () => {
        const productsInWishlist = await wishlistPage.isProductsInTheWishlist();
        await expect(productsInWishlist).toBeTruthy();
    });

    test('should allow user to remove a product from the wishlist', async () => {
        await wishlistPage.removeProductsFromWishlist();
        const productsInWishlist = await wishlistPage.isProductsInTheWishlist();
        await expect(productsInWishlist).toBeFalsy();
    });

    test('should allow user to add multiple products to the wishlist', async () => {
        await wishlistPage.addProductsToWishlistFast(6);
        const countOfProducts =  await wishlistPage.getProductsCountFromTheSmallIcon();
        await expect(countOfProducts).toBeGreaterThan(3);        
        await wishlistPage.removeProductsFromWishlist();
    });

    test('should not allow duplicate products in the wishlist', async () => {
        const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;

        await wishlistPage.addProductsToWishlistFast(1);
        await productPage.openTheFirstItemOfProducts();
        await wishlistPage.addChoosenProductToWishlist();
        await wishlistPage.checkDuplicateErrorMessage();

        const countOfProducts = await wishlistPage.getProductsCountFromTheSmallIcon();
        expect(countOfProducts).toBe(1);
    });

    test('should display an empty message when wishlist is empty', async () => {
        await wishlistPage.removeProductsFromWishlist();

        const emptyMessage = await wishlistPage.getEmptyWishlistMessage();
        await expect(emptyMessage).toBe(keyWords.wishlistPage.emptyMessage);
    });

    test('should prompt login when trying to add to wishlist without authentication', async () => {
        const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;
        const logoutPage = PageFactory.getPage(page, 'LogoutPage') as LogoutPage;

        await logoutPage.logout();

        await productPage.openTheFirstItemOfProducts();
        await wishlistPage.addChoosenProductToWishlist();

        await wishlistPage.checkIfPromptToLoginAppears([
            keyWords.wishlistPage.loginPromptMessagePart1,
            keyWords.wishlistPage.loginPromptMessagePart2,
            keyWords.wishlistPage.loginPromptMessagePart3
        ]);
    });
})