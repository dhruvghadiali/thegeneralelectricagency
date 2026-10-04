import { SYNC_PENDING_LIST_FILTER_COLUMNS, TABLE_DEFAULTS } from "@Enums";
import { PRODUCT_LIST_DEFAULTS } from "@Redux/product/product.defaults";
import { buildListQueryParams } from "@/utils/listQuery.util";

export function toSyncPendingProductListParams({
  page = TABLE_DEFAULTS.PAGE,
  limit = PRODUCT_LIST_DEFAULTS.limit,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({
    columns: SYNC_PENDING_LIST_FILTER_COLUMNS,
    page,
    limit,
    search,
    sort,
    filters,
  });
}
