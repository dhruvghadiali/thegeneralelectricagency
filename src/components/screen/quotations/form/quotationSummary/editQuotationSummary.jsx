import { useSelector } from "react-redux";

import { selectQuotationEditSource } from "@Redux/quotation/quotation.selector";
import QuotationPdfDiscountDialog from "@screenComponent/quotations/dialogs/quotationPdfDiscountDialog";
import useUpdateQuotationPdf from "@screenComponent/quotations/edit/hooks/useUpdateQuotationPdf";
import QuotationSummary from "@screenComponent/quotations/form/quotationSummary";

function EditQuotationSummary() {
  const { quotationReference } = useSelector(selectQuotationEditSource);
  const { discountDialog, isUpdating, updateAndDownloadPdf } =
    useUpdateQuotationPdf();

  return (
    <>
      <QuotationSummary
        title="Update Quotation"
        quotationNumber={quotationReference}
        isSubmitting={isUpdating}
        onSubmit={updateAndDownloadPdf}
        submitLabel="Update quotation"
        submittingLabel="Updating..."
      />
      <QuotationPdfDiscountDialog {...discountDialog} />
    </>
  );
}

export default EditQuotationSummary;
