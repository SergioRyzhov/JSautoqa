export async function addProductToWishlist(
    page: any, 
    addToWishlistButton: any, 
    oldWishQtyCleaned: number, 
    locators: any
) {
    const ariaPressed = await addToWishlistButton.getAttribute('aria-pressed');

    if (ariaPressed === 'false') {
        await addToWishlistButton.click();
        console.log(`>>> Clicked on wishlist button`);

        await page.waitForFunction(
            (oldQty: number, locators: any) => {
                console.log(`>>> Start waitForFunction`);
                const newWishQty = document.querySelector(locators.wishlistPage.wishlistQuantitySmallIcon)?.textContent;
                console.log(`>>> Got the selector ${newWishQty}`);
                const newWishQtyCleaned = parseInt(newWishQty!.replace(/\D/g, ''), 10);
                console.log(`>>> End waitForFunction`);
                return newWishQtyCleaned !== oldQty;
            },
            oldWishQtyCleaned,
            locators
        );
    }
}