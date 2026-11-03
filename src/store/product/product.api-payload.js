import { COLUMN_TYPES, TABLE_DEFAULTS } from "@Enums";
import { PRODUCT_LIST_DEFAULTS } from "@Redux/product/product.defaults";
import { buildListQueryParams } from "@/utils/listQuery.util";

const PRODUCT_LIST_FILTER_COLUMNS = Object.freeze([
  Object.freeze({ type: COLUMN_TYPES.TEXT, filterKey: "name" }),
  Object.freeze({ type: COLUMN_TYPES.TEXT, filterKey: "hsn_code" }),
  Object.freeze({ type: COLUMN_TYPES.TEXT, filterKey: "description" }),
  Object.freeze({ type: COLUMN_TYPES.TEXT, filterKey: "product_code" }),
  Object.freeze({ type: COLUMN_TYPES.DATE_TIME, filterKey: "created" }),
]);

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
