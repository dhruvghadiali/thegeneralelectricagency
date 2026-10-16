import { QUOTATION_TAX_TREATMENTS } from "@Enums";
import { formatMoney } from "@screenComponent/quotations/viewQuotationInformation/viewQuotationInformation.utils";

function TaxRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{formatMoney(value)}</dd>
    </div>
  );
}

function QuotationTaxBreakdown({ taxTreatment, totals }) {
  if (taxTreatment === QUOTATION_TAX_TREATMENTS.GUJARAT) {
    return (
      <>
        <TaxRow
          label={`CGST (${totals.gstRate / 2}%)`}
          value={totals.totalTax / 2}
        />
        <TaxRow
          label={`SGST (${totals.gstRate / 2}%)`}
          value={totals.totalTax / 2}
        />
      </>
    );
  }

  if (taxTreatment === QUOTATION_TAX_TREATMENTS.OUT_OF_GUJARAT) {
    return (
      <TaxRow
        label={`IGST (${totals.gstRate}%)`}
        value={totals.totalTax}
      />
    );
  }

  if (taxTreatment === QUOTATION_TAX_TREATMENTS.SEZ_LUT) {
    return null;
  }

  return <TaxRow label="Tax" value={totals.totalTax} />;
}

export default QuotationTaxBreakdown;

