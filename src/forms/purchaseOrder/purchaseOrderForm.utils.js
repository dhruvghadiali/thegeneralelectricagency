const decimalValue = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const moneyValue = (value) => Number(value.toFixed(2));

export function calculatePurchaseProductPricing({
  unitPrice,
  unitDiscount,
  unitGst,
}) {
  const price = decimalValue(unitPrice);
  const discount = decimalValue(unitDiscount);
  const gst = decimalValue(unitGst);

  if (
    price === null ||
    discount === null ||
    gst === null ||
    price < 0 ||
    discount < 0 ||
    discount > price ||
    gst < 0
  ) {
    return { unitGstAmount: "", finalPrice: "" };
  }

  const taxablePrice = price - discount;
  const unitGstAmount = moneyValue((taxablePrice * gst) / 100);

  return {
    unitGstAmount,
    finalPrice: moneyValue(taxablePrice + unitGstAmount),
  };
}
