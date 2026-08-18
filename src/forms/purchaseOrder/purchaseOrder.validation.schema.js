import * as Yup from "yup";

import {
  PAYMENT_REFERENCE_NUMBER_MAX_LENGTH,
  PURCHASE_ACTUAL_PAID_AMOUNT_MIN,
  PURCHASE_AMOUNT_DECIMAL_PLACES,
  PURCHASE_AMOUNT_MAX,
  PURCHASE_AMOUNT_MIN,
  PURCHASE_GST_AMOUNT_MIN,
  PURCHASE_ORDER_PDF_MAX_LENGTH,
  PURCHASE_ORDER_PDF_MIN_LENGTH,
  PURCHASE_ORDER_PDF_URL_PATTERN,
  PURCHASE_PAYMENTS_MAX,
  PURCHASE_QUANTITY_MAX,
  PURCHASE_QUANTITY_MIN,
  PURCHASE_STOCKS_MAX,
  PURCHASE_SUPPORTED_GST_RATES,
  PURCHASE_SUPPORTED_PAYMENT_MODES,
  PURCHASE_SUPPORTED_PAYMENT_STATUSES,
} from "@Forms/purchaseOrder/purchaseOrder.validation.constants";
import { PURCHASE_ORDER_VALIDATION_MESSAGES as MESSAGES } from "@Forms/purchaseOrder/purchaseOrder.validation.messages";

const emptyToUndefined = (value, originalValue) =>
  originalValue === "" || originalValue === null ? undefined : value;

const decimalPlaceCount = (value) => {
  const [coefficient, exponentValue = "0"] = String(value)
    .toLowerCase()
    .split("e");
  const coefficientDecimals = coefficient.split(".")[1]?.length ?? 0;
  const exponent = Number(exponentValue);

  return Math.max(0, coefficientDecimals - exponent);
};

const requiredAmount = ({ type, min, max, decimals, required }) =>
  Yup.number()
    .transform(emptyToUndefined)
    .typeError(type)
    .min(PURCHASE_AMOUNT_MIN, min)
    .max(PURCHASE_AMOUNT_MAX, max)
    .test(
      "decimal-places",
      decimals,
      (value) =>
        value === undefined ||
        decimalPlaceCount(value) <= PURCHASE_AMOUNT_DECIMAL_PLACES,
    )
    .required(required);

const optionalDate = (typeError) =>
  Yup.date().transform(emptyToUndefined).typeError(typeError).optional();

