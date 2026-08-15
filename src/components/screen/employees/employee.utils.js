import _ from "lodash";

import { ROLE_OPTIONS, ROLE_PATHS } from "@Enums";

export const ASSIGNABLE_ROLE_OPTIONS = ROLE_OPTIONS.filter(
  (role) => role.value !== ROLE_PATHS.SUPER_ADMIN,
);

export const EMPTY_FIELD_LABEL = "—";

/**
 * The list endpoint does not guarantee every name part, so the pieces are
 * compacted rather than joined blindly - otherwise a missing surname leaves a
 * trailing space, and a record with neither renders as an empty cell.
 */
export function fullName(employee) {
  const name = _.trim(
    _.compact([employee?.firstName, employee?.lastName]).join(" "),
  );

  return name || employee?.username || employee?.email || EMPTY_FIELD_LABEL;
}

export function roleLabel(value) {
  return _.find(ROLE_OPTIONS, { value })?.label ?? value ?? EMPTY_FIELD_LABEL;
}

export function statusLabel(employee) {
  return employee?.isActive ? "Active" : "Inactive";
}

export function statusVariant(employee) {
  return employee?.isActive ? "success" : "destructive";
}
