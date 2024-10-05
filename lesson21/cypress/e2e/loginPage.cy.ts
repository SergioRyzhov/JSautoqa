import { LoginPage } from '../pages/LoginPage';
import { ProfilePage } from '../pages/ProfilePage';


describe('Login Page Tests', () => {
  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();

  const email: string = Cypress.env('email');
  const password: string = Cypress.env('password');
  const user: string = Cypress.env('user');

  beforeEach(() => {
    loginPage.visit();
  });

  it('should have username and password inputs', () => {
    loginPage.getInputs();
  });

  it('should login with valid credentials', () => {
    loginPage.login(email, password);
    loginPage.verifyProjectCard();
    profilePage.verifyLoggedInUser(user);    
  });

  it('should fail login with invalid credentials', () => {
    loginPage.login('invaliduser@example.com', 'invalidpassword');
    loginPage.verifyErrorMessage();
  });
});