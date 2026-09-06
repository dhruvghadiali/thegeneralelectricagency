export const EMPTY_PURCHASE_PRODUCT = Object.freeze({
  product: "",
  quantityPurchased: "",
});

export const PURCHASE_ORDER_INITIAL_VALUES = Object.freeze({
  supplier: "",
  products: Object.freeze([{ ...EMPTY_PURCHASE_PRODUCT }]),
  purchaseDate: "",
  expectedDeliveryDate: "",
  actualDeliveryDate: "",
  billAmount: "",
  actualPaidAmount: 0,
  gstPercentage: "",
  gstAmount: "",
  purchaseOrderPdf: "",
  stocks: [],
  payments: [],
});

export const EMPTY_PURCHASE_PAYMENT = Object.freeze({
  paymentStatus: "pending",
  paymentAmount: "",
  paymentDate: "",
  expectedPaymentDate: "",
  paymentMode: "",
  paymentReferenceNumber: "",
});
