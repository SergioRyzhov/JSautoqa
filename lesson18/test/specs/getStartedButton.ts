describe('WebdriverIO Main Page Get Started Button', () => {
    it('should navigate to the "Get Started" page when clicked', async () => {
        await browser.url('https://webdriver.io');

        const getStartedButton = await $('a[href="/docs/gettingstarted"]');
        await getStartedButton.click();
        await expect(browser).toHaveUrl('https://webdriver.io/docs/gettingstarted');
        const title = await browser.getTitle();
        expect(title).toContain('WebdriverIO');
    });
});