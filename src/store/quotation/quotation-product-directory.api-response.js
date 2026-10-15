import {
  QUOTATION_PRODUCT_LIMIT,
  QUOTATION_PRODUCT_PAGE,
} from "@Redux/quotation/quotation.state";
import { fromProductListApiResponse } from "@utils/apiResponse/product/productList.api-response";

export function fromQuotationProductDirectoryResponse(
  response = {},
  requested = {},
) {
  return fromProductListApiResponse(response, requested, {
    page: QUOTATION_PRODUCT_PAGE,
    limit: QUOTATION_PRODUCT_LIMIT,
  });
}

export function toQuotationProductFormValues(product = {}) {
  return {
    product: product.name ?? "",
    sellingPrice:
      product.salePrice === null || product.salePrice === undefined
        ? ""
        : String(product.salePrice),
    description: product.description ?? "",
  };
}
