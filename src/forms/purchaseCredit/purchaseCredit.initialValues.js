import { PURCHASE_CREDIT_PAYMENT_STATUSES } from "@Enums";

export const EMPTY_PURCHASE_CREDIT_PRODUCT = Object.freeze({
  product: "",
  stock: "",
});

export const EMPTY_PURCHASE_CREDIT_PAYMENT = Object.freeze({
  id: null,
  paymentStatus: PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS,
  savedPaymentStatus: PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS,
  amount: "",
  paymentType: "",
  referenceId: "",
  paymentDate: "",
  receivedPaymentDate: "",
  savedReceivedPaymentDate: "",
  notes: "",
  savedNotes: "",
  paymentReceipts: [],
});

export const EMPTY_PURCHASE_CREDIT_PAYMENT_PLAN = Object.freeze({
  id: null,
  remindingDate: "",
  savedRemindingDate: "",
  amount: "",
  savedAmount: "",
  paymentType: "",
  savedPaymentType: "",
  isPaymentCompleted: false,
  savedIsPaymentCompleted: false,
  notes: "",
  savedNotes: "",
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
