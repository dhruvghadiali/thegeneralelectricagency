import * as Yup from "yup";

import { SALES_ORDER_VALIDATION_MESSAGES } from "@Forms/salesOrder/salesOrder.validation.messages";

export const salesOrderValidationSchema = Yup.object({
  customer: Yup.string()
    .trim()
    .required(SALES_ORDER_VALIDATION_MESSAGES.CUSTOMER_REQUIRED),
});
