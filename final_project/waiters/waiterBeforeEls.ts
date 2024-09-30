import { Page } from "@playwright/test";

export async function waitForPageLoadAndElVisible(page: Page, locator: string) {
    await page.waitForLoadState('load');
    const elementHandle = await page.locator(locator).first();
    await elementHandle.waitFor({ state: 'visible'});
}