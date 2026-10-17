import { QUOTATION_TAX_TREATMENTS } from "@Enums";
import { PDF_COLORS } from "@screenComponent/quotations/downloadPdf/pdf/pdf.constants";
import {
  amountInWords,
  drawPdfCell,
  drawPdfText,
  numberOrZero,
  pdfMoneyFormatter,
} from "@screenComponent/quotations/downloadPdf/pdf/pdf.utils";

function taxRows(totals) {
  const gstRate = Math.max(numberOrZero(totals.gstPercentage), 0);

  if (totals.taxTreatment === QUOTATION_TAX_TREATMENTS.GUJARAT) {
    return [
      [`CGST (${gstRate / 2}%)`, totals.totalTax / 2],
      [`SGST (${gstRate / 2}%)`, totals.totalTax / 2],
    ];
  }

  if (totals.taxTreatment === QUOTATION_TAX_TREATMENTS.OUT_OF_GUJARAT) {
    return [[`IGST (${gstRate}%)`, totals.totalTax]];
  }

  return [];
}

export function getQuotationTotalsSectionHeight(taxTreatment) {
  const taxRowCount =
    taxTreatment === QUOTATION_TAX_TREATMENTS.GUJARAT
      ? 2
      : taxTreatment === QUOTATION_TAX_TREATMENTS.OUT_OF_GUJARAT
        ? 1
        : 0;

  return (2 + taxRowCount) * 7;
}

export function drawQuotationTotalsSection(doc, totals, startY) {
  const rows = [
    ["TOTAL AMOUNT", totals.amount],
    ...taxRows(totals),
    ["FINAL AMOUNT", totals.finalAmount],
  ];
  const totalsHeight = rows.length * 7;
  const amountWordsY = startY + Math.min(14, totalsHeight - 2);

  drawPdfCell(doc, 12, startY, 112, totalsHeight, { lineWidth: 0.35 });
  drawPdfText(doc, "Amount in Words:", 16, startY + 7, {
    bold: true,
    size: 8.5,
  });
  drawPdfText(doc, amountInWords(totals.finalAmount), 16, amountWordsY, {
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

  return startY + totalsHeight;
}
