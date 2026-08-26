export const PURCHASE_CREDIT_PAYMENT_STATUSES = Object.freeze({
  IN_PROGRESS: "in_progress",
  PAID: "paid",
  FAILED: "failed",
  REFUND: "refund",
});

export const PURCHASE_CREDIT_PAYMENT_STATUS_OPTIONS = Object.freeze([
  { value: PURCHASE_CREDIT_PAYMENT_STATUSES.PAID, label: "Paid" },
  { value: PURCHASE_CREDIT_PAYMENT_STATUSES.FAILED, label: "Failed" },
  { value: PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS, label: "In progress" },
  { value: PURCHASE_CREDIT_PAYMENT_STATUSES.REFUND, label: "Refund" },
]);

export const PURCHASE_CREDIT_PAYMENT_TYPES = Object.freeze({
  UPI: "upi",
  NET_BANKING: "net_banking",
  RTGS: "rtgs",
  CHEQUE: "cheque",
  CASH: "cash",
});

export const PURCHASE_CREDIT_PAYMENT_TYPE_OPTIONS = Object.freeze([
  { value: PURCHASE_CREDIT_PAYMENT_TYPES.UPI, label: "UPI" },
  { value: PURCHASE_CREDIT_PAYMENT_TYPES.NET_BANKING, label: "Net Banking" },
  { value: PURCHASE_CREDIT_PAYMENT_TYPES.RTGS, label: "RTGS" },
  { value: PURCHASE_CREDIT_PAYMENT_TYPES.CHEQUE, label: "Check" },
  { value: PURCHASE_CREDIT_PAYMENT_TYPES.CASH, label: "Cash" },
]);

export const PURCHASE_CREDIT_PAYMENT_COMPLETION_OPTIONS = Object.freeze([
  { value: "false", label: "No" },
  { value: "true", label: "Yes" },
]);
