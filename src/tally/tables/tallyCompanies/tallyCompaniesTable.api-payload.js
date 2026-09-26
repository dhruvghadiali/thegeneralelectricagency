import { TABLE_DEFAULTS } from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";
import { TALLY_COMPANIES_TABLE_DEFAULTS } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.defaults";

export function toTallyCompaniesListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = TALLY_COMPANIES_TABLE_DEFAULTS.limit,
  search = "",
  sort = TALLY_COMPANIES_TABLE_DEFAULTS.sort,
  filters = {},
} = {}) {
  return buildListQueryParams({ columns, page, limit, search, sort, filters });
}
