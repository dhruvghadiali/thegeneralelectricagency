import _ from "lodash";

import { QUOTATION_TAX_TREATMENTS } from "@Enums";
import {
  PDF_BRAND,
  PDF_COLORS,
  PDF_WARRANTY_TEXT,
} from "@screenComponent/quotations/downloadPdf/pdf/pdf.constants";
import {
  drawPdfCell,
  drawPdfLabelLine,
  drawPdfText,
  numberOrZero,
} from "@screenComponent/quotations/downloadPdf/pdf/pdf.utils";

function taxTerm(taxTreatment) {
  if (taxTreatment === QUOTATION_TAX_TREATMENTS.GUJARAT) {
    return "2. GST is split equally between CGST and SGST.";
  }

  if (taxTreatment === QUOTATION_TAX_TREATMENTS.OUT_OF_GUJARAT) {
    return "2. GST is applied as IGST for this quotation.";
  }

  if (taxTreatment === QUOTATION_TAX_TREATMENTS.SEZ_LUT) {
    return "2. Supply is without GST under LUT/Bond.";
  }

  return "2. The final amount includes the GST shown above.";
}

function drawCommercialDetails(doc, startY, commercial) {
  drawPdfCell(doc, 12, startY, 186, 6, { fill: PDF_COLORS.secondary });
  drawPdfText(doc, "COMMERCIAL DETAILS", 16, startY + 4.4, {
    bold: true,
    size: 7.5,
  });

  const gstPercentage =
    commercial.taxTreatment === QUOTATION_TAX_TREATMENTS.SEZ_LUT
      ? 0
      : numberOrZero(commercial.gstPercentage);
  const details = [
    `GST - As Actual (${gstPercentage}%)`,
    `Delivery - ${_.toUpper(commercial.deliveryNotes?.trim()) || "-"}`,
    `Payment - ${_.toUpper(commercial.paymentNotes?.trim()) || "-"}`,
  ];

  details.forEach((detail, index) => {
    const columnX = 12 + index * 62;
    drawPdfCell(doc, columnX, startY + 6, 62, 8, {
      fill: index % 2 === 0 ? PDF_COLORS.surface : PDF_COLORS.white,
      lineWidth: 0.35,
    });
    drawPdfText(doc, detail, columnX + 31, startY + 11.3, {
      bold: true,
      size: 7,
      align: "center",
      maxWidth: 58,
    });
  });
}

function drawBankAndTerms(doc, startY, taxTreatment) {
  drawPdfCell(doc, 12, startY, 91, 27, { lineWidth: 0.35 });
  drawPdfCell(doc, 12, startY, 91, 6, { fill: PDF_COLORS.secondary });
  drawPdfText(doc, "BANK DETAILS", 16, startY + 4.4, {
    bold: true,
    size: 7.5,
  });
  drawPdfLabelLine(doc, "Account Name:", PDF_BRAND.name, 16, startY + 10.8, 38);
  drawPdfLabelLine(doc, "Bank Name:", PDF_BRAND.bankName, 16, startY + 15.8, 38);
  drawPdfLabelLine(
    doc,
    "A/C. No.:",
    PDF_BRAND.accountNumber,
    16,
    startY + 20.8,
    38,
  );
  drawPdfLabelLine(doc, "IFSC Code:", PDF_BRAND.ifscCode, 16, startY + 25.8, 38);

  drawPdfCell(doc, 106, startY, 92, 27, { lineWidth: 0.35 });
  drawPdfCell(doc, 106, startY, 92, 6, { fill: PDF_COLORS.secondary });
  drawPdfText(doc, "TERMS & CONDITIONS", 110, startY + 4.4, {
    bold: true,
    size: 7.5,
  });

  const terms = [
    "1. Fixed discounts apply to each selected unit.",
    taxTerm(taxTreatment),
    "3. Availability and delivery require confirmation.",
    "4. Commercial terms remain subject to final order.",
    "5. Make All Cheques Payable To The Company Name.",
  ];

  terms.forEach((term, index) =>
    drawPdfText(doc, term, 110, startY + 11 + index * 3.8, { size: 6.1 }),
  );
}

function drawDeclaration(doc, startY) {
  drawPdfCell(doc, 12, startY, 186, 20, { lineWidth: 0.35 });
  drawPdfCell(doc, 12, startY, 186, 6, { fill: PDF_COLORS.secondary });
  drawPdfText(doc, "DECLARATION", 16, startY + 4.4, {
    bold: true,
    size: 7.5,
  });
  drawPdfText(
    doc,
    "We declare that this quotation reflects the selected products, quantities and commercial values. It is not a tax invoice and remains subject to final order confirmation.",
    16,
    startY + 10,
    { size: 6.2, maxWidth: 176 },
  );
  drawPdfText(doc, PDF_WARRANTY_TEXT, 16, startY + 15.5, {
    bold: true,
    color: PDF_COLORS.primary,
    size: 6.2,
    maxWidth: 176,
  });
}

function drawAuthorization(doc, startY) {
  const columnWidth = 93;
  const leftCenter = 12 + columnWidth / 2;
  const rightCenter = 105 + columnWidth / 2;

  drawPdfCell(doc, 12, startY, 186, 18, { lineWidth: 0.35 });
  drawPdfCell(doc, 12, startY, 186, 6, { fill: PDF_COLORS.secondary });
  drawPdfText(doc, "AUTHORISATION", 16, startY + 4.4, {
    bold: true,
    size: 7.5,
  });
  drawPdfCell(doc, 12, startY + 6, columnWidth, 12, {
    fill: PDF_COLORS.surface,
    lineWidth: 0.35,
  });
  drawPdfCell(doc, 105, startY + 6, columnWidth, 12, { lineWidth: 0.35 });
  drawPdfText(doc, "HARIKESH PATEL", leftCenter, startY + 11, {
    align: "center",
    bold: true,
    size: 7.2,
  });
  drawPdfText(doc, "Authorised Person", leftCenter, startY + 15.2, {
    align: "center",
    color: PDF_COLORS.muted,
    size: 6.5,
  });
  drawPdfText(doc, "THE GENERAL ELECTRIC STORES", rightCenter, startY + 11, {
    align: "center",
    bold: true,
    size: 7.2,
  });
  drawPdfText(doc, "Authorised Signature", rightCenter, startY + 15.2, {
    align: "center",
    color: PDF_COLORS.muted,
    size: 6.5,
  });
}

function drawClosingMessage(doc, startY) {
  drawPdfCell(doc, 12, startY, 186, 14, {
    fill: PDF_COLORS.accent,
    lineWidth: 0.35,
  });
  drawPdfText(doc, "Thank You For Your Business!", 105, startY + 5.2, {
    bold: true,
    color: PDF_COLORS.primary,
    size: 8,
    align: "center",
  });
  drawPdfText(
    doc,
    "Should You Have Any Enquiries Concerning This Quote, Please Contact Us",
    105,
    startY + 10.3,
    { color: PDF_COLORS.muted, size: 6.7, align: "center" },
  );
}

export function drawQuotationCommercialSection(doc, startY, commercial) {
  drawCommercialDetails(doc, startY, commercial);

  const informationY = startY + 16;
  drawBankAndTerms(doc, informationY, commercial.taxTreatment);

  const declarationY = informationY + 29;
  drawDeclaration(doc, declarationY);

  const authorizationY = declarationY + 22;
  drawAuthorization(doc, authorizationY);
  drawClosingMessage(doc, authorizationY + 20);
}
