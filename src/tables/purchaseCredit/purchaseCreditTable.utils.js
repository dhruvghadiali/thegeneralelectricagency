import {
  PURCHASE_CREDIT_PAYMENT_STATUS_OPTIONS,
  PURCHASE_CREDIT_PAYMENT_STATUSES,
} from "@Enums";

export const PURCHASE_CREDIT_STATUS_VARIANTS = Object.freeze({
  [PURCHASE_CREDIT_PAYMENT_STATUSES.PAID]: "success",
  [PURCHASE_CREDIT_PAYMENT_STATUSES.FAILED]: "destructive",
  [PURCHASE_CREDIT_PAYMENT_STATUSES.IN_PROGRESS]: "warning",
  [PURCHASE_CREDIT_PAYMENT_STATUSES.REFUND]: "secondary",
});

export function purchaseCreditPaymentStatusLabel(value) {
  return (
    PURCHASE_CREDIT_PAYMENT_STATUS_OPTIONS.find(
      (option) => option.value === value,
    )?.label ?? "In progress"
  );
}
