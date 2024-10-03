import { Page, test } from '@playwright/test';
import { ProfilePage, LoginPage } from '../pages';
import { BrowserSingleton } from '../data/helpers/BrowserSingleton';
import { loginCredentials } from '../data/creds';
import { textData } from '../data/textData';
import { PageFactory } from '../pages/PageFactory';

test.afterAll(async () => {
  const browserSingleton = await BrowserSingleton.getInstance();
  await browserSingleton.close();
});

test.describe('Profile Test Suite', () => {
  let profilePage: ProfilePage;
  let page: Page;

  test.beforeEach(async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    page = await browserSingleton.getPage();

    profilePage = PageFactory.getPage(page, 'ProfilePage') as ProfilePage;
  });

  test('should display user profile details', async () => {
    const loginPage = PageFactory.getPage(page, 'LoginPage') as LoginPage;

    await loginPage.login(loginCredentials.valid.login!, loginCredentials.valid.pass!, true);

    await profilePage.assertProfileDetails();
  });

  test('should allow user to edit profile details', async () => {
    await profilePage.assertEditFirstName(textData.profilePage.accountFakeData.firstName);
  });

  test('should assert that profile changes were saved', async () => {
    await profilePage.assertFirstNameChange(textData.profilePage.accountFakeData.firstName);
  });
});