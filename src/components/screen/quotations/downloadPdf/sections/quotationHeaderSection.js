import _ from "lodash";

import {
  PDF_BRAND,
  PDF_COLORS,
} from "@screenComponent/quotations/downloadPdf/pdf/pdf.constants";
import {
  drawPdfCell,
  drawPdfLabelLine,
  drawPdfText,
} from "@screenComponent/quotations/downloadPdf/pdf/pdf.utils";

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

export function drawBrandHeader(doc, logoDataUrl, enquiryContact = {}) {
  const enquiryDetails = _.compact([
    enquiryContact.name === "-" ? "" : enquiryContact.name,
    enquiryContact.phone === "-" ? "" : enquiryContact.phone,
  ]).join(" | ");

  drawPdfCell(doc, 12, 24, 186, 27, { lineWidth: 0.35 });

  if (logoDataUrl) {
    doc.addImage(logoDataUrl, "PNG", 18, 29.5, 16, 16, undefined, "FAST");
  }

  drawPdfText(doc, PDF_BRAND.name, 43, 32.5, { bold: true, size: 13.5 });
  drawPdfText(doc, PDF_BRAND.address, 43, 37.8, {
    color: PDF_COLORS.muted,
    maxWidth: 117,
    size: 5.8,
  });
  drawPdfText(doc, PDF_BRAND.bharuchAddress, 43, 41.8, {
    color: PDF_COLORS.muted,
    maxWidth: 117,
    size: 5.8,
  });
  drawPdfText(
    doc,
    `${PDF_BRAND.email}  |  ${PDF_BRAND.phone}  |  GSTIN: ${PDF_BRAND.gst}`,
    43,
    46.2,
    { color: PDF_COLORS.muted, maxWidth: 106, size: 6.2 },
  );

  drawPdfText(doc, "FOR ANY ENQUIRY", 194, 39.2, {
    align: "right",
    bold: true,
    color: PDF_COLORS.primary,
    size: 6.2,
  });
  drawPdfText(doc, enquiryDetails || "-", 194, 45.2, {
    align: "right",
    bold: true,
    size: 6.5,
  });
}

export function drawCompanySection(doc, company, y = 54) {
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
