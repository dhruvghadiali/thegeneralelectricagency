import _ from "lodash";

import { TABLE_DEFAULTS } from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";

const toProductPayload = (item = {}) => ({
  product: item.product,
  quantity_purchased: _.toNumber(item.quantityPurchased),
  unit_price: _.toNumber(item.unitPrice),
  unit_discount: _.toNumber(item.unitDiscount),
  unit_gst: _.toNumber(item.unitGst),
  unit_gst_amount: _.toNumber(item.unitGstAmount),
  final_price: _.toNumber(item.finalPrice),
  notes: _.trim(item.notes ?? "") || null,
});

export function toPurchaseCreatePayload(values = {}) {
  return {
    supplier: values.supplier,
    products: _.map(values.products ?? [], toProductPayload),
    bills: _.filter(values.bills ?? [], Boolean),
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
