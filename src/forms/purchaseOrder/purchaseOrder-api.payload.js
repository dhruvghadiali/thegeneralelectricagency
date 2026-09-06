import _ from "lodash";

import { TABLE_DEFAULTS } from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";

const toProductPayload = (item = {}) => ({
  product: item.product,
  quantity_purchased: _.toNumber(item.quantityPurchased),
});

export function toPurchaseCreatePayload(values = {}) {
  return {
    supplier: values.supplier,
    products: _.map(values.products ?? [], toProductPayload),
  };
}

export function toPurchaseListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = TABLE_DEFAULTS.LIMIT,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({ columns, page, limit, search, sort, filters });
}
