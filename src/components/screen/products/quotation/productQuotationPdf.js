import { jsPDF } from "jspdf";

const BRAND = Object.freeze({
  name: "The General Electric Stores",
  addressLine1: "6, Ganesh Shopping Centre, Opp. Dr. Beck & Co., G.I.D.C.,",
  addressLine2: "Ankleshwar, Gujarat 393002, India",
  email: "generalagenc@gmail.com",
  phone: "+91 78743 49006",
  gst: "24AABFT1083B1ZR",
  pan: "AABFT1083B",
});

const COLORS = Object.freeze({
  primary: [22, 72, 99],
  primaryDark: [15, 47, 70],
  secondary: [155, 190, 200],
  accent: [238, 244, 248],
  surface: [247, 249, 251],
  ink: [15, 33, 53],
  muted: [71, 85, 105],
  line: [91, 125, 140],
  white: [255, 255, 255],
});

const moneyFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberOrZero = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

function calculatePricing(pricing) {
  const quantity = Math.max(Math.floor(numberOrZero(pricing.quantity)), 1);
  const unitPrice = Math.max(numberOrZero(pricing.salePrice), 0);
  const discountPerUnit = Math.min(
    Math.max(numberOrZero(pricing.discountAmount), 0),
    unitPrice,
  );
  const gstPercentage = Math.min(
    Math.max(numberOrZero(pricing.gstPercentage), 0),
    100,
  );
  const subtotal = unitPrice * quantity;
  const totalDiscount = discountPerUnit * quantity;
  const taxableAmount = subtotal - totalDiscount;
  const gstAmount = taxableAmount * (gstPercentage / 100);

  return {
    quantity,
    unitPrice,
    discountPerUnit,
    gstPercentage,
    subtotal,
    totalDiscount,
    taxableAmount,
    gstAmount,
    grandTotal: taxableAmount + gstAmount,
  };
}

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function underThousand(value) {
  const number = Math.floor(value);
  const parts = [];
  if (number >= 100) {
    parts.push(`${ONES[Math.floor(number / 100)]} Hundred`);
  }
  const remainder = number % 100;
  if (remainder < 20) {
    if (remainder) parts.push(ONES[remainder]);
  } else {
    parts.push(`${TENS[Math.floor(remainder / 10)]}${remainder % 10 ? ` ${ONES[remainder % 10]}` : ""}`);
  }
  return parts.join(" ");
}

function integerToIndianWords(value) {
  let number = Math.floor(Math.abs(value));
  if (number === 0) return "Zero";

  const groups = [
    { value: 10000000, label: "Crore" },
    { value: 100000, label: "Lakh" },
    { value: 1000, label: "Thousand" },
  ];
  const parts = [];
  groups.forEach((group) => {
    if (number >= group.value) {
      const count = Math.floor(number / group.value);
      parts.push(`${integerToIndianWords(count)} ${group.label}`);
      number %= group.value;
    }
  });
  if (number) parts.push(underThousand(number));
  return parts.join(" ");
}

function amountInWords(value) {
  const amount = Math.max(numberOrZero(value), 0);
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  return `Rupees ${integerToIndianWords(rupees)}${paise ? ` and ${integerToIndianWords(paise)} Paise` : ""} Only`;
}

function quoteNumber(product, productCount = 1) {
  const date = new Date();
  const stamp = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("");
  const code =
    productCount > 1
      ? `MULTI${productCount}`
      : String(product.productCode || "PRODUCT")
          .replace(/[^a-z0-9]/gi, "")
          .slice(0, 12)
          .toUpperCase();
  return `Q-${stamp}-${code}`;
}

const titleCase = (value) =>
  String(value ?? "")
    .split("_")
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ") || "Not specified";

function drawCell(doc, x, y, width, height, options = {}) {
  const { fill, lineWidth = 0.2 } = options;
  doc.setLineWidth(lineWidth);
  doc.setDrawColor(...COLORS.line);
  if (fill) {
    doc.setFillColor(...fill);
    doc.rect(x, y, width, height, "FD");
  } else {
    doc.rect(x, y, width, height, "S");
  }
}

