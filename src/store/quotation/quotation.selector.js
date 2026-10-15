import { createSelector } from "@reduxjs/toolkit";
import { createTableSelectors } from "@Redux/factories/table.factory";

const selectQuotationState = (state) => state.quotation;

export const quotationTableSelectors =
  createTableSelectors(selectQuotationState);

export const selectQuotationRowActionQuotation = createSelector(
  selectQuotationState,
  ({ items, rowActionQuotationKey }) => {
    if (rowActionQuotationKey === null) return null;

    const quotation = items.find(
      (quotation) =>
        String(quotation.id ?? quotation.quotationNumber) ===
        String(rowActionQuotationKey),
    );

    return quotation ?? null;
  },
);

export const selectQuotationUpdateUnavailableDialogOpen = createSelector(
  selectQuotationState,
  (quotation) => quotation.isUpdateUnavailableDialogOpen,
);

export const selectQuotationViewOpenSection = createSelector(
  selectQuotationState,
  (quotation) => quotation.viewOpenSection,
);

export const selectQuotationCurrentStep = createSelector(
  selectQuotationState,
  (quotation) => quotation.currentStep,
);

export const selectQuotationExitDialog = createSelector(
  selectQuotationState,
  (quotation) => quotation.isExitDialogOpen,
);

export const selectQuotationSubmission = createSelector(
  selectQuotationState,
  ({ isSubmitting, isSubmitSuccessful, submitError, createdQuotation }) => ({
    isSubmitting,
    isSuccessful: isSubmitSuccessful,
    error: submitError,
    createdQuotation,
  }),
);

export const selectQuotationEditingId = createSelector(
  selectQuotationState,
  (quotation) => quotation.editingQuotationId,
);

export const selectQuotationEditSource = createSelector(
  selectQuotationState,
  ({
    editingQuotationReference,
    editingQuotationVersion,
    originalGstPercentage,
    originalProductInformation,
  }) => ({
    quotationReference: editingQuotationReference,
    quotationVersion: editingQuotationVersion,
    originalGstPercentage,
    originalProducts: originalProductInformation,
  }),
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

export const selectQuotationTaxTreatment = createSelector(
  selectQuotationState,
  (quotation) => quotation.taxTreatment,
);

export const selectQuotationGstPercentage = createSelector(
  selectQuotationState,
  (quotation) => quotation.gstPercentage,
);

export const selectQuotationDeliveryNotes = createSelector(
  selectQuotationState,
  (quotation) => quotation.deliveryNotes,
);

export const selectQuotationPaymentNotes = createSelector(
  selectQuotationState,
  (quotation) => quotation.paymentNotes,
);

export const selectQuotationCompanyPagination = createSelector(
  selectQuotationState,
  (quotation) => quotation.companyPagination,
);

export const selectQuotationCompanyRequest = createSelector(
  selectQuotationState,
  ({ isLoadingCompanies, isLoadingMoreCompanies, companyError }) => ({
    isLoading: isLoadingCompanies,
    isLoadingMore: isLoadingMoreCompanies,
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

export const selectQuotationSelectedProduct = createSelector(
  selectQuotationState,
  (quotation) => quotation.selectedProduct,
);

export const selectQuotationProductInformation = createSelector(
  selectQuotationState,
  (quotation) => quotation.productInformation,
);

export const selectQuotationProductSummaryExpanded = createSelector(
  selectQuotationState,
  (quotation) => quotation.isProductSummaryExpanded,
);

export const selectQuotationProductEditingIndex = createSelector(
  selectQuotationState,
  (quotation) => quotation.editingProductIndex,
);

export const selectQuotationPendingDeleteProductIndex = createSelector(
  selectQuotationState,
  (quotation) => quotation.pendingDeleteProductIndex,
);

export const selectQuotationPendingDuplicateProductIndex = createSelector(
  selectQuotationState,
  (quotation) => quotation.pendingDuplicateProductIndex,
);

export const selectQuotationProductAddAnotherDialogOpen = createSelector(
  selectQuotationState,
  (quotation) => quotation.isProductAddAnotherDialogOpen,
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
