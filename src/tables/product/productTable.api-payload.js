import { TABLE_DEFAULTS } from "@Enums";
import { PRODUCT_TABLE_DEFAULTS } from "@Tables/product/productTable.defaults";
import { buildListQueryParams } from "@/utils/listQuery.util";

export function toProductListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = PRODUCT_TABLE_DEFAULTS.limit,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({ columns, page, limit, search, sort, filters });
}
