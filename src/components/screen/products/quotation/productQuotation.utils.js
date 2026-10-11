import { AGENCY_OPTIONS, PRODUCT_CATEGORY_OPTIONS } from "@Enums";

function optionLabel(options, value) {
  return options.find((option) => option.value === value)?.label ?? value ?? "—";
}

export const productCategoryLabel = (value) =>
  optionLabel(PRODUCT_CATEGORY_OPTIONS, value);

export const agencyLabel = (value) => optionLabel(AGENCY_OPTIONS, value);
