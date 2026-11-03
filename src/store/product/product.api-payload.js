import _ from "lodash";

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

function toProductPayload(values = {}) {
  const nullableNumber = (value) => {
    if (value === "" || value === null || value === undefined) return null;
    const number = _.toNumber(value);
    return Number.isFinite(number) ? number : null;
  };
  const payload = {
    product_code: _.trim(values.productCode ?? ""),
    hsn_code: _.trim(values.hsnCode ?? ""),
    name: _.trim(values.name ?? ""),
    category: values.category ?? "",
    agency: values.agency ?? "",
    purchase_price: nullableNumber(values.purchasePrice),
    sale_price: nullableNumber(values.salePrice),
    gst_percentage: nullableNumber(values.gstPercentage),
    discount_amount: {
      min: nullableNumber(values.discountAmountMin),
      max: nullableNumber(values.discountAmountMax),
    },
    discount_percentage: {
      min: nullableNumber(values.discountPercentageMin),
      max: nullableNumber(values.discountPercentageMax),
    },
  };

  const modelNumber = _.trim(values.modelNumber ?? "");
  const description = _.trim(values.description ?? "");

  if (modelNumber) payload.model_number = modelNumber;
  if (description) payload.description = description;

  return payload;
}

export function toProductCreatePayload(values = {}) {
  return toProductPayload(values);
}
