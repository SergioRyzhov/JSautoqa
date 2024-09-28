import { Page } from '@playwright/test';
import { Base } from '../pages/Base';
import { LoginPage } from '../pages/LoginPage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { ProfilePage } from '../pages/ProfilePage';
import { WishlistPage } from '../pages/WishlistPage';
import { LogoutPage } from '../pages/LogoutPage';

export class PageFactory {
  static getPage(page: Page, pageName: string): Base {
    switch (pageName) {
      case 'LoginPage':
        return new LoginPage(page);
      case 'LogoutPage':
        return new LogoutPage(page);
      case 'SearchPage':
        return new SearchPage(page);
      case 'ProductPage':
        return new ProductPage(page);
      case 'CartPage':
        return new CartPage(page);
      case 'ProfilePage':
        return new ProfilePage(page);
      case 'WishlistPage':
        return new WishlistPage(page);
      default:
        throw new Error(`Page ${pageName} not found`);
    }
  }
}