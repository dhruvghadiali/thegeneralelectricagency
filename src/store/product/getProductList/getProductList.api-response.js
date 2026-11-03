import { PRODUCT_LIST_DEFAULTS, TABLE_DEFAULTS } from "@Enums";
import { fromProductApiResponse } from "@utils/apiResponse/product/product.api-response";
import { fromProductListApiResponse } from "@utils/apiResponse/product/productList.api-response";

export function fromProductResponse(product = {}) {
  return fromProductApiResponse(product);
}

export function fromProductListResponse(response = {}, requested = {}) {
  return fromProductListApiResponse(response, requested, {
    page: TABLE_DEFAULTS.PAGE,
    limit: PRODUCT_LIST_DEFAULTS.limit,
  });
}
