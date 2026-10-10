import _ from "lodash";

import {
  PDF_BRAND,
  PDF_COLORS,
} from "@screenComponent/quotations/create/downloadPdf/pdf/pdf.constants";
import {
  drawPdfCell,
  drawPdfLabelLine,
  drawPdfText,
} from "@screenComponent/quotations/create/downloadPdf/pdf/pdf.utils";

export function drawQuotationTitle(doc, quotationId, generatedAt) {
  drawPdfCell(doc, 12, 10, 186, 14, {
    fill: PDF_COLORS.accent,
    lineWidth: 0.35,
  });
  drawPdfText(doc, "PRODUCT QUOTATION", 16, 19, {
    bold: true,
    color: PDF_COLORS.primary,
    size: 16,
  });
  drawPdfText(doc, quotationId, 194, 16, {
    bold: true,
    color: PDF_COLORS.primary,
    size: 7.5,
    align: "right",
  });
  drawPdfText(doc, generatedAt, 194, 21, {
    color: PDF_COLORS.muted,
    size: 7,
    align: "right",
  });
}

export function drawBrandHeader(doc, logoDataUrl) {
  drawPdfCell(doc, 12, 24, 186, 34, { lineWidth: 0.35 });

  if (logoDataUrl) {
    doc.addImage(logoDataUrl, "PNG", 18, 30, 22, 22, undefined, "FAST");
  }

  drawPdfText(doc, PDF_BRAND.name, 46, 32, { bold: true, size: 15 });
  drawPdfText(doc, PDF_BRAND.addressLine1, 46, 39, {
    color: PDF_COLORS.muted,
    size: 7.5,
  });
  drawPdfText(doc, PDF_BRAND.addressLine2, 46, 44, {
    color: PDF_COLORS.muted,
    size: 7.5,
  });
  drawPdfText(
    doc,
    `${PDF_BRAND.email}  |  ${PDF_BRAND.phone}  |  GSTIN: ${PDF_BRAND.gst}`,
    46,
    52,
    { color: PDF_COLORS.muted, size: 6.6 },
  );
}

export function drawCompanySection(doc, company, y = 62) {
  drawPdfCell(doc, 12, y, 186, 25, { lineWidth: 0.35 });
  drawPdfLabelLine(doc, "Company:", _.toUpper(company.name), 16, y + 7, 33);
  drawPdfText(doc, "Address:", 16, y + 13, { bold: true, size: 8 });
  drawPdfText(doc, company.address1 || "To be confirmed", 33, y + 13, {
    size: 7.5,
    maxWidth: 67,
  });
  drawPdfLabelLine(doc, "Email:", company.email, 112, y + 6, 127);
  drawPdfLabelLine(doc, "Phone:", company.phone, 112, y + 12, 127);
  drawPdfLabelLine(doc, "GSTIN:", company.gstNumber, 112, y + 18, 127);
}
