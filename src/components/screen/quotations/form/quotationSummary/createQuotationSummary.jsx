import useDownloadQuotationPdf from "@screenComponent/quotations/downloadPdf";
import QuotationSummary from "@screenComponent/quotations/form/quotationSummary";

function CreateQuotationSummary() {
  const { generatePdf, isGenerating } = useDownloadQuotationPdf();

  return (
    <QuotationSummary
      title="Quotation Summary"
      isSubmitting={isGenerating}
      onSubmit={generatePdf}
      submitLabel="Submit"
      submittingLabel="Generating PDF..."
    />
  );
}

export default CreateQuotationSummary;
