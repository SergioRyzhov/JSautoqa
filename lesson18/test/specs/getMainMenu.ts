describe('WebdriverIO Main Page Top Menu', () => {
    it('should display "Docs", "API", "Blog" in the top menu', async () => {
        await browser.url('https://webdriver.io');

        const docsLink = await $('nav a[href="/docs/gettingstarted"]');
        const apiLink = await $('nav a[href="/docs/api"]');
        const blogLink = await $('nav a[href="/blog"]');

        await expect(docsLink).toBeDisplayed();
        await expect(apiLink).toBeDisplayed();
        await expect(blogLink).toBeDisplayed();

        await expect(docsLink).toHaveText('Docs');
        await expect(apiLink).toHaveText('API');
        await expect(blogLink).toHaveText('Blog');
    });
});