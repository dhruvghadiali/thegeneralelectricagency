import _ from "lodash";

import { fromProductApiResponse } from "@utils/apiResponse/product/product.api-response";
import { fromProductPaginationApiResponse } from "@utils/apiResponse/product/productPagination.api-response";
import { fromProductSummaryApiResponse } from "@utils/apiResponse/product/productSummary.api-response";

export function fromProductListApiResponse(
  response = {},
  requested = {},
  defaults = {},
) {
  return {
    items: _.map(
      response.products ?? response.items ?? [],
      fromProductApiResponse,
    ),
    summary: fromProductSummaryApiResponse(response.summary ?? response),
    pagination: fromProductPaginationApiResponse(
      response.pagination ?? {},
      requested,
      defaults,
    ),
  };
}

export default fromProductListApiResponse;
