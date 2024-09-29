import { Page } from "@playwright/test";

export async function removeProductFromPage(page: Page, locators: Record<string, any>, beforeRemoveCount: number) {
    await page.locator(locators.wishlistPage.removeButtonsOfProductsInTheWishlist).first().click();

    await page.waitForFunction(
        ({ oldCount, wishlistSelector }) => {
            try {
                const removeButtons = document.querySelectorAll(wishlistSelector);
                return removeButtons.length < oldCount;
            } catch (error) {
                throw error;
            }
        },
        { oldCount: beforeRemoveCount, wishlistSelector: locators.wishlistPage.removeButtonsOfProductsInTheWishlist }
    );
}