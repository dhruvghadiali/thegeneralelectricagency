import {
  RESTORE_EMPLOYEE_PASSWORD_MAX_LENGTH,
  RESTORE_EMPLOYEE_PASSWORD_MIN_LENGTH,
} from "@Forms/employee/restoreEmployee/restoreEmployee.validation.constants";

export const RESTORE_EMPLOYEE_VALIDATION_MESSAGES = {
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN: `Password must be at least ${RESTORE_EMPLOYEE_PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_MAX: `Password must be at most ${RESTORE_EMPLOYEE_PASSWORD_MAX_LENGTH} characters`,
};