function drawText(doc, text, x, y, options = {}) {
  const {
    bold = false,
    color = COLORS.ink,
    size = 8.5,
    align = "left",
    maxWidth,
  } = options;
  doc.setFont("helvetica", bold ? "bold" : "normal");
  doc.setFontSize(size);
  doc.setTextColor(...color);
  if (maxWidth) {
    doc.text(doc.splitTextToSize(String(text), maxWidth), x, y, { align });
  } else {
    doc.text(String(text), x, y, { align });
  }
}

function drawLabelLine(doc, label, value, x, y, valueX = x + 25) {
  drawText(doc, label, x, y, { bold: true, size: 8 });
  drawText(doc, value || "-", valueX, y, { size: 8 });
}

function drawTableHeader(doc, label, x, y, width, height, options = {}) {
  const { lines = [label] } = options;
  drawCell(doc, x, y, width, height, { fill: COLORS.secondary });
  const lineHeight = 4.5;
  const startY = y + height / 2 - ((lines.length - 1) * lineHeight) / 2 + 1.5;
  lines.forEach((line, index) =>
    drawText(doc, line, x + width / 2, startY + index * lineHeight, {
      bold: true,
      size: 8,
      align: "center",
    }),
  );
}

function imageUrlToDataUrl(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error("Unable to load quotation logo.");
      return response.blob();
    })
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        }),
    );
}

function billToDetails(company) {
  const primaryAddress = company?.addresses?.[0];
  const address = [primaryAddress?.address, primaryAddress?.pincode]
    .filter(Boolean)
    .join(" - ");

  return {
    name: company?.name || "Valued Client",
    address: address || "To be confirmed",
    phone: company?.phone || "-",
    email: company?.email || "-",
    gst: company?.gstNumber || "-",
  };
}

function normalizeQuotationItems(productOrItems, pricing) {
  const source = Array.isArray(productOrItems)
    ? productOrItems
    : [{ product: productOrItems, pricing }];

  return source
    .map((item) => ({
      product: item.product ?? item,
      pricing: item.pricing ?? item,
    }))
    .filter((item) => item.product);
}

function aggregatePricing(items) {
  return items.reduce(
    (summary, item) => {
      const totals = calculatePricing(item.pricing);
      summary.quantity += totals.quantity;
      summary.subtotal += totals.subtotal;
      summary.totalDiscount += totals.totalDiscount;
      summary.taxableAmount += totals.taxableAmount;
      summary.gstAmount += totals.gstAmount;
      summary.grandTotal += totals.grandTotal;
      return summary;
    },
    {
      quantity: 0,
      subtotal: 0,
      totalDiscount: 0,
      taxableAmount: 0,
      gstAmount: 0,
      grandTotal: 0,
    },
  );
}

function drawQuotationTitle(doc, quotationId, generatedAt) {
  drawCell(doc, 12, 10, 186, 14, { fill: COLORS.accent, lineWidth: 0.35 });
  drawText(doc, "PRODUCT QUOTATION", 16, 19, {
    bold: true,
    color: COLORS.primary,
    size: 16,
  });
  drawText(doc, quotationId, 194, 16, {
    bold: true,
    color: COLORS.primary,
    size: 7.5,
    align: "right",
  });
  drawText(doc, generatedAt, 194, 21, {
    color: COLORS.muted,
    size: 7,
    align: "right",
  });
}

function drawBrandHeader(doc, logoDataUrl) {
  drawCell(doc, 12, 24, 186, 34, { lineWidth: 0.35 });
  if (logoDataUrl) {
    doc.addImage(logoDataUrl, "PNG", 18, 30, 22, 22, undefined, "FAST");
  }
  drawText(doc, BRAND.name, 46, 32, { bold: true, size: 15 });
  drawText(doc, BRAND.addressLine1, 46, 39, {
    color: COLORS.muted,
    size: 7.5,
  });
  drawText(doc, BRAND.addressLine2, 46, 44, {
    color: COLORS.muted,
    size: 7.5,
  });
  drawText(
    doc,
    `${BRAND.email}  |  ${BRAND.phone}  |  GSTIN: ${BRAND.gst}  |  PAN: ${BRAND.pan}`,
    46,
    52,
    { color: COLORS.muted, size: 6.6 },
  );
}

