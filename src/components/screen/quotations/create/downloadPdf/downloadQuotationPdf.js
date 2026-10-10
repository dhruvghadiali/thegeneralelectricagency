import companyLogoUrl from "@Assets/images/logo.png";
import { imageUrlToDataUrl } from "@screenComponent/quotations/create/downloadPdf/pdf/pdf.utils";
import { createQuotationPdfSections } from "@screenComponent/quotations/create/downloadPdf/quotationPdfSections";

export async function downloadQuotationPdf(quotation) {
  const sections = createQuotationPdfSections(quotation);
  let logoDataUrl;

  try {
    logoDataUrl = await imageUrlToDataUrl(companyLogoUrl);
  } catch {
    logoDataUrl = undefined;
  }

  const { createQuotationPdfDocument } = await import(
    "@screenComponent/quotations/create/downloadPdf/pdf/createQuotationPdfDocument"
  );
  const { doc, quotationId } = createQuotationPdfDocument(
    sections,
    logoDataUrl,
  );

  doc.save(`${quotationId}.pdf`);
}
