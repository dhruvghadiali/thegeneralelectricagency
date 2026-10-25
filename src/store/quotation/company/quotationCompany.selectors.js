import { createSelector } from "@reduxjs/toolkit";

import { selectQuotationState } from "@Redux/quotation/quotation.selectors.base";

export const selectQuotationCompanies = (state) =>
  selectQuotationState(state).companies;

export const selectQuotationCompanySearch = (state) =>
  selectQuotationState(state).companySearch;

export const selectQuotationSelectedCompany = (state) =>
  selectQuotationState(state).selectedCompany;

export const selectQuotationCompanyInformation = (state) =>
  selectQuotationState(state).companyInformation;

export const selectQuotationPendingUnsavedCompanyInformation = (state) =>
  selectQuotationState(state).pendingUnsavedCompanyInformation;

export const selectQuotationCompanyPagination = (state) =>
  selectQuotationState(state).companyPagination;

export const selectQuotationCompanyRequest = createSelector(
  selectQuotationState,
  ({ isLoadingCompanies, isLoadingMoreCompanies, companyError }) => ({
    isLoading: isLoadingCompanies,
    isLoadingMore: isLoadingMoreCompanies,
    error: companyError,
  }),
);
