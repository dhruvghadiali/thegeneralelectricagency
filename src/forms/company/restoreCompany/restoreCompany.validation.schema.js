import * as Yup from "yup";

import {
  RESTORE_COMPANY_PASSWORD_MAX_LENGTH,
  RESTORE_COMPANY_PASSWORD_MIN_LENGTH,
} from "@Forms/company/restoreCompany/restoreCompany.validation.constants";
import { RESTORE_COMPANY_VALIDATION_MESSAGES } from "@Forms/company/restoreCompany/restoreCompany.validation.messages";

export const restoreCompanyValidationSchema = Yup.object({
  password: Yup.string()
    .min(
      RESTORE_COMPANY_PASSWORD_MIN_LENGTH,
      RESTORE_COMPANY_VALIDATION_MESSAGES.PASSWORD_MIN,
    )
    .max(
      RESTORE_COMPANY_PASSWORD_MAX_LENGTH,
      RESTORE_COMPANY_VALIDATION_MESSAGES.PASSWORD_MAX,
    )
    .required(RESTORE_COMPANY_VALIDATION_MESSAGES.PASSWORD_REQUIRED),
});
