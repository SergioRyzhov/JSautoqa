import { Base } from './Base';
import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { SearchPage } from './SearchPage';
import { ProductPage } from './ProductPage';
import { CartPage } from './CartPage';

class PageFactory {
  static getPage(page: Page, pageName: string): Base {
    switch (pageName) {
      case 'LoginPage':
        return new LoginPage(page);
      case 'SearchPage':
        return new SearchPage(page);
      case 'ProductPage':
        return new ProductPage(page);
      case 'CartPage':
        return new CartPage(page);
      default:
        throw new Error(`Page ${pageName} not found`);
    }
  }
}

export { PageFactory };