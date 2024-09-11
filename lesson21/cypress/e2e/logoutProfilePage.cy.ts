import { ProfilePage } from '../pages/ProfilePage';
import { LoginPage } from '../pages/LoginPage';

describe('Profile Page Tests', () => {
  const profilePage = new ProfilePage();
  const loginPage = new LoginPage();

  const email: string = Cypress.env('email');
  const password: string = Cypress.env('password');

  it('should log out successfully', () => {
    loginPage.visit();
    loginPage.login(email, password);
    loginPage.verifyProjectCard();
    profilePage.logout();
    loginPage.verifyStartEmailElement();
  });
});