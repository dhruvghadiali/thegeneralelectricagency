import {
  PRODUCT_LIST_DEFAULTS,
  PRODUCT_LIST_FILTER_COLUMNS,
  TABLE_DEFAULTS,
} from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";

export function toProductListParams({
  page = TABLE_DEFAULTS.PAGE,
  limit = PRODUCT_LIST_DEFAULTS.limit,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({
    columns: PRODUCT_LIST_FILTER_COLUMNS,
    page,
    limit,
    search,
    sort,
    filters,
  });
}
