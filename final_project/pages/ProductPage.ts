import { expect, Page } from '@playwright/test';
import { Base } from './Base';
import { locators } from '../data/locators';
import { pageUrls } from '../data/pageurls';

export class ProductPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  async navigateToWomenDresses() {
    await this.navigateToPage(pageUrls.productsPage);
    await expect(this.page).toHaveURL(new RegExp(`.*${pageUrls.productsPage}`));
  }

  async openTheFirstItemOfProducts() {
    await this.navigateToPage(pageUrls.productsPage);
    await this.page.click(locators.productPage.productFirstItem);
    await this.page.waitForLoadState('load');
  }

  async verifyProductDetails() {
    await expect(this.page.locator(locators.productPage.productTitle)).toBeVisible();
    await expect(this.page.locator(locators.productPage.productPrice)).toBeVisible();
    await expect(this.page.locator(locators.productPage.productDescription)).toBeVisible();
  }

  
  async addProductsToWishlist(n: number) {
    const addToWishlistButtons = this.page.locator('div#product-grid [data-id="addToWishlist"]');
    const buttonsCount = await addToWishlistButtons.count();

    if (n <= buttonsCount) {
      for (let i = 0; i < n; i++) {
        const oldWishQty = await this.page.locator('span[data-ref="wishlistCount"]').textContent();
        const oldWishQtyCleaned = parseInt(oldWishQty!.replace(/\D/g, ''), 10);

        // Проверяем значение aria-pressed
        const ariaPressed = await addToWishlistButtons.nth(i).getAttribute('aria-pressed');

        if (ariaPressed === 'false') {
          await addToWishlistButtons.nth(i).click(); // Клик только если aria-pressed = "false"
          console.log(`>>> Clicked on product ${i}`);

          // Ждем изменения количества в вишлисте
          await this.page.waitForFunction(
            (oldQty) => {
              const newWishQty = document.querySelector('span[data-ref="wishlistCount"]')?.textContent;
              const newWishQtyCleaned = parseInt(newWishQty!.replace(/\D/g, ''), 10);
              return newWishQtyCleaned !== oldQty;
            },
            oldWishQtyCleaned,
          );
        } else {
          console.log(`>>> Product ${i} is already in wishlist`);
        }
      }
    }
  }
}