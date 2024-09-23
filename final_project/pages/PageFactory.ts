import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { Base } from './Base';
import { SearchPage } from './SearchPage';

class PageFactory {
  static getPage(page: Page, pageName: string): Base {
    switch (pageName) {
      case 'LoginPage':
        return new LoginPage(page);
      case 'SearchPage':
        return new SearchPage(page);
      default:
        throw new Error(`Page ${pageName} not found`);
    }
  }
}

export { PageFactory };