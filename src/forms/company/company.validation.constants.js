import { COMPANY_TYPE_OPTIONS, CONTACT_POSITION_OPTIONS } from "@Enums";

export const COMPANY_NAME_MIN_LENGTH = 5;
export const COMPANY_NAME_MAX_LENGTH = 500;
export const COMPANY_EMAIL_MIN_LENGTH = 5;
export const COMPANY_EMAIL_MAX_LENGTH = 254;
export const COMPANY_WEBSITE_MIN_LENGTH = 4;
export const COMPANY_WEBSITE_MAX_LENGTH = 500;
export const COMPANY_ADDRESS_MIN_LENGTH = 10;
export const COMPANY_ADDRESS_MAX_LENGTH = 500;
export const COMPANY_CONTACT_NAME_MIN_LENGTH = 3;
export const COMPANY_CONTACT_NAME_MAX_LENGTH = 200;
export const COMPANY_MIN_ADDRESSES = 1;

export const COMPANY_GST_PATTERN =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
export const COMPANY_PAN_PATTERN = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const COMPANY_PHONE_PATTERN = /^\d{10}$/;
export const COMPANY_PINCODE_PATTERN = /^[1-9][0-9]{5}$/;
export const COMPANY_WEBSITE_PROTOCOL_PATTERN =
  /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i;

export const COMPANY_SUPPORTED_TYPES = Object.freeze(
  COMPANY_TYPE_OPTIONS.map((option) => option.value),
);

export const COMPANY_SUPPORTED_CONTACT_POSITIONS = Object.freeze(
  CONTACT_POSITION_OPTIONS.map((option) => option.value),
);
