export const EMPTY_PURCHASE_PRODUCT = Object.freeze({
  product: "",
  standaloneStock: "",
  quantityPurchased: "",
});

export const PURCHASE_ORDER_INITIAL_VALUES = Object.freeze({
  supplier: "",
  products: Object.freeze([{ ...EMPTY_PURCHASE_PRODUCT }]),
});
