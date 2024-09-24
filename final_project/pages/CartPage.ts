import { expect, Page } from '@playwright/test';
import { locators } from './locators';
import { Base } from './Base';

export class CartPage extends Base {
    constructor(page: Page) {
        super(page);
    }

  async getCartItemCount(): Promise<number> {
    const count = await this.page.locator(locators.cart.cartItemCount).textContent();
    return Number(count);
  }

  async verifyProductDetails(productName: string, expectedSize: string, expectedPrice: string) {
    const productLocator = this.page.locator(locators.cart.productName(productName));
    await expect(productLocator).toBeVisible();
    const size = await this.page.locator(locators.cart.productSize(productName)).textContent();
    const price = await this.page.locator(locators.cart.productPrice(productName)).textContent();
    expect(size).toBe(expectedSize);
    expect(price).toBe(expectedPrice);
  }

  async updateProductQuantity(productName: string, quantity: number) {
    const quantityLocator = this.page.locator(locators.cart.quantityInput(productName));
    await quantityLocator.fill(quantity.toString());
    await this.page.keyboard.press('Enter');
  }

  async removeProduct(productName: string) {
    const removeButton = this.page.locator(locators.cart.removeButton(productName));
    await removeButton.click();
  }

  async applyDiscountCode(code: string) {
    await this.page.fill(locators.cart.discountInput, code);
    await this.page.click(locators.cart.applyDiscountButton);
  }

  async verifyCartEmpty() {
    const emptyMessage = await this.page.locator(locators.cart.emptyCartMessage).textContent();
    expect(emptyMessage).toContain('Your cart is empty');
  }

  async verifyTotalPrice(expectedTotal: string) {
    const total = await this.page.locator(locators.cart.totalPrice).textContent();
    expect(total).toBe(expectedTotal);
  }
}