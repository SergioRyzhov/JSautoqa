import { expect } from "playwright/test";
import { Base } from "./Base";
import { locators } from "../data/locators";
import { keyWords } from "../data/keywords";
import { pageUrls } from "../data/pageurls";
import { waitForPageLoadAndElVisible } from "../waiters/waiterBeforeEls";

export class ProfilePage extends Base {
    async getProfileDetail(fieldName: string) {
        await expect(this.page.locator(locators.profilePage.field(fieldName))).toBeVisible();
    }

    async editProfileDetail(fieldName: string, value: string) {
        await this.page.fill(locators.profilePage.inputField(fieldName), value);
    }

    async checkProfileDetails() {
        await this.navigateToPage(pageUrls.profileEditPage);
        for (const key in keyWords.profilePage.fieldName) {
            const profileKey = key as keyof typeof keyWords.profilePage.fieldName;
            this.getProfileDetail(keyWords.profilePage.fieldName[profileKey]);
        }
    }

    async checkEditFirstName(newName: string) {
        await this.navigateToPage(pageUrls.profileEditPage);
        await this.editProfileDetail(keyWords.profilePage.fieldName.firstName, newName);
        await waitForPageLoadAndElVisible(this.page, locators.profilePage.updateButton);
        await this.page.click(locators.profilePage.updateButton);
    }

    async checkFirstNameChange(newName: string) {
        const newNameText = await this.page.locator(locators.profilePage.userNameHeader).textContent();
        const trimmedNameText = newNameText?.trim();
        await expect(trimmedNameText).toContain(newName);
    }
}