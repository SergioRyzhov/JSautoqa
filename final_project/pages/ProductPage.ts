import { expect, Page } from '@playwright/test';
import { Base } from './Base';
import { productPage } from '../data/locators';
import { pageEndpoints } from '../data/endpoints';
import { waitForPageLoadAndElVisible } from '../data/waiters/waitBeforeEls';

export class ProductPage extends Base {
  constructor(page: Page) {
    super(page);
  }

  async assertWomenDressesPageLoad() {
    await this.navigateToPage(pageEndpoints.productsPage);
    await expect(this.page).toHaveURL(
      new RegExp(`.*${pageEndpoints.productsPage}`)
    );
  }

  async openTheFirstItemOfProducts() {
    await this.navigateToPage(pageEndpoints.productsPage);
    await waitForPageLoadAndElVisible(this.page, productPage.productFirstItem);
    await this.page.click(productPage.productFirstItem);
  }

  async assertElementsVisibility(elements: string[]) {
    for (const locator of elements) {
      await expect(this.page.locator(locator)).toBeVisible();
    }
  }
}
