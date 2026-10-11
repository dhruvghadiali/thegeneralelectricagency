import { TABLE_DEFAULTS } from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";
import { PURCHASE_CREDIT_TABLE_DEFAULTS } from "@Tables/purchaseCredit/purchaseCreditTable.defaults";

export function toPurchaseCreditListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = PURCHASE_CREDIT_TABLE_DEFAULTS.limit,
  search = "",
  sort = PURCHASE_CREDIT_TABLE_DEFAULTS.sort,
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
