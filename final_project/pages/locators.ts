export const locators = {
    loginPage: {
      emailInput: 'input#dwfrm_login_email',
      passwordInput: 'input#dwfrm_login_password',
      submitButton: 'button[data-tau="login_submit"]',
      accountTitle: 'h1.b-page_title',
      errorMessage: 'div[data-tau="login_error_message"',
    },
    basePage: {
      acceptCookieMainWindow: '#onetrust-banner-sdk',
      acceptCookieButton: '#onetrust-accept-btn-handler',
      captchaFrameSelector: 'div.rc-imageselect-payload',
    },
    searchResultPage: {
      searchInputLocator: 'input#header-search-input',
    },
  };