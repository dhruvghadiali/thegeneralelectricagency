import { TABLE_DEFAULTS } from "@Enums";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";

export const createQuotationCompanyOptionsState = () => ({
  items: [],
  pagination: {
    page: TABLE_DEFAULTS.PAGE,
    limit: COMPANY_TABLE_DEFAULTS.limit,
    total: 0,
    totalPages: 0,
  },
  isLoading: false,
  isLoadingMore: false,
  error: null,
  requestId: null,
});

export const createProductQuotationState = () => ({
  companyOptions: createQuotationCompanyOptionsState(),
  gstPercentage: "",
  selectedCompany: null,
  taxTreatment: "",
});

export default createProductQuotationState;
