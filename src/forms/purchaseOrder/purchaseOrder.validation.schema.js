import * as Yup from "yup";

import { INDIAN_GST_RATES } from "@Enums";
import {
  PURCHASE_PRODUCT_AMOUNT_DECIMAL_PLACES,
  PURCHASE_PRODUCT_AMOUNT_MAX,
  PURCHASE_PRODUCT_AMOUNT_MIN,
  PURCHASE_PRODUCT_NOTES_MAX_LENGTH,
  PURCHASE_ORDER_BILL_FILE_EXTENSION,
  PURCHASE_ORDER_BILL_MIME_TYPE,
  PURCHASE_QUANTITY_MAX,
  PURCHASE_QUANTITY_MIN,
} from "@Forms/purchaseOrder/purchaseOrder.validation.constants";
import { PURCHASE_ORDER_VALIDATION_MESSAGES as MESSAGES } from "@Forms/purchaseOrder/purchaseOrder.validation.messages";

const emptyToUndefined = (value, originalValue) =>
  originalValue === "" || originalValue === null ? undefined : value;

const decimalPlaceCount = (value) => {
  const [coefficient, exponentValue = "0"] = String(value)
    .toLowerCase()
    .split("e");
  const coefficientDecimals = coefficient.split(".")[1]?.length ?? 0;
  return Math.max(0, coefficientDecimals - Number(exponentValue));
};

const requiredProductAmount = ({ type, min, max, decimals, required }) =>
  Yup.number()
    .transform(emptyToUndefined)
    .typeError(type)
    .min(PURCHASE_PRODUCT_AMOUNT_MIN, min)
    .max(PURCHASE_PRODUCT_AMOUNT_MAX, max)
    .test(
      "decimal-places",
      decimals,
      (value) =>
        value === undefined ||
        decimalPlaceCount(value) <= PURCHASE_PRODUCT_AMOUNT_DECIMAL_PLACES,
    )
    .required(required);

export const purchaseOrderValidationSchema = Yup.object({
  supplier: Yup.string().required(MESSAGES.SUPPLIER_REQUIRED),
  products: Yup.array()
    .of(
      Yup.object({
        product: Yup.string().required(MESSAGES.PRODUCT_REQUIRED),
        standaloneStock: Yup.number()
          .transform(emptyToUndefined)
          .min(0, MESSAGES.STANDALONE_STOCK_REQUIRED)
          .required(MESSAGES.STANDALONE_STOCK_REQUIRED),
        quantityPurchased: Yup.number()
          .transform(emptyToUndefined)
          .typeError(MESSAGES.QUANTITY_NUMBER)
          .integer(MESSAGES.QUANTITY_INTEGER)
          .min(PURCHASE_QUANTITY_MIN, MESSAGES.QUANTITY_MIN)
          .max(PURCHASE_QUANTITY_MAX, MESSAGES.QUANTITY_MAX)
          .max(
            Yup.ref("standaloneStock"),
            MESSAGES.QUANTITY_STANDALONE_MAX,
          )
          .required(MESSAGES.QUANTITY_REQUIRED),
        unitPrice: requiredProductAmount({
          type: MESSAGES.UNIT_PRICE_NUMBER,
          min: MESSAGES.UNIT_PRICE_MIN,
          max: MESSAGES.UNIT_PRICE_MAX,
          decimals: MESSAGES.UNIT_PRICE_DECIMALS,
          required: MESSAGES.UNIT_PRICE_REQUIRED,
        }),
        unitDiscount: requiredProductAmount({
          type: MESSAGES.UNIT_DISCOUNT_NUMBER,
          min: MESSAGES.UNIT_DISCOUNT_MIN,
          max: MESSAGES.UNIT_DISCOUNT_MAX,
          decimals: MESSAGES.UNIT_DISCOUNT_DECIMALS,
          required: MESSAGES.UNIT_DISCOUNT_REQUIRED,
        })
          .max(Yup.ref("unitPrice"), MESSAGES.UNIT_DISCOUNT_PRICE_MAX),
        unitGst: Yup.number()
          .transform(emptyToUndefined)
          .oneOf(Object.values(INDIAN_GST_RATES), MESSAGES.UNIT_GST_INVALID)
          .required(MESSAGES.UNIT_GST_REQUIRED),
        unitGstAmount: Yup.number()
          .transform(emptyToUndefined)
          .min(PURCHASE_PRODUCT_AMOUNT_MIN, MESSAGES.UNIT_GST_AMOUNT_REQUIRED)
          .required(MESSAGES.UNIT_GST_AMOUNT_REQUIRED),
        finalPrice: Yup.number()
          .transform(emptyToUndefined)
          .min(PURCHASE_PRODUCT_AMOUNT_MIN, MESSAGES.FINAL_PRICE_REQUIRED)
          .required(MESSAGES.FINAL_PRICE_REQUIRED),
        notes: Yup.string()
          .nullable()
          .transform((value, originalValue) =>
            originalValue === "" || originalValue === null
              ? null
              : value,
          )
          .trim()
          .max(PURCHASE_PRODUCT_NOTES_MAX_LENGTH, MESSAGES.NOTES_MAX),
      }),
    )
    .min(1, MESSAGES.PRODUCTS_REQUIRED)
    .test("unique-products", MESSAGES.PRODUCTS_UNIQUE, (products = []) => {
      const selectedProducts = products
        .map((item) => item?.product)
        .filter(Boolean);
      return new Set(selectedProducts).size === selectedProducts.length;
    }),
  bills: Yup.array()
    .default([])
    .test("pdf-bills", MESSAGES.BILLS_PDF_ONLY, (bills = []) =>
      bills.every(
        (bill) =>
          bill?.type === PURCHASE_ORDER_BILL_MIME_TYPE ||
          bill?.name
            ?.toLowerCase()
            .endsWith(PURCHASE_ORDER_BILL_FILE_EXTENSION),
      ),
    ),
  receivedOrCollectedBy: Yup.string().required(
    MESSAGES.RECEIVED_OR_COLLECTED_BY_REQUIRED,
  ),
});
