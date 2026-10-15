import _ from "lodash";

export function findDirectoryProductByName(products, productName) {
  const normalizedProductName = _.toLower(_.trim(productName));

  if (!normalizedProductName) return null;

  return (
    products.find(
      (product) => _.toLower(_.trim(product.name)) === normalizedProductName,
    ) ?? null
  );
}

export function haveSameProductName(firstProductName, secondProductName) {
  return (
    _.toLower(_.trim(firstProductName)) === _.toLower(_.trim(secondProductName))
  );
}

export function hasQuotationProductFormData(values = {}) {
  const hasDiscount = !["", "0"].includes(_.trim(String(values.discount ?? "")));

  return Boolean(
    _.trim(values.product) ||
      _.trim(String(values.sellingPrice ?? "")) ||
      _.trim(String(values.quantity ?? "")) ||
      hasDiscount ||
      _.trim(values.description),
  );
}

export function toExistingProductFormValues(
  product = {},
  directoryProducts = [],
) {
  const directoryProduct = directoryProducts.find(
    (item) => String(item.id) === String(product.productId),
  );

  return {
    product: product.product || directoryProduct?.name || "",
    sellingPrice: String(product.sellingPrice ?? ""),
    quantity: String(product.quantity ?? ""),
    discount: String(product.discount ?? "0"),
    description: product.description ?? directoryProduct?.description ?? "",
  };
}
