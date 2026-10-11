import {
  PDF_BRAND,
  PDF_COLORS,
  PDF_PAGE,
} from "@screenComponent/quotations/create/downloadPdf/pdf/pdf.constants";
import {
  drawPdfCell,
  drawPdfText,
} from "@screenComponent/quotations/create/downloadPdf/pdf/pdf.utils";

export function drawQuotationFooter(doc, page, pageCount) {
  drawPdfCell(
    doc,
    PDF_PAGE.left,
    PDF_PAGE.footerY,
    PDF_PAGE.contentWidth,
    7,
    { fill: PDF_COLORS.accent, lineWidth: 0.35 },
  );
  const footerTextY = PDF_PAGE.footerY + 4.5;

  drawPdfText(doc, PDF_BRAND.email, 16, footerTextY, { size: 6.5 });
  drawPdfText(doc, `Page ${page} of ${pageCount}`, 194, footerTextY, {
    size: 6.5,
    align: "right",
  });
}
