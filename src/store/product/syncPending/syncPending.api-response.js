import { TABLE_DEFAULTS } from "@Enums";
import { PRODUCT_LIST_DEFAULTS } from "@Redux/product/product.defaults";
import { fromProductResponse } from "@Redux/product/product.api-response";

export function fromSyncPendingProductListResponse(
  response = {},
  requested = {},
) {
  const pagination = response.pagination ?? {};
  const page = Number(pagination.page) || requested.page || TABLE_DEFAULTS.PAGE;
  const limit =
    Number(pagination.limit) || requested.limit || PRODUCT_LIST_DEFAULTS.limit;
  const total = Number(pagination.total) || 0;

  return {
    items: (response.products ?? response.items ?? []).map(fromProductResponse),
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
