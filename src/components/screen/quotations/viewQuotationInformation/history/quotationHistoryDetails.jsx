import QuotationDetails from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/quotationDetails";

function QuotationHistoryDetails({ contentId, entry }) {
  return (
    <div
      id={contentId}
      role="region"
      aria-label={`${entry.quotationVersion} details`}
      className="border-t p-4 sm:p-5"
    >
      <QuotationDetails quotation={entry} changes={entry.changes} />
    </div>
  );
}

export default QuotationHistoryDetails;
