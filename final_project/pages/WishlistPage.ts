import { expect, Page } from '@playwright/test';
import { Base } from './Base';
import { pageUrls } from '../data/pageurls';
import { ProductPage } from './ProductPage';
import { PageFactory } from '../patterns/PageFactory';
import { getCleanPrice } from '../helpers/cleanPrice';
import { locators } from '../data/locators';
import { removeProductFromPage } from '../helpers/removeProductFromPage';
import { addProductToWishlist } from '../helpers/addMultiProductsToWishlist';
import { waitForPageLoadAndElVisible } from '../waiters/waiterBeforeEls';

export class WishlistPage extends Base {
    private productPage = PageFactory.getPage(this.page, 'ProductPage') as ProductPage;

    constructor(page: Page) {
        super(page);
    }

    async addTheFirstProductToTheWishlist() {
        await this.navigateToPage(pageUrls.productsPage);
        await this.productPage.openTheFirstItemOfProducts();
        await this.addChoosenProductToWishlist();
    }

    async isProductsInTheWishlist(): Promise<boolean> {
        await this.navigateToPage(pageUrls.wishlistPage);
        const sectionCount = await this.page.locator(locators.wishlistPage.productsCountInTheWishlist).count();
        return sectionCount > 0
    }

    async getProductsCountFromTheSmallIcon(): Promise<Number> {
        await waitForPageLoadAndElVisible(this.page, locators.wishlistPage.smallIconCount);
        const countOfProducts = await this.page.locator(locators.wishlistPage.smallIconCount).textContent();
        const cleanedCount = getCleanPrice(countOfProducts!); 
        return cleanedCount;
    }

    async removeProductsFromWishlist() {
        await this.navigateToPage(pageUrls.wishlistPage);
        let removeButtons = await this.page.locator(locators.wishlistPage.removeButtonsOfProductsInTheWishlist);
        const initialButtonsCount = await removeButtons.count();

        for (let i = 0; i < initialButtonsCount; i++) {
            let beforeRemoveCount = await this.page.locator(locators.wishlistPage.removeButtonsOfProductsInTheWishlist).count();
            await removeProductFromPage(this.page, locators, beforeRemoveCount);
            removeButtons = await this.page.locator(locators.wishlistPage.removeButtonsOfProductsInTheWishlist);
        }
    }

    async addProductsToWishlistFast(n: number) {
        await this.navigateToPage(pageUrls.productsPage);
        const addToWishlistButtons = this.page.locator(locators.wishlistPage.addToWishlistButtons);
        const buttonsCount = await addToWishlistButtons.count();

        if (n <= buttonsCount) {
            for (let i = 0; i < n; i++) {
                await this.page.waitForLoadState('load');
                const oldWishQty = await this.page.locator(locators.wishlistPage.wishQuantitySmallIcon).textContent();
                const oldWishQtyCleaned = parseInt(oldWishQty!.replace(/\D/g, ''), 10);
                await addProductToWishlist(this.page, addToWishlistButtons.nth(i), oldWishQtyCleaned);
            }
        }
    }

    async getEmptyWishlistMessage(): Promise<string | null> {
        await this.page.waitForSelector(locators.wishlistPage.wishlistEmptyMessage, { state: 'visible' });
        const emptyMessageElement = await this.page.locator(locators.wishlistPage.wishlistEmptyMessage);
        return await emptyMessageElement.textContent();
    }

    async addChoosenProductToWishlist() {
        await waitForPageLoadAndElVisible(this.page, locators.wishlistPage.addChosenProductToWishlist);
        await this.page.click(locators.wishlistPage.addChosenProductToWishlist);
        await this.page.waitForLoadState('load');
    }

    async checkDuplicateErrorMessage() {
        const element = await this.page.locator(locators.wishlistPage.duplicateErrorMessageToAdd);
        await expect(element).toBeVisible();
    }

    async checkIfPromptToLoginAppears(keyWords: string[]) {
        await this.navigateToPage(pageUrls.wishlistPage);
        const loginPrompt = await this.page.locator(locators.wishlistPage.loginPromptMessage).textContent();

        for (const keyWord of keyWords) {
            await expect(loginPrompt).toContain(keyWord);
        }
    }
}