import { COMPANY_LIST_DEFAULTS, TABLE_DEFAULTS } from "@Enums";

export const createSystemCompaniesState = () => ({
  items: [],
  selectedCompany: null,
  pagination: {
    page: TABLE_DEFAULTS.PAGE,
    limit: COMPANY_LIST_DEFAULTS.limit,
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
