import { expect, Page } from '@playwright/test';
import { Base } from './Base';
import { before } from 'node:test';
import { log } from 'node:console';

export class WishlistPage extends Base {

    constructor(page: Page) {
        super(page);
    }

    async isProductInWishlist(): Promise<boolean> {
        const sectionCount = await this.page.locator('div.b-wishlist-inner section.b-product_tile.b-wishlist_tile').count();
        return sectionCount > 0
    }

    async getProductsCountFromWishlist(productName: string): Promise<number> {
        const productElements = await this.page.locator(`text=${productName}`);
        return await productElements.count();
    }

    async removeProductsFromWishlist() {
        let removeButtons = await this.page.locator('div.b-wishlist-inner section.b-product_tile.b-wishlist_tile a[data-ref="remove"]');
        const initialButtonsCount = await removeButtons.count();
    
        for (let i = 0; i < initialButtonsCount; i++) {
            console.log('>>> Loop iteration: ' + i);
            let beforeRemoveCount = await this.page.locator('div.b-wishlist-inner section.b-product_tile.b-wishlist_tile a[data-ref="remove"]').count();
            console.log('>>> beforeCount: ' + beforeRemoveCount);
    
            await removeButtons.first().click();
            console.log('>>> Clicked on remove button');

            const newCount = await this.page.waitForFunction(
                (oldCount) => {
                    try {
                        const removeButtons = document.querySelectorAll('div.b-wishlist-inner section.b-product_tile.b-wishlist_tile a[data-ref="remove"]');
                        return removeButtons.length < oldCount;
                    } catch (error) {
                        console.error('Error in waitForFunction:', error); // Выводим ошибку в консоль
                        throw error; // Перебрасываем ошибку, чтобы обработать её в тесте
                    }
                },
                beforeRemoveCount,
                { timeout: 30000 } 
            );
    
            console.log('>>> After removal, buttons updated, newCount: ' + newCount);
            removeButtons = await this.page.locator('div.b-wishlist-inner section.b-product_tile.b-wishlist_tile a[data-ref="remove"]');
        }
    }
    
    // Метод для очистки Wishlist (удалить все товары)
    async clearWishlist() {
        const clearButton = this.page.locator('button.clear-wishlist');
        await clearButton.click();
        await this.page.waitForLoadState('load');
    }

    // Метод для получения сообщения о пустом Wishlist
    async getEmptyWishlistMessage(): Promise<string | null> {
        await this.page.waitForLoadState('load');
        const emptyMessageElement = this.page.locator('p.b-wishlist-empty_text');
        return await emptyMessageElement.textContent();
    }

    async addChoosenProductToWishlist() {
        await this.page.click('button.b-button.m-outline.b-product_wishlist-button.b-wishlist_button');
        await this.page.waitForLoadState('load');
    }

    async checkDuplicateErrorMessage() {
        const element = await this.page.locator('div[data-id="addToWishlistMsg"]:not([hidden])');
        await expect(element).toBeVisible();
    }
}