import _ from "lodash";

import { PRODUCT_TABLE_DEFAULTS, TABLE_DEFAULTS } from "@Enums";
import { buildListQueryParams } from "@/utils/listQuery.util";

export function toProductMutationPayload(values = {}) {
  const payload = {
    product_code: _.trim(values.productCode ?? ""),
    name: _.trim(values.name ?? ""),
    category: values.category ?? "",
    agency: values.agency ?? "",
  };

  const modelNumber = _.trim(values.modelNumber ?? "");
  const description = _.trim(values.description ?? "");

  if (modelNumber) payload.model_number = modelNumber;
  if (description) payload.description = description;

  return payload;
}

export function toProductListParams({
  columns = [],
  page = TABLE_DEFAULTS.PAGE,
  limit = PRODUCT_TABLE_DEFAULTS.LIMIT,
  search = "",
  sort = [],
  filters = {},
} = {}) {
  return {
    ...buildListQueryParams({ columns, page, limit, search, sort, filters }),
    is_active: true,
  };
}

export function fromProductResponse(product = {}) {
  return {
    id: product._id ?? product.id ?? null,
    productCode: product.product_code ?? product.productCode ?? "",
    name: product.name ?? "",
    category: product.category ?? "",
    agency: product.agency ?? "",
    modelNumber: product.model_number ?? product.modelNumber ?? "",
    description: product.description ?? "",
    createdAt: product.created_at ?? product.createdAt ?? null,
    updatedAt: product.updated_at ?? product.updatedAt ?? null,
  };
}

export function fromProductListResponse(response = {}, requested = {}) {
  const pagination = response.pagination ?? {};
  const page = Number(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    Number(pagination.limit) || requested.limit || PRODUCT_TABLE_DEFAULTS.LIMIT;
  const total = Number(pagination.total) || 0;
  const products = response.products ?? response.items ?? [];

  return {
    items: _.map(products, fromProductResponse),
    pagination: {
      page,
      limit,
      total,
      totalPages:
        Number(pagination.total_pages ?? pagination.totalPages) ||
        Math.ceil(total / limit) ||
        0,
    },
  };
}
