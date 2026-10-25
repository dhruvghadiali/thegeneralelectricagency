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

function finiteNumber(value) {
  if (value === "" || value === null || value === undefined) return null;

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function roundedCommercialValue(value) {
  return Number(value.toFixed(2)).toString();
}

export function quotationDiscountAmountFor(percentage, sellingPrice) {
  const numericPercentage = finiteNumber(percentage);
  const numericSellingPrice = finiteNumber(sellingPrice);

  if (numericPercentage === null || numericSellingPrice === null) return "";

  return roundedCommercialValue(
    (numericSellingPrice * numericPercentage) / 100,
  );
}

export function quotationDiscountPercentageFor(amount, sellingPrice) {
  const numericAmount = finiteNumber(amount);
  const numericSellingPrice = finiteNumber(sellingPrice);

  if (numericAmount === null || !numericSellingPrice) return "";

  return roundedCommercialValue((numericAmount / numericSellingPrice) * 100);
}

export function hasQuotationProductFormData(values = {}) {
  const hasDiscount = !["", "0"].includes(_.trim(String(values.discount ?? "")));
  const hasDiscountPercentage = !["", "0"].includes(
    _.trim(String(values.discountPercentage ?? "")),
  );

  return Boolean(
    _.trim(values.product) ||
      _.trim(String(values.sellingPrice ?? "")) ||
      _.trim(String(values.quantity ?? "")) ||
      hasDiscount ||
      hasDiscountPercentage ||
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
  const hasDiscount =
    product.discount !== null &&
    product.discount !== undefined &&
    product.discount !== "" &&
    Number(product.discount) !== 0;

  return {
    product: product.product || directoryProduct?.name || "",
    productId: product.productId ?? directoryProduct?.id ?? "",
    sellingPrice: String(product.sellingPrice ?? ""),
    quantity: String(product.quantity ?? ""),
    discount: hasDiscount ? String(product.discount) : "",
    discountPercentage: hasDiscount
      ? product.discountPercentage === undefined ||
        product.discountPercentage === null
        ? quotationDiscountPercentageFor(
            product.discount,
            product.sellingPrice,
          )
        : String(product.discountPercentage)
      : "",
    description: product.description ?? directoryProduct?.description ?? "",
  };
}