function drawBillTo(doc, client, y = 62) {
  drawCell(doc, 12, y, 186, 7, { fill: COLORS.secondary, lineWidth: 0.35 });
  drawText(doc, "BILL TO", 16, y + 5, { bold: true, size: 8.5 });
  drawCell(doc, 12, y + 7, 186, 25, { lineWidth: 0.35 });
  drawLabelLine(doc, "Company:", client.name, 16, y + 14, 33);
  drawText(doc, "Address:", 16, y + 20, { bold: true, size: 8 });
  drawText(doc, client.address, 33, y + 20, { size: 7.5, maxWidth: 67 });
  drawLabelLine(doc, "Phone:", client.phone, 112, y + 14, 127);
  drawLabelLine(doc, "Email:", client.email, 112, y + 21, 127);
  drawLabelLine(doc, "GSTIN:", client.gst, 112, y + 28, 127);
}

function drawContinuationHeader(doc, quotationId, label) {
  drawCell(doc, 12, 10, 186, 14, { fill: COLORS.accent, lineWidth: 0.35 });
  drawText(doc, "PRODUCT QUOTATION", 16, 19, {
    bold: true,
    color: COLORS.primary,
    size: 14,
  });
  drawText(doc, quotationId, 194, 19, {
    bold: true,
    color: COLORS.primary,
    size: 7.5,
    align: "right",
  });
  drawText(doc, BRAND.name, 16, 31, { bold: true, size: 9 });
  drawText(doc, label, 194, 31, {
    color: COLORS.muted,
    size: 7.5,
    align: "right",
  });
}

function drawProductTable(doc, items, startY, startIndex = 0) {
  const columns = [12, 55, 28, 16, 16, 25, 14, 20];
  const headers = [
    ["SL.", "NO."],
    ["DESCRIPTION"],
    ["PRODUCT", "CODE"],
    ["UNIT"],
    ["QTY"],
    ["PRICE", "/ UNIT"],
    ["GST", "(%)"],
    ["AMOUNT"],
  ];
  let columnX = 12;
  headers.forEach((lines, index) => {
    drawTableHeader(doc, lines.join(" "), columnX, startY, columns[index], 11, {
      lines,
    });
    columnX += columns[index];
  });

  const centers = [];
  let runningX = 12;
  columns.forEach((columnWidth) => {
    centers.push(runningX + columnWidth / 2);
    runningX += columnWidth;
  });

  items.forEach((item, rowIndex) => {
    const rowY = startY + 11 + rowIndex * 9;
    const totals = calculatePricing(item.pricing);
    columnX = 12;
    columns.forEach((columnWidth, columnIndex) => {
      drawCell(doc, columnX, rowY, columnWidth, 9, {
        fill: columnIndex % 2 === 0 ? COLORS.surface : COLORS.white,
      });
      columnX += columnWidth;
    });

    drawText(doc, startIndex + rowIndex + 1, centers[0], rowY + 5.7, {
      align: "center",
      size: 6.8,
    });
    drawText(doc, item.product.name, 27, rowY + 3.6, {
      bold: true,
      size: 6.5,
      maxWidth: 49,
    });
    drawText(doc, titleCase(item.product.category), 27, rowY + 7.3, {
      color: COLORS.muted,
      size: 5.8,
    });
    drawText(doc, item.product.productCode, centers[2], rowY + 5.7, {
      align: "center",
      size: 6.3,
    });
    drawText(doc, "Unit", centers[3], rowY + 5.7, {
      align: "center",
      size: 6.5,
    });
    drawText(doc, totals.quantity, centers[4], rowY + 5.7, {
      align: "center",
      size: 6.5,
    });
    drawText(doc, moneyFormatter.format(totals.unitPrice), centers[5], rowY + 5.7, {
      align: "center",
      size: 6.2,
    });
    drawText(doc, `${totals.gstPercentage}%`, centers[6], rowY + 5.7, {
      align: "center",
      size: 6.5,
    });
    drawText(doc, moneyFormatter.format(totals.subtotal), centers[7], rowY + 5.7, {
      align: "center",
      size: 6.2,
    });
  });

  return startY + 11 + items.length * 9;
}

