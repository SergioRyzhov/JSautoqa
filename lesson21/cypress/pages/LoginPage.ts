export class LoginPage {
  private loginUrl = '/login';
  private startEmailButton = '.btn-provider-email';
  private emailInput = '#email';
  private passwordInput = '#password';
  private submitButton = 'button[type="submit"]';
  private projectCardButton = 'button.link-card';
  private errrorMessage = '.error-message';
  

  visit() {
    cy.visit(this.loginUrl);
    cy.get(this.startEmailButton).click();
  }

  getInputs() {
    cy.get(this.emailInput).should('be.visible');
    cy.get(this.passwordInput).should('be.visible');
  }

  verifyStartEmailElement() {
    cy.get(this.startEmailButton).should('be.visible');
  }

  verifyProjectCard() {
    cy.get(this.projectCardButton).click();
  }

  login(email: string, password: string) {
    cy.get(this.emailInput).type(email);
    cy.get(this.passwordInput).type(password);
    cy.get(this.submitButton).click();
  }

  verifyErrorMessage(){
    cy.get(this.errrorMessage).should('be.visible');
  }
}