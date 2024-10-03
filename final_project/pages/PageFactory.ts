import { Page } from '@playwright/test';
import { Base } from './Base';
import * as Pages from '../pages';

export class PageFactory {
  static getPage(page: Page, pageName: keyof typeof Pages): Base {
    const PageClass = Pages[pageName];
    if (!PageClass) {
      throw new Error(`Page ${pageName} not found`);
    }
    return new PageClass(page);
  }
}