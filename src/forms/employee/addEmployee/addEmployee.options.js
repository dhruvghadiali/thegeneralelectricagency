import { ROLE_OPTIONS, ROLE_PATHS } from "@Enums";

export const ASSIGNABLE_ROLE_OPTIONS = ROLE_OPTIONS.filter(
  (role) => role.value !== ROLE_PATHS.SUPER_ADMIN,
);
