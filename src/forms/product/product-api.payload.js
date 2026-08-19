import _ from "lodash";

import { PRODUCT_TABLE_DEFAULTS, TABLE_DEFAULTS } from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";

function toProductPayload(values = {}) {
  const nullableNumber = (value) => {
    if (value === "" || value === null || value === undefined) return null;
    const number = _.toNumber(value);
    return Number.isFinite(number) ? number : null;
  };
  const payload = {
    product_code: _.trim(values.productCode ?? ""),
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

export function toProductUpdatePayload(values = {}) {
  return toProductPayload(values);
}

export function toProductListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = PRODUCT_TABLE_DEFAULTS.LIMIT,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return buildListQueryParams({ columns, page, limit, search, sort, filters });
}
