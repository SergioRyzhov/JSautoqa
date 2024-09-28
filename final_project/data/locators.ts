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
  cartPage: {
    firstSizeButton: 'div[aria-label="Size"] > button',
    addToCartButton: '//button/span[contains(text(), "Add to cart")]',
    cartProductEditButton: 'button.b-cart_product-edit.b-button.m-link',
    cartProductQtySelector: 'div.b-product_update-attribute.m-overflowed select',
    cartProductUpdateButton: 'button.b-product_update-button_update.b-button.m-small.m-secondary',
  },
  logoutPage: {
    logoutButton: 'a.b-account-signout',
    loginHeader: 'span.b-page_title',
  },
  profilePage: {
    field: (name: string) => `//form[@class="b-form m-account"]//label[contains(text(), "${name}")]`,
    inputField: (name: string) => `//form[@class="b-form m-account"]//label[contains(text(), "${name}")]/following-sibling::input`,
    updateButton: 'button.b-button.m-width_full.m-small',
    userNameHeader: 'span.b-header_login-user_name',
  }
};