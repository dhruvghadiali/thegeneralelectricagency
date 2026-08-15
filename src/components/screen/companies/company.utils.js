import { COMPANY_TYPE_OPTIONS, CONTACT_POSITION_LABELS } from "@Enums";

const TYPE_VARIANTS = {
  supplier: "warning",
  customer: "success",
  manufacturer: "default",
  dealer: "secondary",
  both: "outline",
};

export function companyTypeLabel(type) {
  return COMPANY_TYPE_OPTIONS.find((option) => option.value === type)?.label ?? type;
}

export function companyTypeVariant(type) {
  return TYPE_VARIANTS[type] ?? "outline";
}

export function contactPositionLabel(position) {
  return CONTACT_POSITION_LABELS[position] ?? CONTACT_POSITION_LABELS.other;
}

export function contactInitials(name = "") {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
