import { expect, Page } from '@playwright/test';
import { Base } from './Base';
import { pageUrls } from '../data/pageurls';
import { ProductPage } from './ProductPage';
import { PageFactory } from '../patterns/PageFactory';
import { getCleanNumbers } from '../helpers/cleanNumbers';
import { locators } from '../data/locators';
import { removeProductFromPage } from '../helpers/removeProductFromPage';
import { domSelectors } from '../data/selectors';

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
        await this.page.waitForSelector(locators.wishlistPage.smallIconCount, { state: 'visible' });
        const countOfProducts = await this.page.locator(locators.wishlistPage.smallIconCount).textContent();
        const cleanedCount = getCleanNumbers(countOfProducts!); 
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
                const oldWishQty = await this.page.locator(locators.wishlistPage.wishQuantitySmallIcon).textContent();
                const oldWishQtyCleaned = parseInt(oldWishQty!.replace(/\D/g, ''), 10);
                const ariaPressed = await addToWishlistButtons.nth(i).getAttribute('aria-pressed');
                if (ariaPressed === 'false') {
                    await addToWishlistButtons.nth(i).click();
                    await this.page.waitForFunction(
                        ({ oldQty, domSelectors }) => {
                            const el = document.querySelector(domSelectors.wishlistPage.wishlistQuantitySmallIcon);
                            if (!el || !el.textContent) {
                                return false;
                            }
                            const newWishQtyCleaned = parseInt(el.textContent.replace(/\D/g, ''), 10);
                            return newWishQtyCleaned !== oldQty;
                        },
                        { oldQty: oldWishQtyCleaned, domSelectors },
                    );
                }
            }
        }
    }

    async getEmptyWishlistMessage(): Promise<string | null> {
        await this.page.waitForSelector(locators.wishlistPage.wishlistEmptyMessage, { state: 'visible' });
        const emptyMessageElement = await this.page.locator(locators.wishlistPage.wishlistEmptyMessage);
        return await emptyMessageElement.textContent();
    }

    async addChoosenProductToWishlist() {
        await this.page.waitForSelector(locators.wishlistPage.addChosenProductToWishlist, { state: 'visible' });
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