import { expect, Page } from '@playwright/test';
import { cartPage } from '../../locators';
import { textData } from '../../textData';

export class CartValidator {
  constructor(private page: Page) {}

  async assertCartEmpty() {
    const emptyMessage = await this.page
      .locator(cartPage.cartEmptyMessage)
      .textContent();
    await expect(emptyMessage).toContain(textData.cartPage.emptyMessage);
  }

  async assertTotalPrice(expectedTotal: string) {
    const total = await this.page
      .locator(cartPage.cartTotalPrice)
      .textContent();
    await expect(total).toBe(expectedTotal);
  }

  async assertCartItemCount(expectedCount: number) {
    const count = await this.page
      .locator(cartPage.cartItemCountSmall)
      .textContent();
    await expect(Number(count)).toBe(expectedCount);
  }
}
