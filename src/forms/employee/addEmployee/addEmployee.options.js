import { ROLE_OPTIONS, ROLE_PATHS } from "@Enums";

export const ASSIGNABLE_ROLE_OPTIONS = ROLE_OPTIONS.filter(
  (role) => [
    ROLE_PATHS.EMPLOYEE,
    ROLE_PATHS.WAREHOUSE_MANAGER,
    ROLE_PATHS.TECH_SUPPORT,
  ].includes(role.value),
);
