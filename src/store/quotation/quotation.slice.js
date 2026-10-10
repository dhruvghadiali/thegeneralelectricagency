import { createSlice } from "@reduxjs/toolkit";

import {
  fetchQuotationCompanies,
  fetchQuotationProducts,
} from "@Redux/quotation/quotation.action";
import {
  createQuotationState,
  QUOTATION_PRODUCT_PAGE,
} from "@Redux/quotation/quotation.state";

const quotationSlice = createSlice({
  name: "quotation",
  initialState: createQuotationState(),
  reducers: {
    quotationStepChanged(state, action) {
      state.currentStep = action.payload;
    },
    quotationCompanySearchChanged(state, action) {
      state.companySearch = action.payload;
      state.selectedCompany = null;
    },
    quotationCompanySelected(state, action) {
      state.selectedCompany = action.payload;
      state.companySearch = action.payload?.name ?? "";
    },
    quotationCompanyInformationSaved(state, action) {
      state.companyInformation = action.payload;
    },
    quotationProductSearchChanged(state, action) {
      state.productSearch = action.payload;
      state.selectedProduct = null;
    },
    quotationProductSelected(state, action) {
      state.selectedProduct = action.payload;
      state.productSearch = action.payload?.name ?? "";
    },
    quotationProductInformationSaved(state, action) {
      state.productInformation.push(action.payload);
      state.productSearch = "";
      state.selectedProduct = null;
      state.isProductSummaryExpanded = false;
      state.editingProductIndex = null;
      state.pendingDeleteProductIndex = null;
    },
    quotationProductInformationUpdated(state, action) {
      const { index, product } = action.payload;

      if (index < 0 || index >= state.productInformation.length) return;

      state.productInformation[index] = product;
      state.productSearch = "";
      state.selectedProduct = null;
      state.isProductSummaryExpanded = false;
      state.editingProductIndex = null;
      state.pendingDeleteProductIndex = null;
    },
    quotationProductInformationDeleted(state, action) {
      const deletedIndex = action.payload;

      if (
        deletedIndex < 0 ||
        deletedIndex >= state.productInformation.length
      ) {
        return;
      }

      state.productInformation.splice(deletedIndex, 1);
      state.pendingDeleteProductIndex = null;

      if (state.editingProductIndex === deletedIndex) {
        state.editingProductIndex = null;
      } else if (state.editingProductIndex > deletedIndex) {
        state.editingProductIndex -= 1;
      }

      if (state.productInformation.length === 0) {
        state.isProductSummaryExpanded = false;
      }
    },
    quotationProductEditingStarted(state, action) {
      state.editingProductIndex = action.payload;
      state.isProductSummaryExpanded = false;
      state.pendingDeleteProductIndex = null;
    },
    quotationProductDeleteRequested(state, action) {
      const productIndex = action.payload;

      if (productIndex < 0 || productIndex >= state.productInformation.length) {
        return;
      }

      state.pendingDeleteProductIndex = productIndex;
    },
    quotationProductDeleteCancelled(state) {
      state.pendingDeleteProductIndex = null;
    },
    quotationProductSummaryOpened(state) {
      if (state.productInformation.length > 0) {
        state.isProductSummaryExpanded = true;
      }
    },
    quotationProductSummaryClosed(state) {
      state.isProductSummaryExpanded = false;
      state.pendingDeleteProductIndex = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotationCompanies.pending, (state, action) => {
        state.isLoadingCompanies = true;
        state.companyError = null;
        state.companyRequestId = action.meta.requestId;
      })
      .addCase(fetchQuotationCompanies.fulfilled, (state, action) => {
        if (state.companyRequestId !== action.meta.requestId) return;

        state.companies = action.payload.items;
        state.companyPagination = action.payload.pagination;
        state.isLoadingCompanies = false;
        state.companyError = null;
        state.companyRequestId = null;
      })
      .addCase(fetchQuotationCompanies.rejected, (state, action) => {
        if (state.companyRequestId !== action.meta.requestId) return;

        state.isLoadingCompanies = false;
        state.companyError = action.meta.aborted
          ? null
          : (action.payload ?? "Unable to load quotation companies.");
        state.companyRequestId = null;
      })
      .addCase(fetchQuotationProducts.pending, (state, action) => {
        const requestedPage =
          action.meta.arg?.page ?? QUOTATION_PRODUCT_PAGE;
        const isFirstPage = requestedPage === QUOTATION_PRODUCT_PAGE;

        state.productRequestId = action.meta.requestId;
        state.productError = null;
        state.isLoadingProducts = isFirstPage;
        state.isLoadingMoreProducts = !isFirstPage;
        if (isFirstPage) state.products = [];
      })
      .addCase(fetchQuotationProducts.fulfilled, (state, action) => {
        if (state.productRequestId !== action.meta.requestId) return;

        if (action.payload.pagination.page === QUOTATION_PRODUCT_PAGE) {
          state.products = action.payload.items;
        } else {
          const uniqueProducts = new Map(
            [...state.products, ...action.payload.items].map((product) => [
              product.id,
              product,
            ]),
          );
          state.products = [...uniqueProducts.values()];
        }

        state.productPagination = action.payload.pagination;
        state.isLoadingProducts = false;
        state.isLoadingMoreProducts = false;
        state.productError = null;
        state.productRequestId = null;
      })
      .addCase(fetchQuotationProducts.rejected, (state, action) => {
        if (state.productRequestId !== action.meta.requestId) return;

        state.isLoadingProducts = false;
        state.isLoadingMoreProducts = false;
        state.productError = action.meta.aborted
          ? null
          : (action.payload ?? "Unable to load quotation products.");
        state.productRequestId = null;
      });
  },
});

export const {
  quotationCompanyInformationSaved,
  quotationCompanySearchChanged,
  quotationCompanySelected,
  quotationProductDeleteCancelled,
  quotationProductDeleteRequested,
  quotationProductEditingStarted,
  quotationProductInformationDeleted,
  quotationProductInformationSaved,
  quotationProductInformationUpdated,
  quotationProductSearchChanged,
  quotationProductSelected,
  quotationProductSummaryClosed,
  quotationProductSummaryOpened,
  quotationStepChanged,
} = quotationSlice.actions;

export default quotationSlice.reducer;
