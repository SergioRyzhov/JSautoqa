import { expect, Page } from '@playwright/test';
import { Base } from './Base';
import { locators } from './locators';

export class ProductPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  async navigateToCategory(category: 'women') {
    await this.preparePage('/');
    await this.page.click(locators.productPage.categories[category]);
    await this.page.click(locators.productPage.navMenu.newIn);
  }

  async chooseFirstItem() {
    await this.page.click(locators.productPage.productFirstItem);
  }

  async verifyProductDetails() {
    const productTitle = this.page.locator(locators.productPage.productTitle);
    const productPrice = this.page.locator(locators.productPage.productPrice);
    const productDescription = this.page.locator(locators.productPage.productDescription);
    
    await productTitle.waitFor();
    await expect(productTitle).toBeVisible();
    await expect(productPrice).toBeVisible();
    await expect(productDescription).toBeVisible();
  }
}