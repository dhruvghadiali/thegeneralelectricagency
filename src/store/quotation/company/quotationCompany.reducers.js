import { QUOTATION_TAX_TREATMENTS } from "@Enums";
import { fetchQuotationCompanies } from "@Redux/quotation/quotation.action";
import { QUOTATION_COMPANY_PAGE } from "@Redux/quotation/company/quotationCompany.state";

export const quotationCompanyReducers = {
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
};

export function addQuotationCompanyExtraReducers(builder) {
  builder
    .addCase(fetchQuotationCompanies.pending, (state, action) => {
      const requestedPage = action.meta.arg?.page ?? QUOTATION_COMPANY_PAGE;
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
    });
}
