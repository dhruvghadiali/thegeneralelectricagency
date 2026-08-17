import {
  PRODUCT_CODE_MAX_LENGTH,
  PRODUCT_CODE_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_MODEL_NUMBER_MAX_LENGTH,
  PRODUCT_MODEL_NUMBER_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_NAME_MIN_LENGTH,
} from "@Forms/product/product.validation.constants";

export const PRODUCT_VALIDATION_MESSAGES = Object.freeze({
  PRODUCT_CODE_REQUIRED: "Product code is required",
  PRODUCT_CODE_MIN: `Product code must be at least ${PRODUCT_CODE_MIN_LENGTH} characters`,
  PRODUCT_CODE_MAX: `Product code must be ${PRODUCT_CODE_MAX_LENGTH} characters or fewer`,
  PRODUCT_NAME_REQUIRED: "Product name is required",
  PRODUCT_NAME_MIN: `Product name must be at least ${PRODUCT_NAME_MIN_LENGTH} characters`,
  PRODUCT_NAME_MAX: `Product name must be ${PRODUCT_NAME_MAX_LENGTH} characters or fewer`,
  CATEGORY_REQUIRED: "Category is required",
  CATEGORY_INVALID: "Select a supported category",
  AGENCY_REQUIRED: "Agency is required",
  AGENCY_INVALID: "Select a supported agency",
  MODEL_NUMBER_MIN: `Model number must be at least ${PRODUCT_MODEL_NUMBER_MIN_LENGTH} characters`,
  MODEL_NUMBER_MAX: `Model number must be ${PRODUCT_MODEL_NUMBER_MAX_LENGTH} characters or fewer`,
  DESCRIPTION_MIN: `Description must be at least ${PRODUCT_DESCRIPTION_MIN_LENGTH} characters`,
  DESCRIPTION_MAX: `Description must be ${PRODUCT_DESCRIPTION_MAX_LENGTH.toLocaleString()} characters or fewer`,
});
