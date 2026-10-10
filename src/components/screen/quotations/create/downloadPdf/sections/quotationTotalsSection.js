import { QUOTATION_TAX_TREATMENTS } from "@Enums";
import { PDF_COLORS } from "@screenComponent/quotations/create/downloadPdf/pdf/pdf.constants";
import {
  amountInWords,
  drawPdfCell,
  drawPdfText,
  numberOrZero,
  pdfMoneyFormatter,
} from "@screenComponent/quotations/create/downloadPdf/pdf/pdf.utils";
import { drawQuotationCommercialSection } from "@screenComponent/quotations/create/downloadPdf/sections/quotationCommercialSection";

function taxRows(totals, taxTreatment, gstPercentage) {
  const gstRate = Math.max(numberOrZero(gstPercentage), 0);

  if (taxTreatment === QUOTATION_TAX_TREATMENTS.GUJARAT) {
    return [
      [`CGST (${gstRate / 2}%)`, totals.totalTax / 2],
      [`SGST (${gstRate / 2}%)`, totals.totalTax / 2],
    ];
  }

  if (taxTreatment === QUOTATION_TAX_TREATMENTS.OUT_OF_GUJARAT) {
    return [[`IGST (${gstRate}%)`, totals.totalTax]];
  }

  return [["SEZ LUT (No GST)", 0]];
}

export function getQuotationTotalsSectionHeight(taxTreatment) {
  const taxRowCount =
    taxTreatment === QUOTATION_TAX_TREATMENTS.GUJARAT ? 2 : 1;
  const totalRowCount = 4 + taxRowCount;

  return totalRowCount * 7 + 117;
}

export function drawQuotationTotalsSection(
  doc,
  totals,
  startY,
  commercial,
) {
  const rows = [
    ["Sub Total", totals.subtotal],
    ["Total Discount", totals.totalDiscount > 0 ? -totals.totalDiscount : 0],
    ["Taxable Amount", totals.taxableAmount],
    ...taxRows(totals, commercial.taxTreatment, commercial.gstPercentage),
    ["FINAL AMOUNT", totals.finalAmount],
  ];
  const totalsHeight = rows.length * 7;

  drawPdfCell(doc, 12, startY, 112, totalsHeight, { lineWidth: 0.35 });
  drawPdfText(doc, "Amount in Words:", 16, startY + 7, {
    bold: true,
    size: 8.5,
  });
  drawPdfText(doc, amountInWords(totals.finalAmount), 16, startY + 14, {
    size: 7.5,
    maxWidth: 102,
  });

  rows.forEach(([label, value], index) => {
    const rowY = startY + index * 7;
    const isFinal = index === rows.length - 1;

    drawPdfCell(doc, 124, rowY, 48, 7, {
      fill: isFinal ? PDF_COLORS.primary : PDF_COLORS.white,
      lineWidth: 0.35,
    });
    drawPdfCell(doc, 172, rowY, 26, 7, {
      fill: isFinal ? PDF_COLORS.accent : PDF_COLORS.surface,
      lineWidth: 0.35,
    });
    drawPdfText(doc, label, 170, rowY + 4.8, {
      bold: true,
      color: isFinal ? PDF_COLORS.white : PDF_COLORS.ink,
      size: 7,
      align: "right",
    });
    drawPdfText(doc, pdfMoneyFormatter.format(value), 175, rowY + 4.8, {
      bold: isFinal,
      size: 6.8,
    });
  });

  drawQuotationCommercialSection(
    doc,
    startY + totalsHeight + 3,
    commercial,
  );
}
