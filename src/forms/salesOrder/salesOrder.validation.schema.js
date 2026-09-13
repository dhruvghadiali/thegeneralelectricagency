import * as Yup from "yup";

import { SALES_ORDER_VALIDATION_MESSAGES } from "@Forms/salesOrder/salesOrder.validation.messages";
import {
  SALES_ORDER_NUMBER_MIN,
  SALES_ORDER_PERCENTAGE_MAX,
} from "@Forms/salesOrder/salesOrder.validation.constants";

const requiredNumber = () =>
  Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" ? undefined : value,
    )
    .typeError(SALES_ORDER_VALIDATION_MESSAGES.NUMBER_INVALID)
    .min(
      SALES_ORDER_NUMBER_MIN,
      SALES_ORDER_VALIDATION_MESSAGES.NUMBER_NON_NEGATIVE,
    )
    .required(SALES_ORDER_VALIDATION_MESSAGES.NUMBER_REQUIRED);

const requiredPercentage = () =>
  requiredNumber().max(
    SALES_ORDER_PERCENTAGE_MAX,
    SALES_ORDER_VALIDATION_MESSAGES.PERCENTAGE_MAX,
  );

export const salesOrderValidationSchema = Yup.object({
  customer: Yup.string()
    .trim()
    .required(SALES_ORDER_VALIDATION_MESSAGES.CUSTOMER_REQUIRED),
  supplier: Yup.string()
    .trim()
    .required(SALES_ORDER_VALIDATION_MESSAGES.SUPPLIER_REQUIRED),
  products: Yup.array()
    .of(
      Yup.object({
        product: Yup.string()
          .trim()
          .required(SALES_ORDER_VALIDATION_MESSAGES.PRODUCT_REQUIRED),
        purchasePrice: requiredNumber(),
        salePrice: requiredNumber(),
        gstPercentage: requiredPercentage(),
        discountAmount: requiredNumber(),
        discountPercentage: requiredPercentage(),
        stocks: requiredNumber().integer(
          SALES_ORDER_VALIDATION_MESSAGES.STOCK_INTEGER,
        ),
      }),
    )
    .min(1, SALES_ORDER_VALIDATION_MESSAGES.PRODUCTS_REQUIRED)
    .required(SALES_ORDER_VALIDATION_MESSAGES.PRODUCTS_REQUIRED),
});
