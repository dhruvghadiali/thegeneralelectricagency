import { createSlice } from "@reduxjs/toolkit";

import { fetchQuotationCompanies } from "@Redux/quotation/quotation.action";
import { createQuotationState } from "@Redux/quotation/quotation.state";

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
      });
  },
});

export const {
  quotationCompanyInformationSaved,
  quotationCompanySearchChanged,
  quotationCompanySelected,
  quotationStepChanged,
} = quotationSlice.actions;

export default quotationSlice.reducer;
