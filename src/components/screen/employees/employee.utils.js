import _ from "lodash";

import { ROLE_OPTIONS, ROLE_PATHS } from "@Enums";

export const ASSIGNABLE_ROLE_OPTIONS = ROLE_OPTIONS.filter(
  (role) => role.value !== ROLE_PATHS.SUPER_ADMIN,
);

export function fullName(employee) {
  return `${employee.firstName} ${employee.lastName}`.trim();
}

export function employeeInitials(employee) {
  return fullName(employee)
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function roleLabel(value) {
  return _.find(ASSIGNABLE_ROLE_OPTIONS, { value })?.label ?? value;
}
