import Detail from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/detail";
import UpdatedMark from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/updatedMark";
import QuotationProducts from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/quotationProducts";

import {
  displayValue,
  formatMoney,
  getQuotationTotals,
  getTaxTreatmentLabel,
} from "@screenComponent/quotations/viewQuotationInformation/viewQuotationInformation.utils";

function QuotationDetails({ quotation, changes }) {
  const products = quotation.productInformation ?? [];
  const totals = getQuotationTotals(quotation);
  const changedFields = changes?.fields ?? new Set();

  return (
    <div className="grid gap-6">
      <QuotationProducts products={products} changes={changes} />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <dl className="grid gap-4 rounded-lg bg-muted/30 p-4 sm:grid-cols-2">
          <Detail
            label="Tax treatment"
            changed={changedFields.has("taxTreatment")}
          >
            {getTaxTreatmentLabel(quotation.taxTreatment)}
          </Detail>
          <Detail label="GST rate" changed={changedFields.has("gstPercentage")}>
            {quotation.gstPercentage ? `${quotation.gstPercentage}%` : "—"}
          </Detail>
          <Detail
            label="Delivery notes"
            changed={changedFields.has("deliveryNotes")}
          >
            {displayValue(quotation.deliveryNotes)}
          </Detail>
          <Detail
            label="Payment notes"
            changed={changedFields.has("paymentNotes")}
          >
            {displayValue(quotation.paymentNotes)}
          </Detail>
          <Detail label="Notes" changed={changedFields.has("notes")}>
            {displayValue(quotation.notes)}
          </Detail>
        </dl>
        <dl
          className={
            changedFields.has("products") ||
            changedFields.has("gstPercentage") ||
            changedFields.has("taxTreatment")
              ? "grid gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm"
              : "grid gap-2 rounded-lg border p-4 text-sm"
          }
        >
          <div className="mb-1 flex items-center justify-between gap-4 font-semibold">
            <dt>Financial summary</dt>
            <dd>
              {(changedFields.has("products") ||
                changedFields.has("gstPercentage") ||
                changedFields.has("taxTreatment")) && <UpdatedMark />}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Sale price</dt>
            <dd>{formatMoney(totals.salePrice)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Discount</dt>
            <dd>{formatMoney(totals.discount)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Tax</dt>
            <dd>{formatMoney(totals.totalTax)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t pt-2 font-semibold">
            <dt>Final amount</dt>
            <dd>{formatMoney(totals.finalAmount)}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default QuotationDetails;
