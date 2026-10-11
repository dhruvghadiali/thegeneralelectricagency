import * as Yup from "yup";
import { CHANGE_PASSWORD_VALIDATION_MESSAGES as MESSAGES } from "@Forms/changePassword/changePassword.validation.messages";
import {
  CHANGE_PASSWORD_MIN_LENGTH,
  CHANGE_PASSWORD_MAX_LENGTH,
} from "@Forms/changePassword/changePassword.validation.constants";

export const changePasswordValidationSchema = Yup.object({
  currentPassword: Yup.string()
    .required(MESSAGES.CURRENT_REQUIRED)
    .min(CHANGE_PASSWORD_MIN_LENGTH, MESSAGES.CURRENT_MIN)
    .max(CHANGE_PASSWORD_MAX_LENGTH, MESSAGES.CURRENT_MAX),
  newPassword: Yup.string()
    .required(MESSAGES.NEW_REQUIRED)
    .min(CHANGE_PASSWORD_MIN_LENGTH, MESSAGES.NEW_MIN)
    .max(CHANGE_PASSWORD_MAX_LENGTH, MESSAGES.NEW_MAX)
    .notOneOf([Yup.ref("currentPassword")], MESSAGES.NEW_DIFFERENT),
  confirmPassword: Yup.string()
    .required(MESSAGES.CONFIRM_REQUIRED)
    .oneOf([Yup.ref("newPassword")], MESSAGES.CONFIRM_MATCH),
});
