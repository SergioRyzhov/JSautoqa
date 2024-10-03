import { Locator, Page } from '@playwright/test';
import { Base } from './Base';
import { pageEndpoints } from '../data/endpoints';
import { ProductPage } from '../pages';
import { getCleanPrice } from '../data/helpers/prices';
import { cleanQuantity } from '../data/helpers/products';
import { wishlistPage } from '../data/locators';
import { waitUntilCountChange } from '../data/waiters/waitRemoveProduct';
import { waitForPageLoadAndElVisible } from '../data/waiters/waitBeforeEls';
import { PageFactory } from './PageFactory';

export class WishlistPage extends Base {
  private productPage = PageFactory.getPage(
    this.page,
    'ProductPage'
  ) as ProductPage;

  constructor(page: Page) {
    super(page);
  }

  async addTheFirstProductToTheWishlist() {
    await this.removeProductsFromWishlist();
    await this.navigateToPage(pageEndpoints.productsPage);
    await this.productPage.openTheFirstItemOfProducts();
    await this.addChosenProductToWishlist();
  }

  async assertProductsInTheWishlist(): Promise<boolean> {
    await this.navigateToPage(pageEndpoints.wishlistPage);
    const sectionCount = await this.page
      .locator(wishlistPage.productsCountInTheWishlist)
      .count();
    return sectionCount === 1;
  }

  async getProductsCountFromTheSmallIcon(): Promise<number> {
    await waitForPageLoadAndElVisible(this.page, wishlistPage.smallIconCount);
    const countOfProducts = await this.page
      .locator(wishlistPage.smallIconCount)
      .textContent();
    const cleanedCount = getCleanPrice(countOfProducts!);
    return cleanedCount;
  }

  async removeProductsFromWishlist() {
    await this.navigateToPage(pageEndpoints.wishlistPage);
    let removeButtons = await this.page.locator(
      wishlistPage.removeButtonsOfProductsInTheWishlist
    );
    const initialButtonsCount = await removeButtons.count();

    for (let i = 0; i < initialButtonsCount; i++) {
      let beforeRemoveCount = await removeButtons.count();
      await removeButtons.first().click();
      await waitUntilCountChange(
        this.page,
        wishlistPage.removeButtonsOfProductsInTheWishlist,
        beforeRemoveCount
      );
      removeButtons = await this.page.locator(
        wishlistPage.removeButtonsOfProductsInTheWishlist
      );
    }
  }

  async addProductsToWishlistFast(n: number) {
    await this.navigateToPage(pageEndpoints.productsPage);
    const addToWishlistButtons = this.page.locator(
      wishlistPage.addToWishlistButtons
    );
    const buttonsCount = await addToWishlistButtons.count();

    if (n <= buttonsCount) {
      for (let i = 0; i < n; i++) {
        await this.page.waitForLoadState('load');

        const oldWishQty = await this.page
          .locator(wishlistPage.wishQuantitySmallIcon)
          .textContent();
        const oldWishQtyCleaned = cleanQuantity(oldWishQty ?? '');

        const ariaPressed = await addToWishlistButtons
          .nth(i)
          .getAttribute('aria-pressed');

        if (ariaPressed === 'false') {
          await addToWishlistButtons.nth(i).click();

          await this.page.waitForFunction(
            ({ oldQty, wishlistSelector }) => {
              const element = document.querySelector(wishlistSelector);
              if (!element || !element.textContent) return false;
              const newWishQtyCleaned = parseInt(
                element.textContent.replace(/\D/g, ''),
                10
              );
              return newWishQtyCleaned !== oldQty;
            },
            {
              oldQty: oldWishQtyCleaned,
              wishlistSelector: wishlistPage.wishQuantitySmallIcon,
            }
          );
        }
      }
    }
  }

  async getEmptyWishlistMessage(): Promise<string | null> {
    await this.page.waitForSelector(wishlistPage.wishlistEmptyMessage, {
      state: 'visible',
    });
    return this.page.locator(wishlistPage.wishlistEmptyMessage).textContent();
  }

  async addChosenProductToWishlist() {
    await waitForPageLoadAndElVisible(
      this.page,
      wishlistPage.addChosenProductToWishlist
    );
    await this.page.click(wishlistPage.addChosenProductToWishlist);
    await this.page.waitForLoadState('load');
  }

  async getDuplicateErrorMessage(): Promise<Locator> {
    return this.page.locator(wishlistPage.duplicateErrorMessageToAdd);
  }

  async assertPromptToLogInAppears(): Promise<string | null> {
    await this.navigateToPage(pageEndpoints.wishlistPage);
    return this.page.locator(wishlistPage.loginPromptMessage).textContent();
  }
}
