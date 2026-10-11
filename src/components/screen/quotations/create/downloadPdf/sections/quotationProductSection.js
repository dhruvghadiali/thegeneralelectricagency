import _ from "lodash";

import { PDF_COLORS } from "@screenComponent/quotations/create/downloadPdf/pdf/pdf.constants";
import {
  calculatePdfPricing,
  drawPdfCell,
  drawPdfText,
  pdfMoneyFormatter,
  titleCase,
} from "@screenComponent/quotations/create/downloadPdf/pdf/pdf.utils";

const PRODUCT_COLUMNS = [12, 70, 32, 16, 30, 26];
const PRODUCT_HEADERS = [
  ["SL.", "NO."],
  ["DESCRIPTION"],
  ["HSN"],
  ["QTY"],
  ["PRICE", "/ UNIT"],
  ["AMOUNT"],
];

function drawTableHeader(doc, lines, x, y, width) {
  drawPdfCell(doc, x, y, width, 11, { fill: PDF_COLORS.secondary });
  const lineHeight = 4.5;
  const startY = y + 11 / 2 - ((lines.length - 1) * lineHeight) / 2 + 1.5;

  lines.forEach((line, index) =>
    drawPdfText(doc, line, x + width / 2, startY + index * lineHeight, {
      bold: true,
      size: 8,
      align: "center",
    }),
  );
}

function productRowLayout(doc, item) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.5);
  const nameLines = doc.splitTextToSize(
    _.toUpper(item.product.name) || "-",
    57,
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(5.8);
  const descriptionLines = doc.splitTextToSize(
    item.product.description || titleCase(item.product.category),
    57,
  );
  const contentHeight = nameLines.length * 2.8 + descriptionLines.length * 2.5;

  return {
    nameLines,
    descriptionLines,
    height: Math.max(9, contentHeight + 3),
  };
}

export function getProductTableHeight(doc, items) {
  return (
    11 +
    items.reduce(
      (height, item) => height + productRowLayout(doc, item).height,
      0,
    )
  );
}

export function getPageProducts(doc, items, startIndex, maxTableHeight) {
  const pageProducts = [];
  let height = 11;

  for (let index = startIndex; index < items.length; index += 1) {
    const rowHeight = productRowLayout(doc, items[index]).height;
    if (pageProducts.length > 0 && height + rowHeight > maxTableHeight) break;

    pageProducts.push(items[index]);
    height += rowHeight;
  }

  return pageProducts;
}

export function drawProductSection(doc, items, startY, startIndex = 0) {
  let columnX = 12;

  PRODUCT_HEADERS.forEach((lines, index) => {
    drawTableHeader(doc, lines, columnX, startY, PRODUCT_COLUMNS[index]);
    columnX += PRODUCT_COLUMNS[index];
  });

  const centers = [];
  let runningX = 12;

  PRODUCT_COLUMNS.forEach((columnWidth) => {
    centers.push(runningX + columnWidth / 2);
    runningX += columnWidth;
  });

  let rowY = startY + 11;

  items.forEach((item, rowIndex) => {
    const layout = productRowLayout(doc, item);
    const pricing = calculatePdfPricing(item.pricing);
    columnX = 12;

    PRODUCT_COLUMNS.forEach((columnWidth, columnIndex) => {
      drawPdfCell(doc, columnX, rowY, columnWidth, layout.height, {
        fill: columnIndex % 2 === 0 ? PDF_COLORS.surface : PDF_COLORS.white,
      });
      columnX += columnWidth;
    });

    const centerY = rowY + layout.height / 2 + 1;
    drawPdfText(doc, startIndex + rowIndex + 1, centers[0], centerY, {
      align: "center",
      size: 6.8,
    });
    drawPdfText(doc, layout.nameLines, 27, rowY + 3.6, {
      bold: true,
      size: 6.5,
    });
    drawPdfText(
      doc,
      layout.descriptionLines,
      27,
      rowY + 3.6 + layout.nameLines.length * 2.8,
      { color: PDF_COLORS.muted, size: 5.8 },
    );
    drawPdfText(
      doc,
      _.toUpper(item.product.hsnCode) || "-",
      centers[2],
      centerY,
      { align: "center", size: 6.3 },
    );
    drawPdfText(doc, pricing.quantity, centers[3], centerY, {
      align: "center",
      size: 6.5,
    });
    drawPdfText(
      doc,
      pdfMoneyFormatter.format(pricing.unitPrice),
      centers[4],
      centerY,
      { align: "center", size: 6.2 },
    );
    drawPdfText(
      doc,
      pdfMoneyFormatter.format(pricing.subtotal),
      centers[5],
      centerY,
      { align: "center", size: 6.2 },
    );

    rowY += layout.height;
  });

  return rowY;
}
