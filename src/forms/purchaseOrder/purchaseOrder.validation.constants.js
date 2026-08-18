import {
  INDIAN_GST_RATES,
  PAYMENT_MODES,
  PAYMENT_STATUSES,
} from "@Enums";

export const PURCHASE_QUANTITY_MIN = 1;
export const PURCHASE_QUANTITY_MAX = 10_000_000;
export const PURCHASE_AMOUNT_MIN = 1;
export const PURCHASE_ACTUAL_PAID_AMOUNT_MIN = 0;
export const PURCHASE_AMOUNT_MAX = 10_000_000;
export const PURCHASE_AMOUNT_DECIMAL_PLACES = 2;
export const PURCHASE_GST_AMOUNT_MIN = 0;
export const PURCHASE_ORDER_PDF_MIN_LENGTH = 5;
export const PURCHASE_ORDER_PDF_MAX_LENGTH = 20_000;
export const PURCHASE_ORDER_PDF_URL_PATTERN = /^https?:\/\//i;
export const PURCHASE_STOCKS_MAX = 10_000;
export const PURCHASE_PAYMENTS_MAX = 100;
export const PAYMENT_REFERENCE_NUMBER_MAX_LENGTH = 200;

export const PURCHASE_SUPPORTED_GST_RATES = Object.freeze(
  Object.values(INDIAN_GST_RATES),
);

export const PURCHASE_SUPPORTED_PAYMENT_STATUSES = Object.freeze(
  Object.values(PAYMENT_STATUSES),
);

export const PURCHASE_SUPPORTED_PAYMENT_MODES = Object.freeze(
  Object.values(PAYMENT_MODES),
);
