import { expect, Page } from '@playwright/test';
import { locators } from '../data/locators';
import { Base } from './Base';
import { getCleanNumbers } from '../helpers/cleanNumbers';
import { pageUrls } from '../data/pageurls';
import { ProductPage } from './ProductPage';
import { PageFactory } from '../patterns/PageFactory';

export class CartPage extends Base {
  private productPage = PageFactory.getPage(this.page, 'ProductPage') as ProductPage;

  constructor(page: Page) {
    super(page);
  }

  async addFirstProductToTheCart() {
    await this.navigateToPage(pageUrls.productsPage);
    await this.productPage.openTheFirstItemOfProducts();
    await this.page.waitForSelector(locators.cartPage.firstSizeButton, { state: 'visible' });
    await this.page.waitForSelector(locators.cartPage.addToCartButton, { state: 'visible' });
    await this.page.click(locators.cartPage.firstSizeButton);
    await this.page.click(locators.cartPage.addToCartButton);
    await this.navigateToPage(pageUrls.cartPage);
  }

  async refreshTheCart() {
    await this.page.reload({ waitUntil: 'load' });
    await this.navigateToPage(pageUrls.cartPage);
  }

  async getCartItemCount(): Promise<number> {
    const count = await this.page.locator('span.b-cart_product-qty_value').textContent();
    return Number(count);
  }

  async getCartTotalPrice(): Promise<number> {
    const price = await this.page.locator('tr.b-summary_table-item.m-total > td').textContent();
    const cleanedPrice = getCleanNumbers(price ?? '');
    return cleanedPrice;
  }

  async updateProductQuantity(quantity: number) {
    await this.page.click(locators.cartPage.cartProductEditButton);
    await this.page.selectOption(locators.cartPage.cartProductQtySelector, { index: quantity - 1 });
    await this.page.click(locators.cartPage.cartProductUpdateButton);
  }

  async removeProduct() {
    const removeButton = this.page.locator('tr[data-tau="cart_product_item"] > .l-cart_product-remove > button').first();
    await removeButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async applyDiscountCode(code: string) {
    await this.page.fill(locators.cart.discountInput, code);
    await this.page.click(locators.cart.applyDiscountButton);
  }

  async verifyCartEmpty() {
    const emptyMessage = await this.page.locator('h2.b-cart_empty-title').textContent();
    expect(emptyMessage).toContain('Your cart is currently empty');
  }

  async verifyTotalPrice(expectedTotal: string) {
    const total = await this.page.locator(locators.cart.totalPrice).textContent();
    expect(total).toBe(expectedTotal);
  }

  async waitForElement() {
    await this.page.isVisible('span[data-tau="header_minicart_icon_qty"]');
  }
}