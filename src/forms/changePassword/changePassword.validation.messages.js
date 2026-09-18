import {
  CHANGE_PASSWORD_MIN_LENGTH,
  CHANGE_PASSWORD_MAX_LENGTH,
} from "@Forms/changePassword/changePassword.validation.constants";

export const CHANGE_PASSWORD_VALIDATION_MESSAGES = {
  CURRENT_REQUIRED: "Current password is required",
  CURRENT_MIN: `Current password must be at least ${CHANGE_PASSWORD_MIN_LENGTH} characters`,
  CURRENT_MAX: `Current password must be at most ${CHANGE_PASSWORD_MAX_LENGTH} characters`,
  NEW_REQUIRED: "New password is required",
  NEW_MIN: `Use at least ${CHANGE_PASSWORD_MIN_LENGTH} characters`,
  NEW_MAX: `Use at most ${CHANGE_PASSWORD_MAX_LENGTH} characters`,
  NEW_DIFFERENT: "New password must be different from your current password",
  CONFIRM_REQUIRED: "Confirm your new password",
  CONFIRM_MATCH: "Passwords do not match",
};
