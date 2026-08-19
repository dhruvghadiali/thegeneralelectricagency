import { TABLE_DEFAULTS } from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";

export function toCompanyContactListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = TABLE_DEFAULTS.LIMIT,
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
