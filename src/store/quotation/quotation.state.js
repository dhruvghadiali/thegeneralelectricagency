import { CREATE_QUOTATION_STEPS } from "@Enums";

export const QUOTATION_COMPANY_PAGE = 1;
export const QUOTATION_COMPANY_LIMIT = 100;
export const QUOTATION_PRODUCT_PAGE = 1;
export const QUOTATION_PRODUCT_LIMIT = 100;

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
  products: [],
  productSearch: "",
  productPagination: {
    page: QUOTATION_PRODUCT_PAGE,
    limit: QUOTATION_PRODUCT_LIMIT,
    total: 0,
    totalPages: 0,
  },
  isLoadingProducts: false,
  isLoadingMoreProducts: false,
  productError: null,
  productRequestId: null,
});

export default createQuotationState;
