export class Base {

    async isContainingInUrl(text: string) {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(text),
            {
                timeout: 3000,
                timeoutMsg: 'The Page loads more then 5 sec(',
            }
        );
        return (await browser.getUrl()).includes(text);
    }

    async isElementVisible(locator: string): Promise<boolean> {
        const elementIsDisplayed = $(locator);
        await elementIsDisplayed.waitForDisplayed({ timeout: 3000 });
        return elementIsDisplayed.isDisplayed();
    }
}