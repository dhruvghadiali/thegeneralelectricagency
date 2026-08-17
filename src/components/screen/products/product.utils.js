import { AGENCY_OPTIONS, PRODUCT_CATEGORY_OPTIONS } from "@Enums";

function optionLabel(options, value) {
  return options.find((option) => option.value === value)?.label ?? value ?? "—";
}

export const productCategoryLabel = (value) =>
  optionLabel(PRODUCT_CATEGORY_OPTIONS, value);

export const agencyLabel = (value) => optionLabel(AGENCY_OPTIONS, value);

export function generateProductCode() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();

  return `PRD-${timestamp}-${random}`;
}