export const purchaseOrderValidationSchema = Yup.object({
  product: Yup.string().required(MESSAGES.PRODUCT_REQUIRED),
  supplier: Yup.string().required(MESSAGES.SUPPLIER_REQUIRED),
  purchaseDate: Yup.date()
    .typeError(MESSAGES.PURCHASE_DATE_INVALID)
    .required(MESSAGES.PURCHASE_DATE_REQUIRED),
  expectedDeliveryDate: Yup.date()
    .typeError(MESSAGES.EXPECTED_DELIVERY_DATE_INVALID)
    .min(Yup.ref("purchaseDate"), MESSAGES.EXPECTED_DELIVERY_DATE_ORDER)
    .required(MESSAGES.EXPECTED_DELIVERY_DATE_REQUIRED),
  actualDeliveryDate: optionalDate(MESSAGES.ACTUAL_DELIVERY_DATE_INVALID).min(
    Yup.ref("purchaseDate"),
    MESSAGES.ACTUAL_DELIVERY_DATE_ORDER,
  ),
  quantityPurchased: Yup.number()
    .transform(emptyToUndefined)
    .typeError(MESSAGES.QUANTITY_NUMBER)
    .integer(MESSAGES.QUANTITY_INTEGER)
    .min(PURCHASE_QUANTITY_MIN, MESSAGES.QUANTITY_MIN)
    .max(PURCHASE_QUANTITY_MAX, MESSAGES.QUANTITY_MAX)
    .required(MESSAGES.QUANTITY_REQUIRED),
  billAmount: requiredAmount({
    type: MESSAGES.BILL_AMOUNT_NUMBER,
    min: MESSAGES.BILL_AMOUNT_MIN,
    max: MESSAGES.BILL_AMOUNT_MAX,
    decimals: MESSAGES.BILL_AMOUNT_DECIMALS,
    required: MESSAGES.BILL_AMOUNT_REQUIRED,
  }),
  actualPaidAmount: Yup.number()
    .transform(emptyToUndefined)
    .typeError(MESSAGES.PAID_AMOUNT_NUMBER)
    .min(PURCHASE_ACTUAL_PAID_AMOUNT_MIN, MESSAGES.PAID_AMOUNT_MIN)
    .max(PURCHASE_AMOUNT_MAX, MESSAGES.PAID_AMOUNT_MAX)
    .test(
      "decimal-places",
      MESSAGES.PAID_AMOUNT_DECIMALS,
      (value) =>
        value === undefined ||
        decimalPlaceCount(value) <= PURCHASE_AMOUNT_DECIMAL_PLACES,
    )
    .max(Yup.ref("billAmount"), MESSAGES.PAID_AMOUNT_BILL_LIMIT)
    .optional(),
  gstPercentage: Yup.number()
    .transform(emptyToUndefined)
    .oneOf(PURCHASE_SUPPORTED_GST_RATES, MESSAGES.GST_RATE_INVALID)
    .required(MESSAGES.GST_RATE_REQUIRED),
  gstAmount: Yup.number()
    .min(PURCHASE_GST_AMOUNT_MIN, MESSAGES.GST_AMOUNT_MIN)
    .max(PURCHASE_AMOUNT_MAX, MESSAGES.GST_AMOUNT_MAX)
    .required(MESSAGES.GST_AMOUNT_REQUIRED),
  purchaseOrderPdf: Yup.string()
    .trim()
    .min(PURCHASE_ORDER_PDF_MIN_LENGTH, MESSAGES.PURCHASE_ORDER_PDF_MIN)
    .max(PURCHASE_ORDER_PDF_MAX_LENGTH, MESSAGES.PURCHASE_ORDER_PDF_MAX)
    .url(MESSAGES.PURCHASE_ORDER_PDF_URL)
    .matches(PURCHASE_ORDER_PDF_URL_PATTERN, MESSAGES.PURCHASE_ORDER_PDF_URL)
    .required(MESSAGES.PURCHASE_ORDER_PDF_REQUIRED),
  stocks: Yup.array()
    .of(Yup.string().required(MESSAGES.STOCK_ID_REQUIRED))
    .max(PURCHASE_STOCKS_MAX, MESSAGES.STOCKS_MAX)
    .test(
      "unique-stocks",
      MESSAGES.STOCKS_UNIQUE,
      (stocks = []) => new Set(stocks).size === stocks.length,
    ),
  payments: Yup.array()
    .of(
      Yup.object({
        paymentStatus: Yup.string()
          .oneOf(
            PURCHASE_SUPPORTED_PAYMENT_STATUSES,
            MESSAGES.PAYMENT_STATUS_INVALID,
          )
          .required(MESSAGES.PAYMENT_STATUS_REQUIRED),
        paymentAmount: requiredAmount({
          type: MESSAGES.PAYMENT_AMOUNT_NUMBER,
          min: MESSAGES.PAYMENT_AMOUNT_MIN,
          max: MESSAGES.PAYMENT_AMOUNT_MAX,
          decimals: MESSAGES.PAYMENT_AMOUNT_DECIMALS,
          required: MESSAGES.PAYMENT_AMOUNT_REQUIRED,
        }),
        paymentDate: Yup.date()
          .transform(emptyToUndefined)
          .typeError(MESSAGES.PAYMENT_DATE_INVALID)
          .required(MESSAGES.PAYMENT_DATE_REQUIRED),
        expectedPaymentDate: Yup.date()
          .transform(emptyToUndefined)
          .typeError(MESSAGES.EXPECTED_PAYMENT_DATE_INVALID)
          .required(MESSAGES.EXPECTED_PAYMENT_DATE_REQUIRED),
        paymentMode: Yup.string()
          .transform(emptyToUndefined)
          .oneOf(
            PURCHASE_SUPPORTED_PAYMENT_MODES,
            MESSAGES.PAYMENT_MODE_INVALID,
          )
          .required(MESSAGES.PAYMENT_MODE_REQUIRED),
        paymentReferenceNumber: Yup.string()
          .trim()
          .max(
            PAYMENT_REFERENCE_NUMBER_MAX_LENGTH,
            MESSAGES.PAYMENT_REFERENCE_MAX,
          ),
      }),
    )
    .max(PURCHASE_PAYMENTS_MAX, MESSAGES.PAYMENTS_MAX),
});
