import { useSelector } from "react-redux";

import { selectQuotationEditSource } from "@Redux/quotation/quotation.selector";
import useUpdateQuotationPdf from "@screenComponent/quotations/edit/hooks/useUpdateQuotationPdf";
import QuotationSummary from "@screenComponent/quotations/form/quotationSummary";

function EditQuotationSummary() {
  const { quotationReference } = useSelector(selectQuotationEditSource);
  const { isUpdating, updateAndDownloadPdf } = useUpdateQuotationPdf();

  return (
    <QuotationSummary
      title="Update Quotation"
      quotationNumber={quotationReference}
      isSubmitting={isUpdating}
      onSubmit={updateAndDownloadPdf}
      submitLabel="Update quotation"
      submittingLabel="Updating..."
    />
  );
}

export default EditQuotationSummary;
