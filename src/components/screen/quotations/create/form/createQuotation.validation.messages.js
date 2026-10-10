import {
  CREATE_QUOTATION_ADDRESS_MAX_LENGTH,
  CREATE_QUOTATION_ADDRESS_MIN_LENGTH,
  CREATE_QUOTATION_COMPANY_NAME_MAX_LENGTH,
  CREATE_QUOTATION_COMPANY_NAME_MIN_LENGTH,
  CREATE_QUOTATION_EMAIL_MAX_LENGTH,
  CREATE_QUOTATION_EMAIL_MIN_LENGTH,
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
