import { endOfDay, isBefore, isValid, parseISO, startOfDay } from "date-fns";
import * as Yup from "yup";

import {
  PURCHASE_CREDIT_ACKNOWLEDGEMENT_ID_MAX_LENGTH,
  PURCHASE_CREDIT_ACKNOWLEDGEMENT_ID_MIN_LENGTH,
  PURCHASE_CREDIT_AMOUNT_MAX,
  PURCHASE_CREDIT_AMOUNT_MIN,
  PURCHASE_CREDIT_NOTES_MAX_LENGTH,
  PURCHASE_CREDIT_NOTES_MIN_LENGTH,
  PURCHASE_CREDIT_REFERENCE_ID_MAX_LENGTH,
  PURCHASE_CREDIT_REFERENCE_ID_MIN_LENGTH,
  PURCHASE_CREDIT_STOCK_MAX,
  PURCHASE_CREDIT_STOCK_MIN,
  PURCHASE_CREDIT_SUPPORTED_PAYMENT_STATUSES,
  PURCHASE_CREDIT_SUPPORTED_PAYMENT_TYPES,
} from "@Forms/purchaseCredit/purchaseCredit.validation.constants";
import { PURCHASE_CREDIT_VALIDATION_MESSAGES as MESSAGES } from "@Forms/purchaseCredit/purchaseCredit.validation.messages";

const emptyToUndefined = (value, originalValue) =>
  originalValue === "" || originalValue === null ? undefined : value;

const optionalText = (min, max, minMessage, maxMessage) =>
  Yup.string()
    .trim()
    .transform((value) => value || undefined)
    .min(min, minMessage)
    .max(max, maxMessage)
    .optional();

const requiredAmount = Yup.number()
  .transform(emptyToUndefined)
  .typeError(MESSAGES.PAYMENT_AMOUNT_NUMBER)
  .min(PURCHASE_CREDIT_AMOUNT_MIN, MESSAGES.PAYMENT_AMOUNT_MIN)
  .max(PURCHASE_CREDIT_AMOUNT_MAX, MESSAGES.PAYMENT_AMOUNT_MAX)
  .required(MESSAGES.PAYMENT_AMOUNT_REQUIRED);

const dateIsTodayOrEarlier = (value) => {
  if (!value) return true;
  const parsed = typeof value === "string" ? parseISO(value) : value;
  return isValid(parsed) && !isBefore(endOfDay(new Date()), parsed);
};

const dateIsTodayOrLater = (value) => {
  if (!value) return true;
  const parsed = typeof value === "string" ? parseISO(value) : value;
  return isValid(parsed) && !isBefore(parsed, startOfDay(new Date()));
};

const pastOrTodayDate = (invalid, future, required = null) => {
  const schema = Yup.date()
    .transform(emptyToUndefined)
    .typeError(invalid)
    .test("not-in-future", future, dateIsTodayOrEarlier);

  return required ? schema.required(required) : schema.optional();
};

const todayOrFutureDate = (invalid, past, required = null) => {
  const schema = Yup.date()
    .transform(emptyToUndefined)
    .typeError(invalid)
    .test("not-in-past", past, dateIsTodayOrLater);

  return required ? schema.required(required) : schema.optional();
};

const notesSchema = optionalText(
  PURCHASE_CREDIT_NOTES_MIN_LENGTH,
  PURCHASE_CREDIT_NOTES_MAX_LENGTH,
  MESSAGES.NOTES_MIN,
  MESSAGES.NOTES_MAX,
);

const filesSchema = Yup.array().of(Yup.mixed()).default([]);

