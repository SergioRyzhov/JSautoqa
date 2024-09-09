export class LoginPage {
  private loginUrl = '/login';
  private startEmailButton = '.btn-provider-email';
  private emailInput = '#email';
  private passwordInput = '#password';
  private submitButton = 'button[type="submit"]';
  private projectCardButton = 'button.link-card';

  visit() {
    cy.visit(this.loginUrl);
    cy.get(this.startEmailButton).click();
  }

  getEmailInput() {
    return cy.get(this.emailInput);
  }

  getPasswordInput() {
    return cy.get(this.passwordInput);
  }

  getStartEmailElement() {
    return cy.get(this.startEmailButton);
  }

  verifyProjectCard() {
    return cy.get(this.projectCardButton);
  }

  login(email: string, password: string) {
    cy.get(this.emailInput).type(email);
    cy.get(this.passwordInput).type(password);
    cy.get(this.submitButton).click();
  }

  choseProject() {
    this.verifyProjectCard().click();
  }
}