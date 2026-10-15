export const QUOTATION_COMPANY_PAGE = 1;
export const QUOTATION_COMPANY_LIMIT = 100;

export const createQuotationCompanyState = () => ({
  companies: [],
  companySearch: "",
  selectedCompany: null,
  companyInformation: null,
  companyPagination: {
    page: QUOTATION_COMPANY_PAGE,
    limit: QUOTATION_COMPANY_LIMIT,
    total: 0,
    totalPages: 0,
  },
  isLoadingCompanies: false,
  isLoadingMoreCompanies: false,
  companyError: null,
  companyRequestId: null,
});

export default createQuotationCompanyState;
