import {
  COMPANY_TYPE_OPTIONS,
  CONTACT_PERSON_POSITIONS,
  CONTACT_POSITION_LABELS,
} from "@Enums";

export const EMPTY_COMPANY_FIELD_LABEL = "—";

export function companyTypeLabel(value) {
  return (
    COMPANY_TYPE_OPTIONS.find((option) => option.value === value)?.label ??
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

export function normalizedContactPosition(position) {
  return CONTACT_POSITION_LABELS[position]
    ? position
    : CONTACT_PERSON_POSITIONS.OTHER;
}

export function contactPositionLabel(position) {
  return CONTACT_POSITION_LABELS[normalizedContactPosition(position)];
}
