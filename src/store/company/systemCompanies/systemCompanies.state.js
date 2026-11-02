import { TABLE_DEFAULTS } from "@Enums";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";

export const createSystemCompaniesState = () => ({
  items: [],
  selectedCompany: null,
  pagination: {
    page: TABLE_DEFAULTS.PAGE,
    limit: COMPANY_TABLE_DEFAULTS.limit,
    total: 0,
    totalPages: 0,
  },
  page: TABLE_DEFAULTS.PAGE,
  search: "",
  isLoading: false,
  error: null,
  requestId: null,
});

export default createSystemCompaniesState;
