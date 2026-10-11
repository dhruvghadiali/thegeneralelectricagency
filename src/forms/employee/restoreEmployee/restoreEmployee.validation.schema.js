import * as Yup from "yup";

import { RESTORE_EMPLOYEE_VALIDATION_MESSAGES } from "@Forms/employee/restoreEmployee/restoreEmployee.validation.messages";
import {
  RESTORE_EMPLOYEE_PASSWORD_MAX_LENGTH,
  RESTORE_EMPLOYEE_PASSWORD_MIN_LENGTH,
} from "@Forms/employee/restoreEmployee/restoreEmployee.validation.constants";

export const restoreEmployeeValidationSchema = Yup.object({
  password: Yup.string()
    .min(
      RESTORE_EMPLOYEE_PASSWORD_MIN_LENGTH,
      RESTORE_EMPLOYEE_VALIDATION_MESSAGES.PASSWORD_MIN,
    )
    .max(
      RESTORE_EMPLOYEE_PASSWORD_MAX_LENGTH,
      RESTORE_EMPLOYEE_VALIDATION_MESSAGES.PASSWORD_MAX,
    )
    .required(RESTORE_EMPLOYEE_VALIDATION_MESSAGES.PASSWORD_REQUIRED),
});
