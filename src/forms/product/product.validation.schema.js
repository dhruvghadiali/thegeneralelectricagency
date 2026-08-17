import * as Yup from "yup";

import { PRODUCT_VALIDATION_MESSAGES as MESSAGES } from "@Forms/product/product.validation.messages";
import {
  PRODUCT_CODE_MAX_LENGTH,
  PRODUCT_CODE_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_MODEL_NUMBER_MAX_LENGTH,
  PRODUCT_MODEL_NUMBER_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_SUPPORTED_AGENCIES,
  PRODUCT_SUPPORTED_CATEGORIES,
} from "@Forms/product/product.validation.constants";

export const productValidationSchema = Yup.object({
  productCode: Yup.string()
    .trim()
    .min(PRODUCT_CODE_MIN_LENGTH, MESSAGES.PRODUCT_CODE_MIN)
    .max(PRODUCT_CODE_MAX_LENGTH, MESSAGES.PRODUCT_CODE_MAX)
    .required(MESSAGES.PRODUCT_CODE_REQUIRED),
  name: Yup.string()
    .trim()
    .min(PRODUCT_NAME_MIN_LENGTH, MESSAGES.PRODUCT_NAME_MIN)
    .max(PRODUCT_NAME_MAX_LENGTH, MESSAGES.PRODUCT_NAME_MAX)
    .required(MESSAGES.PRODUCT_NAME_REQUIRED),
  category: Yup.string()
    .oneOf(PRODUCT_SUPPORTED_CATEGORIES, MESSAGES.CATEGORY_INVALID)
    .required(MESSAGES.CATEGORY_REQUIRED),
  agency: Yup.string()
    .oneOf(PRODUCT_SUPPORTED_AGENCIES, MESSAGES.AGENCY_INVALID)
    .required(MESSAGES.AGENCY_REQUIRED),
  modelNumber: Yup.string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .min(PRODUCT_MODEL_NUMBER_MIN_LENGTH, MESSAGES.MODEL_NUMBER_MIN)
    .max(PRODUCT_MODEL_NUMBER_MAX_LENGTH, MESSAGES.MODEL_NUMBER_MAX),
  description: Yup.string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .min(PRODUCT_DESCRIPTION_MIN_LENGTH, MESSAGES.DESCRIPTION_MIN)
    .max(PRODUCT_DESCRIPTION_MAX_LENGTH, MESSAGES.DESCRIPTION_MAX),
});
