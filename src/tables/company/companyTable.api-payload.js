import { TABLE_DEFAULTS } from "@Enums";
import { COMPANY_TABLE_DEFAULTS } from "@Tables/company/companyTable.defaults";
import { buildListQueryParams } from "@/utils/listQuery.util";

export function toCompanyListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = COMPANY_TABLE_DEFAULTS.limit,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({
    columns,
    page,
    limit,
    search,
    sort,
    filters,
  });
}
