import { Page } from '@playwright/test';
import { cartPage } from '../data/locators';
import { Base } from './Base';
import { getCleanPrice } from '../data/helpers/prices';
import { pageEndpoints } from '../data/endpoints';
import { ProductPage } from '../pages';
import { waitUpdatedPrice } from '../data/waiters/waitPriceUpdate';
import { waitForPageLoadAndElVisible } from '../data/waiters/waitBeforeEls';
import { CartValidator } from '../data/validation/assertions/CartValidator';
import { PageFactory } from './PageFactory';

export class CartPage extends Base {
  private productPage = PageFactory.getPage(
    this.page,
    'ProductPage'
  ) as ProductPage;
  private validator: CartValidator;

  constructor(page: Page) {
    super(page);
    this.validator = new CartValidator(page);
  }

  async addFirstProductToTheCart() {
    await this.navigateToPage(pageEndpoints.productsPage);
    await this.productPage.openTheFirstItemOfProducts();
    await waitForPageLoadAndElVisible(this.page, cartPage.firstSizeButton);
    await this.page.click(cartPage.firstSizeButton);
    await waitForPageLoadAndElVisible(this.page, cartPage.addToCartButton);
    await this.page.click(cartPage.addToCartButton);
    await this.navigateToPage(pageEndpoints.cartPage);
  }

  async calculateUpdatedTotalPriceInCart(
    quantityOfProducts: number
  ): Promise<{ oldPrice: number; newPrice: number }> {
    await this.navigateToPage(pageEndpoints.cartPage);
    const oldPrice = await this.getCurrentTotalPriceInTheCart();
    await this.updateProductQuantity(quantityOfProducts);
    const newPrice = await waitUpdatedPrice(
      this.page,
      oldPrice,
      cartPage.cartTotalPrice
    );
    return { oldPrice, newPrice };
  }

  async getCurrentTotalPriceInTheCart(): Promise<number> {
    const price = await this.page
      .locator(cartPage.cartTotalPrice)
      .textContent();
    const cleanedPrice = getCleanPrice(price ?? '');
    return cleanedPrice;
  }

  async updateProductQuantity(quantityOfProducts: number) {
    await this.page.locator(cartPage.cartProductEditButton).click();
    await this.page.selectOption(cartPage.cartProductQtySelector, {
      index: quantityOfProducts - 1,
    });
    await this.page.locator(cartPage.cartProductUpdateButton).click();
  }

  async updateProductQtyInTheCart(quantityOfProducts: number) {
    await this.navigateToPage(pageEndpoints.cartPage);
    await this.updateProductQuantity(quantityOfProducts);
    await this.navigateToPage(pageEndpoints.cartPage);
  }

  async removeProductFromTheCart() {
    const removeButton = this.page
      .locator(cartPage.rmProductFromTheCartButton)
      .first();
    await removeButton.click();
    await this.page.waitForLoadState('load');
  }

  async assertCartEmpty() {
    await this.validator.assertCartEmpty();
  }

  async assertTotalPrice(expectedTotal: string) {
    await this.validator.assertTotalPrice(expectedTotal);
  }

  async assertCartItemCount(expectedCount: number) {
    await this.validator.assertCartItemCount(expectedCount);
  }
}
