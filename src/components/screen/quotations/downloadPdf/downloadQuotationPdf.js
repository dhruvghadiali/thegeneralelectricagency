import bonfiglioliLogoUrl from "@Assets/images/bonfiglioli-transparent.png";
import cgLogoUrl from "@Assets/images/cg-icon.png";
import companyLogoUrl from "@Assets/images/logo.png";
import eleconLogoUrl from "@Assets/images/elecon-transparent.png";
import premiumTransmissionLogoUrl from "@Assets/images/premium-transmission-icon.png";
import { imageUrlToDataUrl } from "@screenComponent/quotations/downloadPdf/pdf/pdf.utils";
import { createQuotationPdfSections } from "@screenComponent/quotations/downloadPdf/quotationPdfSections";

const PDF_IMAGE_URLS = {
  bonfiglioli: bonfiglioliLogoUrl,
  cg: cgLogoUrl,
  company: companyLogoUrl,
  elecon: eleconLogoUrl,
  premiumTransmission: premiumTransmissionLogoUrl,
};

async function loadPdfImages() {
  const imageEntries = await Promise.all(
    Object.entries(PDF_IMAGE_URLS).map(async ([name, url]) => {
      try {
        return [name, await imageUrlToDataUrl(url)];
      } catch {
        return [name, undefined];
      }
    }),
  );

  return Object.fromEntries(imageEntries);
}

export async function downloadQuotationPdf(quotation, { beforeSave } = {}) {
  const sections = createQuotationPdfSections(quotation);
  const pdfImages = await loadPdfImages();

  const { createQuotationPdfDocument } = await import(
    "@screenComponent/quotations/downloadPdf/pdf/createQuotationPdfDocument"
  );
  const { doc, quotationId } = createQuotationPdfDocument(sections, pdfImages);

  try {
    await beforeSave?.(quotationId);
  } finally {
    // Persisting the quotation and downloading its document are independent.
    // Keep the generated PDF available even when the API request fails.
    doc.save(`${quotationId.replaceAll("/", "-")}.pdf`);
  }

  return quotationId;
}
