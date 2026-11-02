import * as Yup from "yup";

import {
  PRODUCT_INFORMATION_CODE_MAX_LENGTH,
  PRODUCT_INFORMATION_CODE_MIN_LENGTH,
  PRODUCT_INFORMATION_DESCRIPTION_MAX_LENGTH,
  PRODUCT_INFORMATION_DESCRIPTION_MIN_LENGTH,
  PRODUCT_INFORMATION_HSN_CODE_MAX_LENGTH,
  PRODUCT_INFORMATION_HSN_CODE_MIN_LENGTH,
  PRODUCT_INFORMATION_MODEL_NUMBER_MAX_LENGTH,
  PRODUCT_INFORMATION_MODEL_NUMBER_MIN_LENGTH,
  PRODUCT_INFORMATION_NAME_MAX_LENGTH,
  PRODUCT_INFORMATION_NAME_MIN_LENGTH,
  PRODUCT_INFORMATION_SUPPORTED_CATEGORIES,
} from "@screenComponent/products/form/productInformation/productInformation.validation.constants";
import { PRODUCT_INFORMATION_VALIDATION_MESSAGES as MESSAGES } from "@screenComponent/products/form/productInformation/productInformation.validation.messages";

const optionalText = (minimum, maximum, minimumMessage, maximumMessage) =>
  Yup.string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .min(minimum, minimumMessage)
    .max(maximum, maximumMessage);

export const productInformationValidationSchema = Yup.object({
  productCode: Yup.string()
    .trim()
    .min(
      PRODUCT_INFORMATION_CODE_MIN_LENGTH,
      MESSAGES.PRODUCT_CODE_MIN,
    )
    .max(
      PRODUCT_INFORMATION_CODE_MAX_LENGTH,
      MESSAGES.PRODUCT_CODE_MAX,
    )
    .required(MESSAGES.PRODUCT_CODE_REQUIRED),
  name: Yup.string()
    .trim()
    .min(
      PRODUCT_INFORMATION_NAME_MIN_LENGTH,
      MESSAGES.PRODUCT_NAME_MIN,
    )
    .max(
      PRODUCT_INFORMATION_NAME_MAX_LENGTH,
      MESSAGES.PRODUCT_NAME_MAX,
    )
    .required(MESSAGES.PRODUCT_NAME_REQUIRED),
  category: Yup.string()
    .oneOf(
      PRODUCT_INFORMATION_SUPPORTED_CATEGORIES,
      MESSAGES.CATEGORY_INVALID,
    )
    .required(MESSAGES.CATEGORY_REQUIRED),
  agency: Yup.string().trim().required(MESSAGES.AGENCY_REQUIRED),
  agencyName: Yup.string().trim().optional(),
  modelNumber: optionalText(
    PRODUCT_INFORMATION_MODEL_NUMBER_MIN_LENGTH,
    PRODUCT_INFORMATION_MODEL_NUMBER_MAX_LENGTH,
    MESSAGES.MODEL_NUMBER_MIN,
    MESSAGES.MODEL_NUMBER_MAX,
  ),
  hsnCode: Yup.string()
    .trim()
    .min(
      PRODUCT_INFORMATION_HSN_CODE_MIN_LENGTH,
      MESSAGES.HSN_CODE_MIN,
    )
    .max(
      PRODUCT_INFORMATION_HSN_CODE_MAX_LENGTH,
      MESSAGES.HSN_CODE_MAX,
    )
    .required(MESSAGES.HSN_CODE_REQUIRED),
  description: optionalText(
    PRODUCT_INFORMATION_DESCRIPTION_MIN_LENGTH,
    PRODUCT_INFORMATION_DESCRIPTION_MAX_LENGTH,
    MESSAGES.DESCRIPTION_MIN,
    MESSAGES.DESCRIPTION_MAX,
  ),
});
