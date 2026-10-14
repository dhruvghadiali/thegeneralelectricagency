import useUpdateQuotationPdf from "@screenComponent/quotations/edit/hooks/useUpdateQuotationPdf";
import QuotationSummary from "@screenComponent/quotations/form/quotationSummary";

function EditQuotationSummary() {
  const { isUpdating, updateAndDownloadPdf } = useUpdateQuotationPdf();

  return (
    <QuotationSummary
      title="Update Quotation"
      isSubmitting={isUpdating}
      onSubmit={updateAndDownloadPdf}
      submitLabel="Update quotation"
      submittingLabel="Updating..."
    />
  );
}

export default EditQuotationSummary;
