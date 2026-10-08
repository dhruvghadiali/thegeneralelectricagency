import { createSlice } from "@reduxjs/toolkit";

import { TABLE_DEFAULTS } from "@Enums";
import { fetchQuotationCompanies } from "@Redux/product/quotation/quotation.action";
import { createProductQuotationState } from "@Redux/product/quotation/quotation.state";

const productQuotationSlice = createSlice({
  name: "productQuotation",
  initialState: createProductQuotationState(),
  reducers: {
    quotationCompanySelected(state, action) {
      state.selectedCompany = action.payload;
      state.gstPercentage = "";
      state.taxTreatment = "";
    },
    quotationCompanyDetailsUpdated(state, action) {
      const currentCompany = state.selectedCompany ?? {};
      const currentAddresses = currentCompany.addresses?.length
        ? [...currentCompany.addresses]
        : [{}];
      const details = action.payload;

      currentAddresses[0] = {
        ...currentAddresses[0],
        address: details.address.trim(),
      };
      state.selectedCompany = {
        ...currentCompany,
        id: currentCompany.id ?? "custom-quotation-company",
        name: details.name.trim(),
        address1: details.address.trim(),
        addresses: currentAddresses,
        email: details.email.trim(),
        phone: details.phone.trim(),
      };
    },
    quotationGstPercentageSelected(state, action) {
      state.gstPercentage = action.payload;
    },
    quotationTaxTreatmentSelected(state, action) {
      state.taxTreatment = action.payload;
      state.gstPercentage = "";
    },
    quotationReset() {
      return createProductQuotationState();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotationCompanies.pending, (state, action) => {
        const options = state.companyOptions;
        const isFirstPage = action.meta.arg.page === TABLE_DEFAULTS.PAGE;

        options.requestId = action.meta.requestId;
        options.error = null;
        options.isLoading = isFirstPage;
        options.isLoadingMore = !isFirstPage;
        if (isFirstPage) options.items = [];
      })
      .addCase(fetchQuotationCompanies.fulfilled, (state, action) => {
        const options = state.companyOptions;
        if (options.requestId !== action.meta.requestId) return;

        if (action.payload.pagination.page === TABLE_DEFAULTS.PAGE) {
          options.items = action.payload.items;
        } else {
          const uniqueCompanies = new Map(
            [...options.items, ...action.payload.items].map((company) => [
              company.id,
              company,
            ]),
          );
          options.items = [...uniqueCompanies.values()];
        }

        options.pagination = action.payload.pagination;
        options.isLoading = false;
        options.isLoadingMore = false;
        options.error = null;
        options.requestId = null;
      })
      .addCase(fetchQuotationCompanies.rejected, (state, action) => {
        const options = state.companyOptions;
        if (options.requestId !== action.meta.requestId) return;

        options.isLoading = false;
        options.isLoadingMore = false;
        options.error = action.meta.aborted
          ? null
          : (action.payload ?? "Unable to load companies. Try searching again.");
        options.requestId = null;
      });
  },
});

export const {
  quotationCompanyDetailsUpdated,
  quotationCompanySelected,
  quotationGstPercentageSelected,
  quotationReset,
  quotationTaxTreatmentSelected,
} = productQuotationSlice.actions;

export default productQuotationSlice.reducer;
