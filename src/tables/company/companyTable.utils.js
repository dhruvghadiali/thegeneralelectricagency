import _ from "lodash";

import { COMPANY_TYPE_OPTIONS } from "@Enums";

export const EMPTY_COMPANY_FIELD_LABEL = "—";

export function companyTypeLabel(value) {
  return (
    _.find(COMPANY_TYPE_OPTIONS, { value })?.label ??
    value ??
    EMPTY_COMPANY_FIELD_LABEL
  );
}

export function companyStatusLabel(company) {
  return company?.isActive ? "Active" : "Inactive";
}

export function companyStatusVariant(company) {
  return company?.isActive ? "success" : "destructive";
}
