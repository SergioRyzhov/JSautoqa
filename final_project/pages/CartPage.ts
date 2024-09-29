import { expect, Page } from '@playwright/test';
import { locators } from '../data/locators';
import { Base } from './Base';
import { getCleanNumbers } from '../helpers/cleanNumbers';
import { pageUrls } from '../data/pageurls';
import { ProductPage } from './ProductPage';
import { PageFactory } from '../patterns/PageFactory';
import { getUpdatedPrice } from '../helpers/priceUtils';
import { keyWords } from '../data/keywords';

export class CartPage extends Base {
  private productPage = PageFactory.getPage(this.page, 'ProductPage') as ProductPage;

  constructor(page: Page) {
    super(page);
  }

  async addFirstProductToTheCart() {
    await this.navigateToPage(pageUrls.productsPage);
    await this.productPage.openTheFirstItemOfProducts();
    await this.page.waitForSelector(locators.cartPage.firstSizeButton, { state: 'visible' });
    await this.page.click(locators.cartPage.firstSizeButton);
    await this.page.waitForSelector(locators.cartPage.addToCartButton, { state: 'visible' });
    await this.page.click(locators.cartPage.addToCartButton);
    await this.navigateToPage(pageUrls.cartPage);
  }

  async refreshTheCart() {
    await this.page.reload({ waitUntil: 'load' });
    await this.navigateToPage(pageUrls.cartPage);
  }

  async getNewTotalPriceInTheCart(): Promise<{ oldPrice: number; newPrice: number }> {
    await this.navigateToPage(pageUrls.cartPage);
    const oldPrice = await this.getCurrentTotalPriceInTheCart();
    await this.updateProductQuantity(3);
    const newPrice = await getUpdatedPrice(this.page, oldPrice, locators.cartPage.cartTotalPrice);
    return { oldPrice: oldPrice, newPrice: newPrice };
  }

  async getCartItemCount(): Promise<number> {
    const count = await this.page.locator(locators.cartPage.cartItemCountSmall).textContent();
    return Number(count);
  }

  async getCurrentTotalPriceInTheCart(): Promise<number> {
    const price = await this.page.locator(locators.cartPage.cartTotalPrice).textContent();
    const cleanedPrice = getCleanNumbers(price ?? '');
    return cleanedPrice;
  }

  async updateProductQuantity(quantity: number) {
    await this.page.click(locators.cartPage.cartProductEditButton);
    await this.page.selectOption(locators.cartPage.cartProductQtySelector, { index: quantity - 1 });
    await this.page.click(locators.cartPage.cartProductUpdateButton);
  }

  async updateProductQtyInTheCart(quantity: number) {
    await this.navigateToPage(pageUrls.cartPage);
    await this.updateProductQuantity(quantity);
    await this.navigateToPage(pageUrls.cartPage);
  }

  async removeProductFromTheCart() {
    const removeButton = this.page.locator(locators.cartPage.rmProductFromTheCartButton).first();
    await removeButton.click();
    await this.page.waitForLoadState('load');
  }

  async verifyCartEmpty() {
    const emptyMessage = await this.page.locator(locators.cartPage.cartEmptyMessage).textContent();
    expect(emptyMessage).toContain(keyWords.cartPage.emptyMessage);
  }

  async verifyTotalPrice(expectedTotal: string) {
    const total = await this.page.locator(locators.cartPage.cartTotalPrice).textContent();
    expect(total).toBe(expectedTotal);
  }
}