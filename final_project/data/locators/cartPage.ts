export const cartPage = {
  firstSizeButton: 'div[aria-label="Size"] > button',
  addToCartButton: '//button/span[contains(text(), "Add to cart")]',
  cartProductEditButton: 'button.b-cart_product-edit.b-button.m-link',
  cartProductQtySelector: 'div.b-product_update-attribute.m-overflowed select',
  cartProductUpdateButton:
    'button.b-product_update-button_update.b-button.m-small.m-secondary',
  cartTotalPrice: 'tr.b-summary_table-item.m-total > td',
  rmProductFromTheCartButton:
    'tr[data-tau="cart_product_item"] > .l-cart_product-remove > button',
  cartEmptyMessage: 'h2.b-cart_empty-title',
  cartItemCountSmall: 'span.b-cart_product-qty_value',
};
