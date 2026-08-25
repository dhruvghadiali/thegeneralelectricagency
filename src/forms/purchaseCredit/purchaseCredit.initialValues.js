import { PURCHASE_CREDIT_PAYMENT_STATUSES } from "@Enums";

export const EMPTY_PURCHASE_CREDIT_PRODUCT = Object.freeze({
  product: "",
  stock: "",
});

export const EMPTY_PURCHASE_CREDIT_PAYMENT = Object.freeze({
  paymentStatus: PURCHASE_CREDIT_PAYMENT_STATUSES.PENDING,
  amount: "",
  paymentType: "",
  referenceId: "",
  paymentDate: "",
  receivedPaymentDate: "",
  notes: "",
  paymentReceipts: [],
});

export const EMPTY_PURCHASE_CREDIT_PAYMENT_PLAN = Object.freeze({
  remindingDate: "",
  amount: "",
  paymentType: "",
  isPaymentCompleted: false,
  notes: "",
});

export const PURCHASE_CREDIT_INITIAL_VALUES = Object.freeze({
  supplier: "",
  products: Object.freeze([{ ...EMPTY_PURCHASE_CREDIT_PRODUCT }]),
  purchaseCreditAt: "",
  purchaseCreditAmount: "",
  expectedDeliveryDate: "",
  acknowledgementId: "",
  acknowledgementReceipts: Object.freeze([]),
  payments: Object.freeze([{ ...EMPTY_PURCHASE_CREDIT_PAYMENT }]),
  paymentPlanning: Object.freeze([]),
});
