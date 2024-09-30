import { Page, Locator } from "@playwright/test";
import { locators } from '../data/locators';

/**
 * Adds a product to the wishlist if it is not already added.
 * 
 * The function checks the `aria-pressed` attribute of the "Add to Wishlist" button to determine if the product
 * is already in the wishlist. If the product is not in the wishlist (`aria-pressed === 'false'`), the function
 * clicks the button to add it. After clicking, it waits until the wishlist quantity icon updates,
 * indicating the product has been successfully added.
 * 
 * @param {Page} page - The Playwright `Page` object representing the current browser tab.
 * @param {Locator} addToWishlistButton - The locator for the "Add to Wishlist" button.
 * @param {number} oldWishQtyCleaned - The previous numeric quantity of items in the wishlist before adding the product.
 * 
 * @returns {Promise<void>} A promise that resolves once the product has been added to the wishlist and the quantity is updated.
 */
export async function addProductToWishlist(page: Page, addToWishlistButton: Locator, oldWishQtyCleaned: number) {
    const ariaPressed = await addToWishlistButton.getAttribute('aria-pressed');

    if (ariaPressed === 'false') {
        await addToWishlistButton.click();

        await page.waitForFunction(
            ({ oldQty, wishlistSelector }) => {
                const element = document.querySelector(wishlistSelector);
                if (!element || !element.textContent) {
                    return false;
                }
                const newWishQtyCleaned = parseInt(element.textContent!.replace(/\D/g, ''), 10);
                return newWishQtyCleaned !== oldQty;
            },
            { oldQty: oldWishQtyCleaned, wishlistSelector: locators.wishlistPage.wishQuantitySmallIcon }
        );
    }
}