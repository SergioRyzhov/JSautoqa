import { expect, Page, test } from '@playwright/test';
import { BrowserSingleton } from '../data/helpers/BrowserSingleton';
import { LoginPage, LogoutPage, WishlistPage, ProductPage } from '../pages';
import { loginCredentials } from '../data/creds';
import { textData } from '../data/textData';
import { PageFactory } from '../pages/PageFactory';

let page: Page;

test.afterAll(async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    await browserSingleton.close();
});

test.describe('Wishlist Test Suite as a user', () => {
    let wishlistPage: WishlistPage;

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
        await expect(countItems).toBe(1);
    });

    test('should display the added product in the wishlist', async () => {
        const productsInWishlist = await wishlistPage.assertProductsInTheWishlist();
        await expect(productsInWishlist).toBeTruthy();
    });

    test('should allow user to remove a product from the wishlist', async () => {
        await wishlistPage.removeProductsFromWishlist();
        const productsInWishlist = await wishlistPage.assertProductsInTheWishlist();
        await expect(productsInWishlist).toBeFalsy();
    });

    test('should allow user to add multiple products to the wishlist', async () => {
        await wishlistPage.addProductsToWishlistFast(6);
        const countOfProducts = await wishlistPage.getProductsCountFromTheSmallIcon();
        await expect(countOfProducts).toBe(6);
        await wishlistPage.removeProductsFromWishlist();
    });

    test('should not allow duplicate products in the wishlist', async () => {
        const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;

        await wishlistPage.addProductsToWishlistFast(1);
        await productPage.openTheFirstItemOfProducts();
        await wishlistPage.addChosenProductToWishlist();
        const duplicateErrorMessage = await wishlistPage.getDuplicateErrorMessage();
        await expect(duplicateErrorMessage).toBeVisible();

        const countOfProducts = await wishlistPage.getProductsCountFromTheSmallIcon();
        await expect(countOfProducts).toBe(1);
    });

    test('should display an empty message when wishlist is empty', async () => {
        await wishlistPage.removeProductsFromWishlist();

        const emptyMessage = await wishlistPage.getEmptyWishlistMessage();
        await expect(emptyMessage).toBe(textData.wishlistPage.emptyMessage);
    });

    test('should prompt login when trying to add to wishlist without authentication', async () => {
        const productPage = PageFactory.getPage(page, 'ProductPage') as ProductPage;
        const logoutPage = PageFactory.getPage(page, 'LogoutPage') as LogoutPage;

        await logoutPage.logout();

        await productPage.openTheFirstItemOfProducts();
        await wishlistPage.addChosenProductToWishlist();

        const loginPrompt = await wishlistPage.assertPromptToLogInAppears();
        await expect(loginPrompt).toContain(textData.wishlistPage.loginPromptMessagePart1);
        await expect(loginPrompt).toContain(textData.wishlistPage.loginPromptMessagePart2);
        await expect(loginPrompt).toContain(textData.wishlistPage.loginPromptMessagePart3);
    });
});