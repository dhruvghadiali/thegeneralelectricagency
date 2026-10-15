import { createSelector } from "@reduxjs/toolkit";

import { selectQuotationState } from "@Redux/quotation/quotation.selectors.base";

export const selectQuotationProducts = (state) =>
  selectQuotationState(state).products;

export const selectQuotationProductSearch = (state) =>
  selectQuotationState(state).productSearch;

export const selectQuotationSelectedProduct = (state) =>
  selectQuotationState(state).selectedProduct;

export const selectQuotationProductInformation = (state) =>
  selectQuotationState(state).productInformation;

export const selectQuotationProductSummaryExpanded = (state) =>
  selectQuotationState(state).isProductSummaryExpanded;

export const selectQuotationProductEditingIndex = (state) =>
  selectQuotationState(state).editingProductIndex;

export const selectQuotationPendingDeleteProductIndex = (state) =>
  selectQuotationState(state).pendingDeleteProductIndex;

export const selectQuotationPendingDuplicateProductIndex = (state) =>
  selectQuotationState(state).pendingDuplicateProductIndex;

export const selectQuotationProductAddAnotherDialogOpen = (state) =>
  selectQuotationState(state).isProductAddAnotherDialogOpen;

export const selectQuotationProductPagination = (state) =>
  selectQuotationState(state).productPagination;

export const selectQuotationProductRequest = createSelector(
  selectQuotationState,
  ({ isLoadingProducts, isLoadingMoreProducts, productError }) => ({
    isLoading: isLoadingProducts,
    isLoadingMore: isLoadingMoreProducts,
    error: productError,
  }),
);
