export class ProfilePage {
    private userDiv = 'div.user';
    private profileMenuButton = 'button.organization-switcher-button.undefined';
    private logoutLink = 'a[href="/logout"]';
  
    verifyLoggedInUser(expectedUsername: string) {
      cy.get(this.userDiv).should('contain', expectedUsername);
    }
  
    logout() {
      cy.get(this.profileMenuButton).click();
      cy.get(this.logoutLink).click();
    }
  }  