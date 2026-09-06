export const EMPTY_PURCHASE_PRODUCT = Object.freeze({
  product: "",
  standaloneStock: "",
  quantityPurchased: "",
  unitPrice: "",
  unitDiscount: "",
  unitGst: "",
  unitGstAmount: "",
  finalPrice: "",
  notes: "",
});

export const PURCHASE_ORDER_INITIAL_VALUES = Object.freeze({
  supplier: "",
  products: Object.freeze([{ ...EMPTY_PURCHASE_PRODUCT }]),
  bills: Object.freeze([]),
  receivedOrCollectedBy: "",
});
