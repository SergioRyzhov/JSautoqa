import { Page, test } from '@playwright/test';
import { PageFactory } from '../patterns/PageFactory';
import { ProfilePage } from '../pages/ProfilePage';
import { BrowserSingleton } from '../patterns/BrowserSingleton';
import { LoginPage } from '../pages/LoginPage';
import { loginCredentials } from '../data/creds';
import { keyWords } from '../data/keywords';

test.afterAll(async () => {
  const browserSingleton = await BrowserSingleton.getInstance();
  await browserSingleton.close();
});

test.describe('Profile Test Suite', () => {
  let profilePgae: ProfilePage;
  let page: Page;

  test.beforeEach(async () => {
    const browserSingleton = await BrowserSingleton.getInstance();
    page = await browserSingleton.getPage();

    profilePgae = PageFactory.getPage(page, 'ProfilePage') as ProfilePage;
  });


  test('should display user profile details', async () => {
    const loginPage = PageFactory.getPage(page, 'LoginPage') as LoginPage;

    await loginPage.login(loginCredentials.valid.login!, loginCredentials.valid.pass!, true);

    await profilePgae.checkProfileDetails();
  });

  test('should allow user to edit profile details', async () => {
    await profilePgae.checkEditFirstName(keyWords.profilePage.accountFakeData.firstName)
  });

  test('should verify that profile changes were saved', async () => {
    await profilePgae.checkFirstNameChange(keyWords.profilePage.accountFakeData.firstName);
  });
})