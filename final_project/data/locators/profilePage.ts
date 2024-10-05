export const profilePage = {
  field: (name: string) =>
    `//form[@class="b-form m-account"]//label[contains(text(), "${name}")]`,
  inputField: (name: string) =>
    `//form[@class="b-form m-account"]//label[contains(text(), "${name}")]/following-sibling::input`,
  updateButton: 'button.b-button.m-width_full.m-small',
  userNameHeader: 'span.b-header_login-user_name',
};