export const createPurchaseCreditValidationSchema = ({ isEditing = false } = {}) => Yup.object({
  supplier: Yup.string().trim().required(MESSAGES.SUPPLIER_REQUIRED),
  products: Yup.array()
    .of(
      Yup.object({
        product: Yup.string().trim().required(MESSAGES.PRODUCT_REQUIRED),
        stock: Yup.number()
          .transform(emptyToUndefined)
          .typeError(MESSAGES.STOCK_NUMBER)
          .integer(MESSAGES.STOCK_INTEGER)
          .min(PURCHASE_CREDIT_STOCK_MIN, MESSAGES.STOCK_MIN)
          .max(PURCHASE_CREDIT_STOCK_MAX, MESSAGES.STOCK_MAX)
          .required(MESSAGES.STOCK_REQUIRED),
      }),
    )
    .min(1, MESSAGES.PRODUCTS_REQUIRED)
    .test(
      "unique-products",
      MESSAGES.PRODUCTS_UNIQUE,
      (products = []) =>
        new Set(products.map((item) => item.product).filter(Boolean)).size ===
        products.map((item) => item.product).filter(Boolean).length,
    ),
  purchaseCreditAt: pastOrTodayDate(
    MESSAGES.PURCHASE_CREDIT_AT_INVALID,
    MESSAGES.PURCHASE_CREDIT_AT_FUTURE,
    MESSAGES.PURCHASE_CREDIT_AT_REQUIRED,
  ),
  purchaseCreditAmount: Yup.number()
    .transform(emptyToUndefined)
    .typeError(MESSAGES.PURCHASE_CREDIT_AMOUNT_NUMBER)
    .min(PURCHASE_CREDIT_AMOUNT_MIN, MESSAGES.PURCHASE_CREDIT_AMOUNT_MIN)
    .max(PURCHASE_CREDIT_AMOUNT_MAX, MESSAGES.PURCHASE_CREDIT_AMOUNT_MAX)
    .required(MESSAGES.PURCHASE_CREDIT_AMOUNT_REQUIRED),
  expectedDeliveryDate: todayOrFutureDate(
    MESSAGES.EXPECTED_DELIVERY_DATE_INVALID,
    MESSAGES.EXPECTED_DELIVERY_DATE_PAST,
  ),
  acknowledgementId: optionalText(
    PURCHASE_CREDIT_ACKNOWLEDGEMENT_ID_MIN_LENGTH,
    PURCHASE_CREDIT_ACKNOWLEDGEMENT_ID_MAX_LENGTH,
    MESSAGES.ACKNOWLEDGEMENT_ID_MIN,
    MESSAGES.ACKNOWLEDGEMENT_ID_MAX,
  ),
  acknowledgementReceipts: filesSchema,
  payments: Yup.array()
    .of(
      Yup.object({
        paymentStatus: Yup.string()
          .oneOf(
            PURCHASE_CREDIT_SUPPORTED_PAYMENT_STATUSES,
            MESSAGES.PAYMENT_STATUS_INVALID,
          )
          .required(MESSAGES.PAYMENT_STATUS_REQUIRED),
        amount: requiredAmount,
        paymentType: Yup.string()
          .oneOf(
            PURCHASE_CREDIT_SUPPORTED_PAYMENT_TYPES,
            MESSAGES.PAYMENT_TYPE_INVALID,
          )
          .required(MESSAGES.PAYMENT_TYPE_REQUIRED),
        referenceId: optionalText(
          PURCHASE_CREDIT_REFERENCE_ID_MIN_LENGTH,
          PURCHASE_CREDIT_REFERENCE_ID_MAX_LENGTH,
          MESSAGES.REFERENCE_ID_MIN,
          MESSAGES.REFERENCE_ID_MAX,
        ),
        paymentDate: pastOrTodayDate(
          MESSAGES.PAYMENT_DATE_INVALID,
          MESSAGES.PAYMENT_DATE_FUTURE,
          MESSAGES.PAYMENT_DATE_REQUIRED,
        ),
        receivedPaymentDate: pastOrTodayDate(
          MESSAGES.RECEIVED_PAYMENT_DATE_INVALID,
          MESSAGES.RECEIVED_PAYMENT_DATE_FUTURE,
          isEditing ? MESSAGES.RECEIVED_PAYMENT_DATE_REQUIRED : null,
        ),
        notes: notesSchema,
        paymentReceipts: filesSchema,
      }),
    )
    .min(1, MESSAGES.PAYMENTS_REQUIRED),
  paymentPlanning: Yup.array().of(
    Yup.object({
      remindingDate: todayOrFutureDate(
        MESSAGES.REMINDING_DATE_INVALID,
        MESSAGES.REMINDING_DATE_PAST,
      ),
      amount: requiredAmount,
      paymentType: Yup.string()
        .oneOf(
          PURCHASE_CREDIT_SUPPORTED_PAYMENT_TYPES,
          MESSAGES.PAYMENT_TYPE_INVALID,
        )
        .required(MESSAGES.PAYMENT_TYPE_REQUIRED),
      isPaymentCompleted: Yup.boolean().required(
        MESSAGES.PAYMENT_COMPLETION_REQUIRED,
      ),
      notes: notesSchema,
    }),
  ),
});

export const purchaseCreditValidationSchema = createPurchaseCreditValidationSchema();
