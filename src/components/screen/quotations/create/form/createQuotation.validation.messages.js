import {
  CREATE_QUOTATION_ADDRESS_MAX_LENGTH,
  CREATE_QUOTATION_ADDRESS_MIN_LENGTH,
  CREATE_QUOTATION_COMPANY_NAME_MAX_LENGTH,
  CREATE_QUOTATION_COMPANY_NAME_MIN_LENGTH,
  CREATE_QUOTATION_EMAIL_MAX_LENGTH,
  CREATE_QUOTATION_EMAIL_MIN_LENGTH,
  QUOTATION_PRODUCT_DESCRIPTION_MAX_LENGTH,
  QUOTATION_PRODUCT_NAME_MAX_LENGTH,
  QUOTATION_PRODUCT_QUANTITY_MAX,
  QUOTATION_PRODUCT_QUANTITY_MIN,
  QUOTATION_PRODUCT_SELLING_PRICE_MAX,
} from "@screenComponent/quotations/create/form/createQuotation.validation.constants";

export const CREATE_QUOTATION_VALIDATION_MESSAGES = Object.freeze({
  COMPANY_NAME_REQUIRED: "Company name is required",
  COMPANY_NAME_MIN: `Company name must be at least ${CREATE_QUOTATION_COMPANY_NAME_MIN_LENGTH} character`,
  COMPANY_NAME_MAX: `Company name must be ${CREATE_QUOTATION_COMPANY_NAME_MAX_LENGTH} characters or fewer`,
  ADDRESS_REQUIRED: "Address is required",
  ADDRESS_MIN: `Address must be at least ${CREATE_QUOTATION_ADDRESS_MIN_LENGTH} characters`,
  ADDRESS_MAX: `Address must be ${CREATE_QUOTATION_ADDRESS_MAX_LENGTH} characters or fewer`,
  EMAIL_INVALID: "Enter a valid email address",
  EMAIL_MIN: `Email address must be at least ${CREATE_QUOTATION_EMAIL_MIN_LENGTH} characters`,
  EMAIL_MAX: `Email address must be ${CREATE_QUOTATION_EMAIL_MAX_LENGTH} characters or fewer`,
  PHONE_INVALID: "Enter a valid 10-digit phone number",
  GST_INVALID: "Enter a valid 15-character GST number",
});

export const QUOTATION_PRODUCT_VALIDATION_MESSAGES = Object.freeze({
  PRODUCT_REQUIRED: "Product is required",
  PRODUCT_MAX: `Product must be ${QUOTATION_PRODUCT_NAME_MAX_LENGTH} characters or fewer`,
  SELLING_PRICE_REQUIRED: "Selling price is required",
  SELLING_PRICE_NUMBER: "Selling price must be a valid number",
  SELLING_PRICE_POSITIVE: "Selling price must be greater than 0",
  SELLING_PRICE_MAX: `Selling price cannot exceed ₹${QUOTATION_PRODUCT_SELLING_PRICE_MAX.toLocaleString("en-IN")}`,
  QUANTITY_REQUIRED: "Quantity is required",
  QUANTITY_NUMBER: "Quantity must be a valid number",
  QUANTITY_INTEGER: "Quantity must be a whole number",
  QUANTITY_RANGE: `Quantity must be between ${QUOTATION_PRODUCT_QUANTITY_MIN} and ${QUOTATION_PRODUCT_QUANTITY_MAX.toLocaleString("en-IN")}`,
  DISCOUNT_NUMBER: "Discount must be a valid number",
  DISCOUNT_MIN: "Discount cannot be negative",
  DISCOUNT_MAX: "Discount cannot exceed the selling price",
  DESCRIPTION_MAX: `Description must be ${QUOTATION_PRODUCT_DESCRIPTION_MAX_LENGTH.toLocaleString("en-IN")} characters or fewer`,
});
