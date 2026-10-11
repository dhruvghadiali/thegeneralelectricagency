import { createSlice } from "@reduxjs/toolkit";

import { QUOTATION_TAX_TREATMENTS } from "@Enums";
import {
  fetchQuotationCompanies,
  fetchQuotationProducts,
} from "@Redux/quotation/quotation.action";
import {
  createQuotationState,
  QUOTATION_COMPANY_PAGE,
  QUOTATION_PRODUCT_PAGE,
} from "@Redux/quotation/quotation.state";

const quotationSlice = createSlice({
  name: "quotation",
  initialState: createQuotationState(),
  reducers: {
    quotationReset() {
      return createQuotationState();
    },
    quotationExitRequested(state) {
      state.isExitDialogOpen = true;
    },
    quotationExitCancelled(state) {
      state.isExitDialogOpen = false;
    },
    quotationStepChanged(state, action) {
      state.currentStep = action.payload;
      state.isProductAddAnotherDialogOpen = false;
      state.pendingDuplicateProductIndex = null;
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
      state.taxTreatment = action.payload?.address
        ?.toLocaleLowerCase()
        .includes("gujarat")
        ? QUOTATION_TAX_TREATMENTS.GUJARAT
        : QUOTATION_TAX_TREATMENTS.OUT_OF_GUJARAT;
    },
    quotationTaxTreatmentChanged(state, action) {
      state.taxTreatment = action.payload;
    },
    quotationGstPercentageChanged(state, action) {
      state.gstPercentage = action.payload;
    },
    quotationDeliveryNotesChanged(state, action) {
      state.deliveryNotes = action.payload;
    },
    quotationPaymentNotesChanged(state, action) {
      state.paymentNotes = action.payload;
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
      state.pendingDuplicateProductIndex = null;
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
      state.pendingDuplicateProductIndex = null;
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
      const productIndex = action.payload;

      if (productIndex < 0 || productIndex >= state.productInformation.length) {
        return;
      }

      state.editingProductIndex = productIndex;
      state.productSearch = state.productInformation[productIndex].product;
      state.selectedProduct = null;
      state.isProductSummaryExpanded = false;
      state.pendingDeleteProductIndex = null;
      state.pendingDuplicateProductIndex = null;
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
    quotationProductDuplicateRequested(state, action) {
      const productIndex = action.payload;

      if (productIndex < 0 || productIndex >= state.productInformation.length) {
        return;
      }

      state.pendingDuplicateProductIndex = productIndex;
    },
    quotationProductDuplicateCancelled(state) {
      state.pendingDuplicateProductIndex = null;
    },
    quotationProductAddAnotherPromptOpened(state) {
      state.isProductAddAnotherDialogOpen = true;
    },
    quotationProductAddAnotherPromptClosed(state) {
      state.isProductAddAnotherDialogOpen = false;
    },
    quotationProductSummaryOpened(state) {
      if (state.productInformation.length > 0) {
        state.isProductSummaryExpanded = true;
      }
      state.isProductAddAnotherDialogOpen = false;
      state.pendingDuplicateProductIndex = null;
    },
    quotationProductSummaryClosed(state) {
      state.isProductSummaryExpanded = false;
      state.pendingDeleteProductIndex = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotationCompanies.pending, (state, action) => {
        const requestedPage =
          action.meta.arg?.page ?? QUOTATION_COMPANY_PAGE;
        const isFirstPage = requestedPage === QUOTATION_COMPANY_PAGE;

        state.companyError = null;
        state.companyRequestId = action.meta.requestId;
        state.isLoadingCompanies = isFirstPage;
        state.isLoadingMoreCompanies = !isFirstPage;
        if (isFirstPage) state.companies = [];
      })
      .addCase(fetchQuotationCompanies.fulfilled, (state, action) => {
        if (state.companyRequestId !== action.meta.requestId) return;

        if (action.payload.pagination.page === QUOTATION_COMPANY_PAGE) {
          state.companies = action.payload.items;
        } else {
          const uniqueCompanies = new Map(
            [...state.companies, ...action.payload.items].map((company) => [
              company.id,
              company,
            ]),
          );
          state.companies = [...uniqueCompanies.values()];
        }

        state.companyPagination = action.payload.pagination;
        state.isLoadingCompanies = false;
        state.isLoadingMoreCompanies = false;
        state.companyError = null;
        state.companyRequestId = null;
      })
      .addCase(fetchQuotationCompanies.rejected, (state, action) => {
        if (state.companyRequestId !== action.meta.requestId) return;

        state.isLoadingCompanies = false;
        state.isLoadingMoreCompanies = false;
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
  quotationDeliveryNotesChanged,
  quotationExitCancelled,
  quotationExitRequested,
  quotationGstPercentageChanged,
  quotationPaymentNotesChanged,
  quotationTaxTreatmentChanged,
  quotationProductDeleteCancelled,
  quotationProductDeleteRequested,
  quotationProductDuplicateCancelled,
  quotationProductDuplicateRequested,
  quotationProductAddAnotherPromptClosed,
  quotationProductAddAnotherPromptOpened,
  quotationProductEditingStarted,
  quotationProductInformationDeleted,
  quotationProductInformationSaved,
  quotationProductInformationUpdated,
  quotationProductSearchChanged,
  quotationProductSelected,
  quotationProductSummaryClosed,
  quotationProductSummaryOpened,
  quotationReset,
  quotationStepChanged,
} = quotationSlice.actions;

export default quotationSlice.reducer;
