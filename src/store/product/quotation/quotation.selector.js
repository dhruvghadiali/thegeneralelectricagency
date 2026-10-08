import { createSelector } from "@reduxjs/toolkit";

const selectProductQuotationState = (state) => state.productQuotation;

export const selectQuotationCompanyOptions = createSelector(
  selectProductQuotationState,
  (quotation) => quotation.companyOptions,
);

export const selectQuotationCompany = createSelector(
  selectProductQuotationState,
  (quotation) => quotation.selectedCompany,
);

export const selectQuotationTaxTreatment = createSelector(
  selectProductQuotationState,
  (quotation) => quotation.taxTreatment,
);

export const selectQuotationGstPercentage = createSelector(
  selectProductQuotationState,
  (quotation) => quotation.gstPercentage,
);

const hasValue = (value) => String(value ?? "").trim().length > 0;

export const selectCanContinueQuotation = createSelector(
  selectQuotationCompany,
  selectQuotationTaxTreatment,
  selectQuotationGstPercentage,
  (company, taxTreatment, gstPercentage) => {
    const address = company?.addresses?.[0]?.address || company?.address1;
    const hasCompanyDetails = hasValue(company?.name) && hasValue(address);
    const requiresGstPercentage =
      taxTreatment === "gujarat" || taxTreatment === "out-of-gujarat";
    const hasValidTaxSelection =
      taxTreatment === "sezlout" ||
      (requiresGstPercentage && hasValue(gstPercentage));

    return hasCompanyDetails && hasValidTaxSelection;
  },
);
