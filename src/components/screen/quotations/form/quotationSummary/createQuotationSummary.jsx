import useDownloadQuotationPdf from "@screenComponent/quotations/downloadPdf";
import QuotationPdfDiscountDialog from "@screenComponent/quotations/dialogs/quotationPdfDiscountDialog";
import QuotationSummary from "@screenComponent/quotations/form/quotationSummary";

function CreateQuotationSummary() {
  const { discountDialog, generatePdf, isGenerating } =
    useDownloadQuotationPdf();

  return (
    <>
      <QuotationSummary
        title="Quotation Summary"
        isSubmitting={isGenerating}
        onSubmit={generatePdf}
        submitLabel="Submit"
        submittingLabel="Generating PDF..."
      />
      <QuotationPdfDiscountDialog {...discountDialog} />
    </>
  );
}

export default CreateQuotationSummary;
