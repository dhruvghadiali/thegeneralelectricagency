import { QUOTATION_TAX_TREATMENTS } from "@Enums";

export const quotationCurrencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberOrZero = (value) => {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
};

export const calculateProductFinalPrice = ({
  quantity,
  sellingPrice,
  discount,
}) =>
  Math.max(numberOrZero(sellingPrice) - numberOrZero(discount), 0) *
  numberOrZero(quantity);

export function calculateQuotationBillTotals(
  products,
  taxTreatment,
  gstPercentage,
  roundOff = false,
) {
  const productTotals = products.reduce(
    (totals, product) => {
      const quantity = Math.max(numberOrZero(product.quantity), 0);
      const sellingPrice = Math.max(numberOrZero(product.sellingPrice), 0);
      const discount = Math.max(numberOrZero(product.discount), 0);

      totals.salePrice += sellingPrice * quantity;
      totals.discount += discount * quantity;

      return totals;
    },
    { salePrice: 0, discount: 0 },
  );
  const taxableAmount = Math.max(
    productTotals.salePrice - productTotals.discount,
    0,
  );
  const isGstApplicable =
    taxTreatment === QUOTATION_TAX_TREATMENTS.GUJARAT ||
    taxTreatment === QUOTATION_TAX_TREATMENTS.OUT_OF_GUJARAT;
  const gstRate = isGstApplicable
    ? Math.max(numberOrZero(gstPercentage), 0)
    : 0;
  const totalTax = taxableAmount * (gstRate / 100);
  const unroundedFinalAmount = taxableAmount + totalTax;
  const finalAmount = roundOff
    ? Math.round(unroundedFinalAmount)
    : unroundedFinalAmount;
  const roundOffAmount = Number(
    (finalAmount - unroundedFinalAmount).toFixed(2),
  );

  return {
    ...productTotals,
    taxableAmount,
    gstRate,
    totalTax,
    unroundedFinalAmount,
    roundOffAmount,
    finalAmount,
  };
}