function drawQuotationSummary(doc, totals, startY, signatureDataUrl) {
  drawCell(doc, 12, startY, 112, 35, { lineWidth: 0.35 });
  drawText(doc, "Amount in Words:", 16, startY + 7, {
    bold: true,
    size: 8.5,
  });
  drawText(doc, amountInWords(totals.grandTotal), 16, startY + 14, {
    size: 7.5,
    maxWidth: 102,
  });

  const totalRows = [
    ["Sub Total", totals.subtotal],
    ["Total Discount", -totals.totalDiscount],
    ["Taxable Amount", totals.taxableAmount],
    ["Total GST", totals.gstAmount],
    ["FINAL AMOUNT", totals.grandTotal],
  ];
  totalRows.forEach(([label, value], index) => {
    const rowY = startY + index * 7;
    const isFinal = index === totalRows.length - 1;
    drawCell(doc, 124, rowY, 48, 7, {
      fill: isFinal ? COLORS.primary : COLORS.white,
      lineWidth: 0.35,
    });
    drawCell(doc, 172, rowY, 26, 7, {
      fill: isFinal ? COLORS.accent : COLORS.surface,
      lineWidth: 0.35,
    });
    drawText(doc, label, 170, rowY + 4.8, {
      bold: true,
      color: isFinal ? COLORS.white : COLORS.ink,
      size: 7,
      align: "right",
    });
    drawText(doc, moneyFormatter.format(value), 175, rowY + 4.8, {
      bold: isFinal,
      size: 6.8,
    });
  });

  const infoY = startY + 38;
  drawCell(doc, 12, infoY, 91, 25, { lineWidth: 0.35 });
  drawCell(doc, 12, infoY, 91, 6, { fill: COLORS.secondary });
  drawText(doc, "BANK DETAILS", 16, infoY + 4.4, { bold: true, size: 7.5 });
  drawLabelLine(doc, "Account Name:", BRAND.name, 16, infoY + 12, 38);
  drawLabelLine(doc, "Bank Name:", "To be provided", 16, infoY + 18, 38);
  drawLabelLine(doc, "Account / IFSC:", "To be provided", 16, infoY + 23, 40);

  drawCell(doc, 106, infoY, 92, 25, { lineWidth: 0.35 });
  drawCell(doc, 106, infoY, 92, 6, { fill: COLORS.secondary });
  drawText(doc, "TERMS & CONDITIONS", 110, infoY + 4.4, {
    bold: true,
    size: 7.5,
  });
  const terms = [
    "1. Fixed discounts apply to each selected unit.",
    "2. The final amount includes the GST shown above.",
    "3. Availability and delivery require confirmation.",
    "4. Commercial terms remain subject to final order.",
  ];
  terms.forEach((term, index) =>
    drawText(doc, term, 110, infoY + 11 + index * 3.8, { size: 6.1 }),
  );

  const declarationY = startY + 66;
  drawCell(doc, 12, declarationY, 186, 15, { lineWidth: 0.35 });
  drawCell(doc, 12, declarationY, 186, 6, { fill: COLORS.secondary });
  drawText(doc, "DECLARATION", 16, declarationY + 4.4, {
    bold: true,
    size: 7.5,
  });
  drawText(
    doc,
    "We declare that this quotation reflects the selected products, quantities and commercial values. It is not a tax invoice and remains subject to final order confirmation.",
    16,
    declarationY + 10.5,
    { size: 6.2, maxWidth: 176 },
  );

  const signatureY = startY + 84;
  drawCell(doc, 12, signatureY, 186, 14, { lineWidth: 0.35 });
  drawText(doc, `For ${BRAND.name}`, 16, signatureY + 6, {
    bold: true,
    size: 7,
  });
  if (signatureDataUrl) {
    doc.addImage(signatureDataUrl, "PNG", 130, signatureY + 1, 36, 11, undefined, "FAST");
  }
  drawText(doc, "AUTHORIZED SIGNATURE", 194, signatureY + 10, {
    bold: true,
    size: 6.5,
    align: "right",
  });
}

