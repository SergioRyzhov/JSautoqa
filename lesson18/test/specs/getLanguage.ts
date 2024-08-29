describe('WebdriverIO language functionality', () => {
    it('should switch to the German language', async () => {
        await browser.url('https://webdriver.io');
        const languageDropdownTrigger = await $('div.navbar__item.dropdown.dropdown--hoverable.dropdown--right');
        await languageDropdownTrigger.moveTo();
        const dropdownMenu = await $('ul.dropdown__menu');
        await dropdownMenu.waitForDisplayed({ timeout: 3000 });
        const germanLanguageOption = await $('a[lang="de"]');
        await germanLanguageOption.waitForDisplayed({ timeout: 3000 });
        await germanLanguageOption.scrollIntoView();
        const isClickable = await germanLanguageOption.isClickable();
        if (!isClickable) {
            await browser.execute((element) => element.click(), germanLanguageOption);
        } else {
            await germanLanguageOption.click();
        }
        await expect(browser).toHaveUrl('https://webdriver.io/de/');
        const subtitleText = await $('p.hero__subtitle').getText();
        expect(subtitleText).toContain('Test-Framework für Browser und mobile Automatisierung der nächsten Generation für Node.js');
    });
});
