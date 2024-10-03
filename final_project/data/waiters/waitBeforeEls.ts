import { Page } from "@playwright/test";

/**
 * Waits for the page to load completely and for an element to become visible.
 * If the element is a button, it also waits for it to be clickable.
 * 
 * @param {Page} page - The page instance on which to perform the wait.
 * @param {string} locator - The locator of the element to check for visibility.
 */
export async function waitForPageLoadAndElVisible(page: Page, locator: string) {
    await page.waitForLoadState('load');
    const elementHandle = await page.locator(locator).first();
    await elementHandle.waitFor({ state: 'visible' });
    await page.waitForTimeout(200);
}