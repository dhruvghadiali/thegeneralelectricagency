import {
  RESTORE_COMPANY_PASSWORD_MAX_LENGTH,
  RESTORE_COMPANY_PASSWORD_MIN_LENGTH,
} from "@Forms/company/restoreCompany/restoreCompany.validation.constants";

export const RESTORE_COMPANY_VALIDATION_MESSAGES = {
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN: `Password must be at least ${RESTORE_COMPANY_PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_MAX: `Password must be at most ${RESTORE_COMPANY_PASSWORD_MAX_LENGTH} characters`,
};
