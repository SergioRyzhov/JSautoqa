export class ProfilePage { 
    getUserDiv() {
        return cy.get('div.user');
    }
    
    verifyLoggedInUser(expectedUsername: string) {
        this.getUserDiv().should('contain', expectedUsername);
    }

    getProfileMenu() {
        return cy.get('button.organization-switcher-button.undefined');
    }

    getLogoutButton() {
        return cy.get('a[href="/logout"]');
    }
  
    logout() {
        this.getProfileMenu().click();
        this.getLogoutButton().click();
    }
}  