import Detail from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/detail";

import {
  displayValue,
  formatQuotationDate,
} from "@screenComponent/quotations/viewQuotationInformation/viewQuotationInformation.utils";

function QuotationOverview({ quotation, showUpdatedMetadata = true }) {
  if (!showUpdatedMetadata) return null;

  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold">Quotation overview</h3>
      <dl className="grid gap-4 sm:grid-cols-2">
        <Detail label="Last updated by">
          {displayValue(quotation.updatedBy?.name)}
        </Detail>
        <Detail label="Last updated at">
          {formatQuotationDate(quotation.updatedAt)}
        </Detail>
      </dl>
    </section>
  );
}

export default QuotationOverview;
