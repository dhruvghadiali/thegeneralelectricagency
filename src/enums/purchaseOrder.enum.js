export const PAYMENT_STATUSES = Object.freeze({
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
});

export const PAYMENT_STATUS_OPTIONS = Object.freeze([
  { value: PAYMENT_STATUSES.PENDING, label: "Pending" },
  { value: PAYMENT_STATUSES.PAID, label: "Paid" },
  { value: PAYMENT_STATUSES.FAILED, label: "Failed" },
  { value: PAYMENT_STATUSES.CANCELLED, label: "Cancelled" },
  { value: PAYMENT_STATUSES.REFUNDED, label: "Refunded" },
]);

export const PAYMENT_MODES = Object.freeze({
  UPI: "upi",
  CASH: "cash",
  NET_BANKING: "net_banking",
  CHEQUE: "cheque",
});

export const PAYMENT_MODE_OPTIONS = Object.freeze([
  { value: PAYMENT_MODES.UPI, label: "UPI" },
  { value: PAYMENT_MODES.CASH, label: "Cash" },
  { value: PAYMENT_MODES.NET_BANKING, label: "Net banking" },
  { value: PAYMENT_MODES.CHEQUE, label: "Cheque" },
]);
