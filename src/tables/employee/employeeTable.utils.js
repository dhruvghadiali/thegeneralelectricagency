import _ from "lodash";

import { ROLE_OPTIONS } from "@Enums";

export const EMPTY_FIELD_LABEL = "—";

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
