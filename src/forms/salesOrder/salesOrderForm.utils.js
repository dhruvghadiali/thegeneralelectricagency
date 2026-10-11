function editableNumber(value) {
  return value == null || value === "" ? "" : String(value);
}

function finiteNumber(value) {
  if (value === "" || value == null) return null;

  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function roundedValue(value) {
  return Number(value.toFixed(2)).toString();
}

function discountPercentageFor(amount, salePrice) {
  const numericAmount = finiteNumber(amount);
  const numericSalePrice = finiteNumber(salePrice);

  if (numericAmount == null || !numericSalePrice) return "";
  return roundedValue((numericAmount / numericSalePrice) * 100);
}

function discountAmountFor(percentage, salePrice) {
  const numericPercentage = finiteNumber(percentage);
  const numericSalePrice = finiteNumber(salePrice);

  if (numericPercentage == null || numericSalePrice == null) return "";
  return roundedValue((numericSalePrice * numericPercentage) / 100);
}

export function salesOrderProductValues(product = {}) {
  const salePrice = editableNumber(product.salePrice);
  const minimumDiscountAmount = editableNumber(product.discountAmount?.min);
  const minimumDiscountPercentage = editableNumber(
    product.discountPercentage?.min,
  );

  return {
    product: String(product.id ?? ""),
    purchasePrice: editableNumber(product.purchasePrice),
    salePrice,
    gstPercentage: editableNumber(product.gstPercentage),
    discountAmount: minimumDiscountAmount,
    discountPercentage:
      discountPercentageFor(minimumDiscountAmount, salePrice) ||
      minimumDiscountPercentage,
    stocks: editableNumber(product.stocks),
  };
}

export function updateSalesOrderProductValue(product, field, value) {
  const updatedProduct = { ...product, [field]: value };

  if (field === "discountAmount") {
    updatedProduct.discountPercentage = discountPercentageFor(
      value,
      product.salePrice,
    );
  }

  if (field === "discountPercentage") {
    updatedProduct.discountAmount = discountAmountFor(value, product.salePrice);
  }

  if (field === "salePrice" && value !== "") {
    updatedProduct.discountAmount = discountAmountFor(
      product.discountPercentage,
      value,
    );
  }

  return updatedProduct;
}
