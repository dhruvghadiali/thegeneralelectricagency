import { COMPANY_LIST_DEFAULTS } from "@Enums";
import { createTableState } from "@Redux/factories/table.factory";

export const createGetCompanyListState = () => ({
  companyTable: createTableState({
    limit: COMPANY_LIST_DEFAULTS.limit,
    sort: COMPANY_LIST_DEFAULTS.sort,
    columnFilters: COMPANY_LIST_DEFAULTS.filters,
  }),
  summary: {
    totalCompanies: 0,
    activeCompanies: 0,
    inactiveCompanies: 0,
  },
});

export default createGetCompanyListState;
