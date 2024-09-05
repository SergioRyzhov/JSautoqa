import { ProfilePage } from '../pages/ProfilePage';
import { LoginPage } from '../pages/LoginPage';

describe('Profile Page Tests', () => {
  const profilePage = new ProfilePage();
  const loginPage = new LoginPage();

  const email: string = Cypress.env('email');
  const password: string = Cypress.env('password');

  beforeEach(() => {
    loginPage.visit();    
  });


  it('should log out successfully', () => {
    loginPage.login(email, password);
    loginPage.choseProject();
    profilePage.logout();
    loginPage.getStartEmailElement().should('be.visible');
  });
});