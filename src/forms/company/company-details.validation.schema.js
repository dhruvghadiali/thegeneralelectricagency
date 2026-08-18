import * as Yup from "yup";

import { COMPANY_DETAILS_VALIDATION_MESSAGES as MESSAGES } from "@Forms/company/company-details.validation.messages";
import {
  COMPANY_ADDRESS_MAX_LENGTH,
  COMPANY_ADDRESS_MIN_LENGTH,
  COMPANY_CONTACT_NAME_MAX_LENGTH,
  COMPANY_CONTACT_NAME_MIN_LENGTH,
  COMPANY_EMAIL_MAX_LENGTH,
  COMPANY_EMAIL_MIN_LENGTH,
  COMPANY_GST_PATTERN,
  COMPANY_MIN_ADDRESSES,
  COMPANY_NAME_MAX_LENGTH,
  COMPANY_NAME_MIN_LENGTH,
  COMPANY_PAN_PATTERN,
  COMPANY_PHONE_PATTERN,
  COMPANY_PINCODE_PATTERN,
  COMPANY_SUPPORTED_TYPES,
  COMPANY_SUPPORTED_CONTACT_POSITIONS,
  COMPANY_WEBSITE_MAX_LENGTH,
  COMPANY_WEBSITE_MIN_LENGTH,
  COMPANY_WEBSITE_PROTOCOL_PATTERN,
} from "@Forms/company/company-details.validation.constants";

const contactPersonSchema = Yup.object({
  id: Yup.string().nullable().notRequired(),
  contact_person_name: Yup.string()
    .trim()
    .min(COMPANY_CONTACT_NAME_MIN_LENGTH, MESSAGES.CONTACT_NAME_MIN)
    .max(COMPANY_CONTACT_NAME_MAX_LENGTH, MESSAGES.CONTACT_NAME_MAX)
    .required(MESSAGES.CONTACT_NAME_REQUIRED),
  contact_person_mobile_number: Yup.string()
    .trim()
    .matches(COMPANY_PHONE_PATTERN, MESSAGES.CONTACT_MOBILE_INVALID)
    .required(MESSAGES.CONTACT_MOBILE_REQUIRED),
  contact_person_position: Yup.string()
    .trim()
    .oneOf(
      COMPANY_SUPPORTED_CONTACT_POSITIONS,
      MESSAGES.CONTACT_POSITION_INVALID,
    )
    .required(MESSAGES.CONTACT_POSITION_REQUIRED),
});

const companyAddressSchema = Yup.object({
  id: Yup.string().nullable().notRequired(),
  address: Yup.string()
    .trim()
    .min(COMPANY_ADDRESS_MIN_LENGTH, MESSAGES.ADDRESS_MIN)
    .max(COMPANY_ADDRESS_MAX_LENGTH, MESSAGES.ADDRESS_MAX)
    .required(MESSAGES.ADDRESS_REQUIRED),
  pincode: Yup.string()
    .trim()
    .matches(COMPANY_PINCODE_PATTERN, MESSAGES.PINCODE_INVALID)
    .required(MESSAGES.PINCODE_REQUIRED),
  company_employees: Yup.array()
    .of(contactPersonSchema)
    .min(1, MESSAGES.CONTACTS_MIN)
    .required(MESSAGES.CONTACTS_REQUIRED),
});

export const companyDetailsValidationSchema = Yup.object({
  company_name: Yup.string()
    .trim()
    .min(COMPANY_NAME_MIN_LENGTH, MESSAGES.COMPANY_NAME_MIN)
    .max(COMPANY_NAME_MAX_LENGTH, MESSAGES.COMPANY_NAME_MAX)
    .required(MESSAGES.COMPANY_NAME_REQUIRED),
  company_type: Yup.string()
    .oneOf(COMPANY_SUPPORTED_TYPES, MESSAGES.COMPANY_TYPE_INVALID)
    .required(MESSAGES.COMPANY_TYPE_REQUIRED),
  email: Yup.string()
    .trim()
    .min(COMPANY_EMAIL_MIN_LENGTH, MESSAGES.EMAIL_MIN)
    .max(COMPANY_EMAIL_MAX_LENGTH, MESSAGES.EMAIL_MAX)
    .email(MESSAGES.EMAIL_INVALID)
    .required(MESSAGES.EMAIL_REQUIRED),
  phone_number: Yup.string()
    .trim()
    .matches(COMPANY_PHONE_PATTERN, MESSAGES.PHONE_INVALID)
    .required(MESSAGES.PHONE_REQUIRED),
  gst_number: Yup.string()
    .trim()
    .uppercase()
    .matches(COMPANY_GST_PATTERN, MESSAGES.GST_INVALID)
    .required(MESSAGES.GST_REQUIRED),
  pan_number: Yup.string()
    .trim()
    .uppercase()
    .matches(COMPANY_PAN_PATTERN, MESSAGES.PAN_INVALID)
    .required(MESSAGES.PAN_REQUIRED),
  website: Yup.string()
    .trim()
    .transform((value) => (value === "" ? undefined : value))
    .min(COMPANY_WEBSITE_MIN_LENGTH, MESSAGES.WEBSITE_MIN)
    .max(COMPANY_WEBSITE_MAX_LENGTH, MESSAGES.WEBSITE_MAX)
    .test("website", MESSAGES.WEBSITE_INVALID, (value) => {
      if (!value) return true;

      try {
        new URL(
          COMPANY_WEBSITE_PROTOCOL_PATTERN.test(value)
            ? value
            : `https://${value}`,
        );
        return true;
      } catch {
        return false;
      }
    }),
  addresses: Yup.array()
    .of(companyAddressSchema)
    .min(COMPANY_MIN_ADDRESSES, MESSAGES.ADDRESSES_MIN)
    .required(MESSAGES.ADDRESSES_REQUIRED),
});
