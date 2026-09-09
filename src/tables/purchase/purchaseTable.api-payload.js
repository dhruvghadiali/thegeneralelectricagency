import { TABLE_DEFAULTS } from "@Enums";
import { PURCHASE_TABLE_DEFAULTS } from "@Tables/purchase/purchaseTable.defaults";
import { buildListQueryParams } from "@/utils/listQuery.util";

export function toPurchaseListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = PURCHASE_TABLE_DEFAULTS.limit,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({ columns, page, limit, search, sort, filters });
}
