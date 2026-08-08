import {
  EMPLOYEE_NAME_MAX_LENGTH,
  EMPLOYEE_NAME_MIN_LENGTH,
  EMPLOYEE_USERNAME_MAX_LENGTH,
  EMPLOYEE_USERNAME_MIN_LENGTH,
} from "@/forms/employee/employee.validation.constants";

export const EMPLOYEE_VALIDATION_MESSAGES = {
  FIRST_NAME_REQUIRED: "First name is required",
  FIRST_NAME_MIN: `First name must be at least ${EMPLOYEE_NAME_MIN_LENGTH} characters`,
  FIRST_NAME_MAX: `First name must be ${EMPLOYEE_NAME_MAX_LENGTH} characters or fewer`,
  LAST_NAME_REQUIRED: "Last name is required",
  LAST_NAME_MIN: `Last name must be at least ${EMPLOYEE_NAME_MIN_LENGTH} characters`,
  LAST_NAME_MAX: `Last name must be ${EMPLOYEE_NAME_MAX_LENGTH} characters or fewer`,
  EMAIL_REQUIRED: "Email address is required",
  EMAIL_INVALID: "Enter a valid email address",
  PHONE_REQUIRED: "Phone number is required",
  PHONE_INVALID: "Enter a valid phone number",
  USERNAME_REQUIRED: "Username is required",
  USERNAME_MIN: `Username must be at least ${EMPLOYEE_USERNAME_MIN_LENGTH} characters`,
  USERNAME_MAX: `Username must be ${EMPLOYEE_USERNAME_MAX_LENGTH} characters or fewer`,
  USERNAME_INVALID: "Use only letters, numbers, dots, hyphens, or underscores",
  ROLE_REQUIRED: "Role is required",
  ROLE_INVALID: "Select a valid role",
};
