export class LoginPage {
    visit() {
      cy.visit('/login');
      this.getStartEmailElement().click();
    }

    verifyProjectCard() {
        return cy.get('button.link-card');
    }

    getStartEmailElement() {
      return cy.contains('button', 'Log in with email');
    }
  
    getEmailInput() {
      return cy.get('#email');
    }
  
    getPasswordInput() {
      return cy.get('#password');
    }
  
    getSubmitButton() {
      return cy.get('button[type="submit"]');
    }
  
    login(email: string, password: string) {
      this.getEmailInput().type(email);
      this.getPasswordInput().type(password);
      this.getSubmitButton().click();
    }

    choseProject() {
      this.verifyProjectCard().click();
    }
  }  