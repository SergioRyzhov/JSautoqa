import { expect } from 'playwright/test';
import { Base } from './Base';
import { profilePage } from '../data/locators';
import { textData } from '../data/textData';
import { pageEndpoints } from '../data/endpoints';
import { waitForPageLoadAndElVisible } from '../data/waiters/waitBeforeEls';

export class ProfilePage extends Base {
  async assertProfileDetails() {
    await this.navigateToPage(pageEndpoints.profileEditPage);
    for (const key in textData.profilePage.fieldName) {
      const profileKey = key as keyof typeof textData.profilePage.fieldName;
      await expect(
        this.page.locator(
          profilePage.field(textData.profilePage.fieldName[profileKey])
        )
      ).toBeVisible();
    }
  }

  async assertEditFirstName(newName: string) {
    await this.navigateToPage(pageEndpoints.profileEditPage);
    await this.page.fill(
      profilePage.inputField(textData.profilePage.fieldName.firstName),
      newName
    );
    await waitForPageLoadAndElVisible(this.page, profilePage.updateButton);
    await this.page.click(profilePage.updateButton);
  }

  async assertFirstNameChange(newName: string) {
    const newNameText = await this.page
      .locator(profilePage.userNameHeader)
      .textContent();
    const trimmedNameText = newNameText?.trim();
    await expect(trimmedNameText).toContain(newName);
  }
}
