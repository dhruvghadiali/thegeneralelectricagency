import { AGENCIES, PRODUCT_CATEGORIES } from "@Enums";

export const PRODUCT_CODE_MIN_LENGTH = 2;
export const PRODUCT_CODE_MAX_LENGTH = 50;
export const PRODUCT_NAME_MIN_LENGTH = 2;
export const PRODUCT_NAME_MAX_LENGTH = 150;
export const PRODUCT_MODEL_NUMBER_MIN_LENGTH = 2;
export const PRODUCT_MODEL_NUMBER_MAX_LENGTH = 100;
export const PRODUCT_DESCRIPTION_MIN_LENGTH = 3;
export const PRODUCT_DESCRIPTION_MAX_LENGTH = 2000;

export const PRODUCT_SUPPORTED_CATEGORIES = Object.freeze(
  Object.values(PRODUCT_CATEGORIES),
);

export const PRODUCT_SUPPORTED_AGENCIES = Object.freeze(
  Object.values(AGENCIES),
);
