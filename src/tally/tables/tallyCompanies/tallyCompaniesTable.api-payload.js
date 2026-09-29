import { buildColumnFilterParams, buildSortParams } from "@/utils/dataTable.util";
import { TALLY_COMPANIES_TABLE_DEFAULTS } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.defaults";

export function toTallyCompaniesListParams({
  columns = [],
  search = "",
  sort = TALLY_COMPANIES_TABLE_DEFAULTS.sort,
  filters = {},
} = {}) {
  return {
    ...buildColumnFilterParams(columns, filters),
    ...buildSortParams(sort),
    ...(search.trim() ? { search: search.trim() } : {}),
  };
}