function drawFooter(doc, page, pageCount) {
  drawCell(doc, 12, 279, 186, 7, { fill: COLORS.accent, lineWidth: 0.35 });
  drawText(doc, BRAND.email, 16, 283.5, { size: 6.5 });
  drawText(doc, "Thank you for your business", 105, 283.5, {
    bold: true,
    color: COLORS.primary,
    size: 7,
    align: "center",
  });
  drawText(doc, `Page ${page} of ${pageCount}`, 194, 283.5, {
    size: 6.5,
    align: "right",
  });
}

export function createProductQuotationDocument(
  productOrItems,
  pricingOrOptions,
  maybeOptions = {},
) {
  const isMultiple = Array.isArray(productOrItems);
  const items = normalizeQuotationItems(
    productOrItems,
    isMultiple ? undefined : pricingOrOptions,
  );
  const options = isMultiple ? pricingOrOptions ?? {} : maybeOptions;
  const { logoDataUrl, billTo, signatureDataUrl } = options;
  const firstProduct = items[0]?.product ?? {};
  const totals = aggregatePricing(items);
  const quotationId = quoteNumber(firstProduct, items.length);
  const client = billToDetails(billTo);
  const generatedAt = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });

  doc.setProperties({
    title: `Product quotation - ${items.length} product${items.length === 1 ? "" : "s"}`,
    subject: `Quotation for ${items.map((item) => item.product.productCode).join(", ")}`,
    author: BRAND.name,
    creator: BRAND.name,
  });

  drawQuotationTitle(doc, quotationId, generatedAt);
  drawBrandHeader(doc, logoDataUrl);
  drawBillTo(doc, client);

  if (items.length <= 7) {
    const tableEnd = drawProductTable(doc, items, 99);
    drawQuotationSummary(doc, totals, tableEnd + 3, signatureDataUrl);
  } else {
    let itemIndex = 0;
    const firstPageItems = items.slice(0, 18);
    drawProductTable(doc, firstPageItems, 99, itemIndex);
    itemIndex += firstPageItems.length;

    while (itemIndex < items.length) {
      doc.addPage();
      drawContinuationHeader(doc, quotationId, "Product list continued");
      const pageItems = items.slice(itemIndex, itemIndex + 25);
      drawProductTable(doc, pageItems, 38, itemIndex);
      itemIndex += pageItems.length;
    }

    doc.addPage();
    drawContinuationHeader(doc, quotationId, "Quotation summary");
    drawBillTo(doc, client, 35);
    drawQuotationSummary(doc, totals, 71, signatureDataUrl);
  }

  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    drawFooter(doc, page, pageCount);
  }

  return { doc, quoteNumber: quotationId };
}

export async function downloadProductQuotationPdf(
  items,
  logoUrl,
  billTo,
  signatureUrl,
) {
  let logoDataUrl;
  let signatureDataUrl;
  try {
    logoDataUrl = logoUrl ? await imageUrlToDataUrl(logoUrl) : undefined;
  } catch {
    logoDataUrl = undefined;
  }
  try {
    signatureDataUrl = signatureUrl
      ? await imageUrlToDataUrl(signatureUrl)
      : undefined;
  } catch {
    signatureDataUrl = undefined;
  }

  const { doc, quoteNumber: quotationId } = createProductQuotationDocument(items, {
    logoDataUrl,
    billTo,
    signatureDataUrl,
  });
  doc.save(`${quotationId}.pdf`);
}
