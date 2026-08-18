import * as Yup from "yup";

import { PRODUCT_VALIDATION_MESSAGES as MESSAGES } from "@Forms/product/product.validation.messages";
import {
  PRODUCT_CODE_MAX_LENGTH,
  PRODUCT_CODE_MIN_LENGTH,
  PRODUCT_DESCRIPTION_MAX_LENGTH,
  PRODUCT_DESCRIPTION_MIN_LENGTH,
  PRODUCT_DISCOUNT_AMOUNT_MAX,
  PRODUCT_DISCOUNT_AMOUNT_MIN,
  PRODUCT_DISCOUNT_PERCENTAGE_MIN,
  PRODUCT_DISCOUNT_PERCENTAGE_MAX,
  PRODUCT_MODEL_NUMBER_MAX_LENGTH,
  PRODUCT_MODEL_NUMBER_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_PRICE_DECIMAL_PLACES,
  PRODUCT_PURCHASE_PRICE_MAX,
  PRODUCT_PURCHASE_PRICE_MIN,
  PRODUCT_SALE_PRICE_MAX,
  PRODUCT_SALE_PRICE_MIN,
  PRODUCT_SUPPORTED_CATEGORIES,
  PRODUCT_SUPPORTED_GST_RATES,
} from "@Forms/product/product.validation.constants";

const optionalNumber = (typeError) =>
  Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" || originalValue === null ? undefined : value,
    )
    .typeError(typeError)
    .nullable()
    .optional();

const decimalPlaceCount = (value) => {
  const [coefficient, exponentValue = "0"] = String(value)
    .toLowerCase()
    .split("e");
  const coefficientDecimals = coefficient.split(".")[1]?.length ?? 0;
  const exponent = Number(exponentValue);

  return Math.max(0, coefficientDecimals - exponent);
};

const commercialNumber = (typeError, decimalError) =>
  optionalNumber(typeError).test(
    "decimal-places",
    decimalError,
    function hasSupportedPrecision(value) {
      if (value === undefined || value === null) return true;

      return decimalPlaceCount(value) <= PRODUCT_PRICE_DECIMAL_PLACES;
    },
  );

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
    .trim()
    .required(MESSAGES.AGENCY_REQUIRED),
  purchasePrice: commercialNumber(
    MESSAGES.PURCHASE_PRICE_NUMBER,
    MESSAGES.PURCHASE_PRICE_DECIMALS,
  )
    .min(PRODUCT_PURCHASE_PRICE_MIN, MESSAGES.PURCHASE_PRICE_MIN)
    .max(PRODUCT_PURCHASE_PRICE_MAX, MESSAGES.PURCHASE_PRICE_MAX),
  salePrice: commercialNumber(
    MESSAGES.SALE_PRICE_NUMBER,
    MESSAGES.SALE_PRICE_DECIMALS,
  )
    .min(PRODUCT_SALE_PRICE_MIN, MESSAGES.SALE_PRICE_MIN)
    .max(PRODUCT_SALE_PRICE_MAX, MESSAGES.SALE_PRICE_MAX),
  gstPercentage: optionalNumber(MESSAGES.GST_NUMBER).oneOf(
    PRODUCT_SUPPORTED_GST_RATES,
    MESSAGES.GST_INVALID,
  ),
  discountAmountMin: commercialNumber(
    MESSAGES.DISCOUNT_AMOUNT_NUMBER,
    MESSAGES.DISCOUNT_AMOUNT_DECIMALS,
  )
    .min(PRODUCT_DISCOUNT_AMOUNT_MIN, MESSAGES.DISCOUNT_AMOUNT_MIN)
    .max(PRODUCT_DISCOUNT_AMOUNT_MAX, MESSAGES.DISCOUNT_AMOUNT_LIMIT)
    .test(
      "discount-amount-requires-sale-price",
      MESSAGES.DISCOUNT_AMOUNT_REQUIRES_SALE_PRICE,
      function requiresSalePrice(value) {
        return !value || Number(this.parent.salePrice) > 0;
      },
    )
    .test(
      "discount-amount-max",
      MESSAGES.DISCOUNT_AMOUNT_MAX,
      function doesNotExceedSalePrice(value) {
        return !value || value <= Number(this.parent.salePrice);
      },
    ),
  discountAmountMax: commercialNumber(
    MESSAGES.DISCOUNT_AMOUNT_NUMBER,
    MESSAGES.DISCOUNT_AMOUNT_DECIMALS,
  )
    .min(PRODUCT_DISCOUNT_AMOUNT_MIN, MESSAGES.DISCOUNT_AMOUNT_MIN)
    .max(PRODUCT_DISCOUNT_AMOUNT_MAX, MESSAGES.DISCOUNT_AMOUNT_LIMIT)
    .test(
      "discount-amount-requires-sale-price",
      MESSAGES.DISCOUNT_AMOUNT_REQUIRES_SALE_PRICE,
      function requiresSalePrice(value) {
        return !value || Number(this.parent.salePrice) > 0;
      },
    )
    .test(
      "discount-amount-max",
      MESSAGES.DISCOUNT_AMOUNT_MAX,
      function doesNotExceedSalePrice(value) {
        return !value || value <= Number(this.parent.salePrice);
      },
    )
    .test(
      "discount-amount-range",
      MESSAGES.DISCOUNT_AMOUNT_RANGE,
      function hasValidRange(value) {
        const minimum = this.parent.discountAmountMin;
        return value === undefined || minimum === undefined || value >= minimum;
      },
    ),
  discountPercentageMin: commercialNumber(
    MESSAGES.DISCOUNT_PERCENTAGE_NUMBER,
    MESSAGES.DISCOUNT_PERCENTAGE_DECIMALS,
  )
    .min(
      PRODUCT_DISCOUNT_PERCENTAGE_MIN,
      MESSAGES.DISCOUNT_PERCENTAGE_RANGE,
    )
    .max(
      PRODUCT_DISCOUNT_PERCENTAGE_MAX,
      MESSAGES.DISCOUNT_PERCENTAGE_RANGE,
    )
    .test(
      "discount-percentage-requires-sale-price",
      MESSAGES.DISCOUNT_PERCENTAGE_REQUIRES_SALE_PRICE,
      function requiresSalePrice(value) {
        return !value || Number(this.parent.salePrice) > 0;
      },
    ),
  discountPercentageMax: commercialNumber(
    MESSAGES.DISCOUNT_PERCENTAGE_NUMBER,
    MESSAGES.DISCOUNT_PERCENTAGE_DECIMALS,
  )
    .min(
      PRODUCT_DISCOUNT_PERCENTAGE_MIN,
      MESSAGES.DISCOUNT_PERCENTAGE_RANGE,
    )
    .max(
      PRODUCT_DISCOUNT_PERCENTAGE_MAX,
      MESSAGES.DISCOUNT_PERCENTAGE_RANGE,
    )
    .test(
      "discount-percentage-requires-sale-price",
      MESSAGES.DISCOUNT_PERCENTAGE_REQUIRES_SALE_PRICE,
      function requiresSalePrice(value) {
        return !value || Number(this.parent.salePrice) > 0;
      },
    )
    .test(
      "discount-percentage-range",
      MESSAGES.DISCOUNT_PERCENTAGE_ORDER,
      function hasValidRange(value) {
        const minimum = this.parent.discountPercentageMin;
        return value === undefined || minimum === undefined || value >= minimum;
      },
    ),
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
