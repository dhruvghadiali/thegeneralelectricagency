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
  quotationProductInformationSaved,
  quotationProductSearchChanged,
  quotationProductSelected,
  quotationStepChanged,
} = quotationSlice.actions;

export default quotationSlice.reducer;
