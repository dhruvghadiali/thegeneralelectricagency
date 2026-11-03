import {
  COMPANY_LIST_DEFAULTS,
  COMPANY_LIST_FILTER_COLUMNS,
  TABLE_DEFAULTS,
} from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";

export function toCompanyListParams({
  page = TABLE_DEFAULTS.PAGE,
  limit = COMPANY_LIST_DEFAULTS.limit,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({
    columns: COMPANY_LIST_FILTER_COLUMNS,
    page,
    limit,
    search,
    sort,
    filters,
  });
}
