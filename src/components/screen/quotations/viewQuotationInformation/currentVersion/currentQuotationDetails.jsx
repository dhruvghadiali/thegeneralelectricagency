import QuotationOverview from "@screenComponent/quotations/viewQuotationInformation/currentVersion/quotationOverview";
import QuotationDetails from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/quotationDetails";

function CurrentQuotationDetails({
  quotation,
  changes,
  showUpdatedMetadata = true,
}) {
  return (
    <div className="grid gap-4 sm:gap-6">
      <QuotationOverview
        quotation={quotation}
        showUpdatedMetadata={showUpdatedMetadata}
      />
      <QuotationDetails quotation={quotation} changes={changes} />
    </div>
  );
}

export default CurrentQuotationDetails;
