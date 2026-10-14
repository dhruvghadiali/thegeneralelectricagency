import { fromProductListResponse } from "@Redux/product/product.api-response";

export function fromQuotationProductDirectoryResponse(
  response = {},
  requested = {},
) {
  return fromProductListResponse(response, requested);
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
