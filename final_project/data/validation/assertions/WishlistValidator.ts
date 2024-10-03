import { expect, Locator, Page } from '@playwright/test';
import { wishlistPage } from '../../locators';

export class WishlistValidations {
  constructor(private page: Page) {}

  async assertProductsInTheWishlist(): Promise<void> {
    const sectionCount = await this.page
      .locator(wishlistPage.productsCountInTheWishlist)
      .count();
    await expect(sectionCount).toBeGreaterThan(0);
  }

  async assertDuplicateErrorMessage(
    errorMessageLocator: Locator
  ): Promise<void> {
    await expect(errorMessageLocator).toBeVisible();
  }

  async assertPromptToLogInAppears(expectedKeywords: string[]): Promise<void> {
    const loginPrompt = await this.page
      .locator(wishlistPage.loginPromptMessage)
      .textContent();
    for (const keyWord of expectedKeywords) {
      await expect(loginPrompt).toContain(keyWord);
    }
  }

  async assertEmptyWishlistMessage(expectedMessage: string): Promise<void> {
    const emptyMessage = await this.page
      .locator(wishlistPage.wishlistEmptyMessage)
      .textContent();
    await expect(emptyMessage).toBe(expectedMessage);
  }
}
