import { useSelector } from "react-redux";

import { QUOTATION_TAX_TREATMENTS } from "@Enums";
import {
  selectQuotationGstPercentage,
  selectQuotationTaxTreatment,
} from "@Redux/quotation/quotation.selector";
import { Label } from "@shadcnComponent/label";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberOrZero = (value) => {
  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
};

function calculateBillTotals(products, taxTreatment, gstPercentage) {
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

  return {
    ...productTotals,
    taxableAmount,
    gstRate,
    totalTax,
    finalAmount: taxableAmount + totalTax,
  };
}

function BillAmountRow({ label, value, emphasized = false }) {
  return (
    <div
      className={
        emphasized
          ? "flex items-center justify-between gap-4 border-t pt-2 font-semibold"
          : "flex items-center justify-between gap-4"
      }
    >
      <dt className={emphasized ? undefined : "text-muted-foreground"}>
        <Label className="text-xs">{label}</Label>
      </dt>
      <dd>
        <Label className="text-xs font-bold">
          {currencyFormatter.format(value)}
        </Label>
      </dd>
    </div>
  );
}

function QuotationFinalBillDetails({ products, sectionRef, onKeyDown }) {
  const taxTreatment = useSelector(selectQuotationTaxTreatment);
  const gstPercentage = useSelector(selectQuotationGstPercentage);
  const totals = calculateBillTotals(products, taxTreatment, gstPercentage);
  const isGujarat = taxTreatment === QUOTATION_TAX_TREATMENTS.GUJARAT;
  const isOutOfGujarat =
    taxTreatment === QUOTATION_TAX_TREATMENTS.OUT_OF_GUJARAT;

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      aria-labelledby="quotation-final-bill"
      onKeyDown={onKeyDown}
      className="grid gap-2 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <Label id="quotation-final-bill" className="font-semibold">
        Final bill details
      </Label>
      <div className="rounded-md border bg-muted/15 px-3 py-3">
        <dl className="grid w-full gap-2">
          <BillAmountRow label="Total sale price" value={totals.salePrice} />
          <BillAmountRow label="Total discount" value={totals.discount} />

          {isGujarat && (
            <>
              <BillAmountRow
                label={`CGST (${totals.gstRate / 2}%)`}
                value={totals.totalTax / 2}
              />
              <BillAmountRow
                label={`SGST (${totals.gstRate / 2}%)`}
                value={totals.totalTax / 2}
              />
            </>
          )}

          {isOutOfGujarat && (
            <BillAmountRow
              label={`IGST (${totals.gstRate}%)`}
              value={totals.totalTax}
            />
          )}

          <BillAmountRow
            label={
              taxTreatment === QUOTATION_TAX_TREATMENTS.SEZ_LUT
                ? "Total tax (No GST)"
                : "Total tax"
            }
            value={totals.totalTax}
          />
          <BillAmountRow
            label="Final bill amount"
            value={totals.finalAmount}
            emphasized
          />
        </dl>
      </div>
    </section>
  );
}

export default QuotationFinalBillDetails;
