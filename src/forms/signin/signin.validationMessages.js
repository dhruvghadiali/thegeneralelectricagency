import {
  SIGNIN_PASSWORD_MAX_LENGTH,
  SIGNIN_PASSWORD_MIN_LENGTH,
  SIGNIN_USERNAME_MAX_LENGTH,
  SIGNIN_USERNAME_MIN_LENGTH,
} from "@/forms/signin/signin.validationConstants";

export const SIGNIN_VALIDATION_MESSAGES = {
  USERNAME_REQUIRED: "Username is required",
  USERNAME_MIN: `Username must be at least ${SIGNIN_USERNAME_MIN_LENGTH} characters`,
  USERNAME_MAX: `Username must be at most ${SIGNIN_USERNAME_MAX_LENGTH} characters`,
  PASSWORD_REQUIRED: "Password is required",
  PASSWORD_MIN: `Password must be at least ${SIGNIN_PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_MAX: `Password must be at most ${SIGNIN_PASSWORD_MAX_LENGTH} characters`,
};
