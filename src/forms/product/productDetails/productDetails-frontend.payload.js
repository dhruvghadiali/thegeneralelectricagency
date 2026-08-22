const discountRangeValue = (value, boundary) => {
  if (value && typeof value === "object") return value[boundary] ?? "";
  return value ?? "";
};

export function toProductFormValues(product = {}) {
  return {
    ...product,
    agencyName: product.agencyName ?? "",
    purchasePrice: product.purchasePrice ?? "",
    salePrice: product.salePrice ?? "",
    gstPercentage: product.gstPercentage ?? "",
    discountAmountMin: discountRangeValue(product.discountAmount, "min"),
    discountAmountMax: discountRangeValue(product.discountAmount, "max"),
    discountPercentageMin: discountRangeValue(
      product.discountPercentage,
      "min",
    ),
    discountPercentageMax: discountRangeValue(
      product.discountPercentage,
      "max",
    ),
  };
}
