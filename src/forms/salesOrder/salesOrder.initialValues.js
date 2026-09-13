export const EMPTY_SALES_ORDER_PRODUCT = Object.freeze({
  product: "",
  purchasePrice: "",
  salePrice: "",
  gstPercentage: "",
  discountAmount: "",
  discountPercentage: "",
  stocks: "",
});

export const SALES_ORDER_INITIAL_VALUES = Object.freeze({
  customer: "",
  supplier: "",
  products: Object.freeze([{ ...EMPTY_SALES_ORDER_PRODUCT }]),
});
