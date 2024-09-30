import { expect, Page } from '@playwright/test';
import { Base } from './Base';
import { locators } from '../data/locators';
import { pageUrls } from '../data/pageurls';
import { waitForPageLoadAndElVisible } from '../waiters/waiterBeforeEls';

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
    await waitForPageLoadAndElVisible(this.page, locators.productPage.productFirstItem);
    await this.page.click(locators.productPage.productFirstItem);
  }

  async verifyProductDetails() {
    const elementsToVerify = [
      locators.productPage.productTitle,
      locators.productPage.productPrice,
      locators.productPage.productDescription
    ];

    for (const locator of elementsToVerify) {
      await expect(this.page.locator(locator)).toBeVisible();
    }
  }
}