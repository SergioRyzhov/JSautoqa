import { Given, When, Then } from '@wdio/cucumber-framework';
import { LoginPage } from '../pageobjects/LoginPage';
import { expect } from '@wdio/globals';

const loginPage = new LoginPage();

const locators: { [key: string]: string} = {
    'Username Input': '#user_email',
    'Password Input': '#user_password',
    'Submit Button': 'input[type="submit"]',
    'Left Nav Menu': '#ember18',
    'User Preferences Button': 'button[title="User preferences and organizations"]',
    'Profile Button': 'a.ember-view.t-profile',
    'Profile Header': '//h1[contains(text(), "Profile")]',
    'Sign Out Button': '//a[contains(text(), "Sign out")]',
    'Sign In Button': 'input[type="submit"]'
  };

Given(/^I am on the (.*) page$/, async (url) => {
    await browser.url(url);
});

When(/^I input valid username "(.*)" in input "(.*)" and password "(.*)" in input "(.*)"$/, async (
    username: string,
    usernameLocator: string,
    password: string,
    passwordLocator: string,
) => {
    const envUsername = process.env.LOGIN_USERNAME || username;
    const envPassword = process.env.LOGIN_PASSWORD || password;

    await loginPage.inputData(locators[usernameLocator], envUsername);
    await loginPage.inputData(locators[passwordLocator], envPassword);
});

Then(/^I click on "(.*)" button$/, async (locatorName: string) => {
    await $(locators[locatorName]).waitForDisplayed();
    await $(locators[locatorName]).click();
});

Then(/^I should be redirected to the url contains "(.*)"$/, async (text: string) => {
    expect(await loginPage.isContainingInUrl(text)).toBe(true);
});

Then(/^I should see an element "(.*)"$/, async (locatorName: string) => {
    expect(await loginPage.isElementVisible(locators[locatorName])).toBe(true);
});