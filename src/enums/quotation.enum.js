export const CREATE_QUOTATION_STEPS = Object.freeze({
  COMPANY_INFORMATION: "company-information",
  PRODUCT_INFORMATION: "product-information",
  QUOTATION_SUMMARY: "quotation-summary",
});

export const QUOTATION_FORM_MODES = Object.freeze({
  CREATE: "create",
  EDIT: "edit",
});

export const QUOTATION_TAX_TREATMENTS = Object.freeze({
  GUJARAT: "gujarat",
  OUT_OF_GUJARAT: "out of gujarat",
  SEZ_LUT: "SEZLOUT",
});

export const QUOTATION_TAX_TREATMENT_OPTIONS = Object.freeze([
  Object.freeze({
    value: QUOTATION_TAX_TREATMENTS.GUJARAT,
    label: "Gujarat",
  }),
  Object.freeze({
    value: QUOTATION_TAX_TREATMENTS.OUT_OF_GUJARAT,
    label: "Out of Gujarat",
  }),
  Object.freeze({
    value: QUOTATION_TAX_TREATMENTS.SEZ_LUT,
    label: "SEZ LUT",
  }),
]);
