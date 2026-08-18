export const PURCHASE_ORDER_INITIAL_VALUES = Object.freeze({
  product: "",
  supplier: "",
  purchaseDate: "",
  expectedDeliveryDate: "",
  actualDeliveryDate: "",
  quantityPurchased: "",
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
