export const locators = {
    loginPage: {
      emailInput: 'input#dwfrm_login_email',
      passwordInput: 'input#dwfrm_login_password',
      submitButton: 'button[data-tau="login_submit"]',
      accountTitle: 'h1.b-page_title',
      errorMessage: 'div[data-tau="login_error_message"]',
    },
    basePage: {
      acceptCookieMainWindow: '#onetrust-banner-sdk',
      acceptCookieButton: '#onetrust-accept-btn-handler',
      captchaFrameSelector: 'div.rc-imageselect-payload',
    },
    searchResultPage: {
      searchInput: 'input#header-search-input',
      searchHeader: 'div.b-header_search > h1 > a',
      searchNoResultsMsg: 'div.b-header_search > p.b-header_search-noresult_msg',
      searchResultCards: 'section.b-product_tile',
    },
    productPage: {
      categories: {
        women: '//a[@aria-label="WOMENS"]',
      },
      navMenu: {
        newIn: '//a[contains(text(), "NEW IN")]',
      },
      productTitle: '#editProductModalTitle',
      productPrice: '[data-tau="product_details_price"]',
      productDescription: '//div[@data-id="descriptions"]',
      productFirstItem: 'section.b-product_tile a',
    },
    cart: {
      cartItemCount: '.cart-item-count',
      productName: (name: string) => `//div[@class='product-name' and text()='${name}']`,
      productSize: (name: string) => `//div[@class='product-name' and text()='${name}']//following-sibling::span[@class='product-size']`,
      productPrice: (name: string) => `//div[@class='product-name' and text()='${name}']//following-sibling::span[@class='product-price']`,
      quantityInput: (name: string) => `//div[@class='product-name' and text()='${name}']//following-sibling::input[@class='quantity-input']`,
      removeButton: (name: string) => `//div[@class='product-name' and text()='${name}']//following-sibling::button[@class='remove-item']`,
      discountInput: '#discount-code-input',
      applyDiscountButton: '#apply-discount',
      totalPrice: '.total-price',
      emptyCartMessage: '.cart-empty-message',
    },
  };