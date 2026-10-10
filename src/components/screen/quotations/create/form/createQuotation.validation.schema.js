import * as Yup from "yup";

import {
  CREATE_QUOTATION_ADDRESS_MAX_LENGTH,
  CREATE_QUOTATION_ADDRESS_MIN_LENGTH,
  CREATE_QUOTATION_COMPANY_NAME_MAX_LENGTH,
  CREATE_QUOTATION_COMPANY_NAME_MIN_LENGTH,
  CREATE_QUOTATION_EMAIL_MAX_LENGTH,
  CREATE_QUOTATION_EMAIL_MIN_LENGTH,
  CREATE_QUOTATION_GST_PATTERN,
  CREATE_QUOTATION_PHONE_PATTERN,
} from "@screenComponent/quotations/create/form/createQuotation.validation.constants";
import { CREATE_QUOTATION_VALIDATION_MESSAGES } from "@screenComponent/quotations/create/form/createQuotation.validation.messages";

export const createQuotationValidationSchema = Yup.object({
  companyName: Yup.string()
    .trim()
    .min(
      CREATE_QUOTATION_COMPANY_NAME_MIN_LENGTH,
      CREATE_QUOTATION_VALIDATION_MESSAGES.COMPANY_NAME_MIN,
    )
    .max(
      CREATE_QUOTATION_COMPANY_NAME_MAX_LENGTH,
      CREATE_QUOTATION_VALIDATION_MESSAGES.COMPANY_NAME_MAX,
    )
    .required(CREATE_QUOTATION_VALIDATION_MESSAGES.COMPANY_NAME_REQUIRED),
  address: Yup.string()
    .trim()
    .min(
      CREATE_QUOTATION_ADDRESS_MIN_LENGTH,
      CREATE_QUOTATION_VALIDATION_MESSAGES.ADDRESS_MIN,
    )
    .max(
      CREATE_QUOTATION_ADDRESS_MAX_LENGTH,
      CREATE_QUOTATION_VALIDATION_MESSAGES.ADDRESS_MAX,
    )
    .required(CREATE_QUOTATION_VALIDATION_MESSAGES.ADDRESS_REQUIRED),
  email: Yup.string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .min(
      CREATE_QUOTATION_EMAIL_MIN_LENGTH,
      CREATE_QUOTATION_VALIDATION_MESSAGES.EMAIL_MIN,
    )
    .max(
      CREATE_QUOTATION_EMAIL_MAX_LENGTH,
      CREATE_QUOTATION_VALIDATION_MESSAGES.EMAIL_MAX,
    )
    .email(CREATE_QUOTATION_VALIDATION_MESSAGES.EMAIL_INVALID),
  phoneNumber: Yup.string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .matches(
      CREATE_QUOTATION_PHONE_PATTERN,
      CREATE_QUOTATION_VALIDATION_MESSAGES.PHONE_INVALID,
    ),
  gstNumber: Yup.string()
    .trim()
    .uppercase()
    .transform((value) => (value === "" ? undefined : value))
    .matches(
      CREATE_QUOTATION_GST_PATTERN,
      CREATE_QUOTATION_VALIDATION_MESSAGES.GST_INVALID,
    ),
});
