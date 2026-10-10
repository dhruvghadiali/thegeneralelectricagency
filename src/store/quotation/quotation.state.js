import { CREATE_QUOTATION_STEPS } from "@Enums";

export const QUOTATION_COMPANY_PAGE = 1;
export const QUOTATION_COMPANY_LIMIT = 100;

export const createQuotationState = () => ({
  currentStep: CREATE_QUOTATION_STEPS.COMPANY_INFORMATION,
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
  companyError: null,
  companyRequestId: null,
});

export default createQuotationState;
