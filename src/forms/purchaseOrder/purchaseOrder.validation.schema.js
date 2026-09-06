import * as Yup from "yup";

import {
  PURCHASE_QUANTITY_MAX,
  PURCHASE_QUANTITY_MIN,
} from "@Forms/purchaseOrder/purchaseOrder.validation.constants";
import { PURCHASE_ORDER_VALIDATION_MESSAGES as MESSAGES } from "@Forms/purchaseOrder/purchaseOrder.validation.messages";

const emptyToUndefined = (value, originalValue) =>
  originalValue === "" || originalValue === null ? undefined : value;

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
      }),
    )
    .min(1, MESSAGES.PRODUCTS_REQUIRED)
    .test("unique-products", MESSAGES.PRODUCTS_UNIQUE, (products = []) => {
      const selectedProducts = products
        .map((item) => item?.product)
        .filter(Boolean);
      return new Set(selectedProducts).size === selectedProducts.length;
    }),
});
