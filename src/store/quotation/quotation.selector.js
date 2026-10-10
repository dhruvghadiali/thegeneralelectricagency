import { createSelector } from "@reduxjs/toolkit";

const selectQuotationState = (state) => state.quotation;

export const selectQuotationCurrentStep = createSelector(
  selectQuotationState,
  (quotation) => quotation.currentStep,
);

export const selectQuotationCompanies = createSelector(
  selectQuotationState,
  (quotation) => quotation.companies,
);

export const selectQuotationCompanySearch = createSelector(
  selectQuotationState,
  (quotation) => quotation.companySearch,
);

export const selectQuotationSelectedCompany = createSelector(
  selectQuotationState,
  (quotation) => quotation.selectedCompany,
);

export const selectQuotationCompanyInformation = createSelector(
  selectQuotationState,
  (quotation) => quotation.companyInformation,
);

export const selectQuotationCompanyPagination = createSelector(
  selectQuotationState,
  (quotation) => quotation.companyPagination,
);

export const selectQuotationCompanyRequest = createSelector(
  selectQuotationState,
  ({ isLoadingCompanies, companyError }) => ({
    isLoading: isLoadingCompanies,
    error: companyError,
  }),
);
