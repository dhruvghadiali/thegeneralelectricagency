import { CREATE_QUOTATION_STEPS, INDIAN_GST_RATES } from "@Enums";
import { createTableState } from "@Redux/factories/table.factory";
import { QUOTATION_TABLE_DEFAULTS } from "@screenComponent/quotations/table/quotationTable.defaults";

export const QUOTATION_COMPANY_PAGE = 1;
export const QUOTATION_COMPANY_LIMIT = 100;
export const QUOTATION_PRODUCT_PAGE = 1;
export const QUOTATION_PRODUCT_LIMIT = 100;

export const createQuotationState = () => ({
  ...createTableState({
    limit: QUOTATION_TABLE_DEFAULTS.limit,
    sort: QUOTATION_TABLE_DEFAULTS.sort,
    columnFilters: QUOTATION_TABLE_DEFAULTS.filters,
  }),
  currentStep: CREATE_QUOTATION_STEPS.COMPANY_INFORMATION,
  isExitDialogOpen: false,
  isSubmitting: false,
  isSubmitSuccessful: false,
  submitError: null,
  createdQuotation: null,
  companies: [],
  companySearch: "",
  selectedCompany: null,
  companyInformation: null,
  taxTreatment: null,
  gstPercentage: String(INDIAN_GST_RATES.EIGHTEEN),
  deliveryNotes: "",
  paymentNotes: "",
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
  products: [],
  productSearch: "",
  selectedProduct: null,
  productInformation: [],
  isProductSummaryExpanded: false,
  editingProductIndex: null,
  pendingDeleteProductIndex: null,
  pendingDuplicateProductIndex: null,
  isProductAddAnotherDialogOpen: false,
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
