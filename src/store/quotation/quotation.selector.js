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

export const selectQuotationProducts = createSelector(
  selectQuotationState,
  (quotation) => quotation.products,
);

export const selectQuotationProductSearch = createSelector(
  selectQuotationState,
  (quotation) => quotation.productSearch,
);

export const selectQuotationProductPagination = createSelector(
  selectQuotationState,
  (quotation) => quotation.productPagination,
);

export const selectQuotationProductRequest = createSelector(
  selectQuotationState,
  ({ isLoadingProducts, isLoadingMoreProducts, productError }) => ({
    isLoading: isLoadingProducts,
    isLoadingMore: isLoadingMoreProducts,
    error: productError,
  }),
);
