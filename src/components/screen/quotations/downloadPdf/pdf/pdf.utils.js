import { PDF_COLORS } from "@screenComponent/quotations/downloadPdf/pdf/pdf.constants";

export const pdfMoneyFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function numberOrZero(value) {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

export function calculatePdfPricing(pricing = {}) {
  const quantity = Math.max(Math.floor(numberOrZero(pricing.quantity)), 1);
  const salePrice = Math.max(numberOrZero(pricing.salePrice), 0);
  const discountPerUnit = Math.min(
    Math.max(numberOrZero(pricing.discountAmount), 0),
    salePrice,
  );
  const unitPrice = salePrice - discountPerUnit;
  const amount = unitPrice * quantity;

  return {
    quantity,
    unitPrice,
    amount,
  };
}

export function aggregatePdfPricing(items) {
  return items.reduce(
    (summary, item) => {
      const pricing = calculatePdfPricing(item.pricing);

      return {
        quantity: summary.quantity + pricing.quantity,
        amount: summary.amount + pricing.amount,
      };
    },
    { quantity: 0, amount: 0 },
  );
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
    const ones = remainder % 10 ? ` ${ONES[remainder % 10]}` : "";
    parts.push(`${TENS[Math.floor(remainder / 10)]}${ones}`);
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
    if (number < group.value) return;

    const count = Math.floor(number / group.value);
    parts.push(`${integerToIndianWords(count)} ${group.label}`);
    number %= group.value;
  });

  if (number) parts.push(underThousand(number));

  return parts.join(" ");
}

export function amountInWords(value) {
  const amount = Math.max(numberOrZero(value), 0);
  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);
  const paiseText = paise
    ? ` and ${integerToIndianWords(paise)} Paise`
    : "";

  return `Rupees ${integerToIndianWords(rupees)}${paiseText} Only`;
}

const QUOTATION_SEQUENCE_MIN = 1;
const QUOTATION_SEQUENCE_MAX = 999999999;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
let lastIssuedFinancialYear = null;
let lastIssuedSequence = 0;

function calendarDayTimestamp(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function millisecondsIntoDay(date) {
  return (
    date.getHours() * 60 * 60 * 1000 +
    date.getMinutes() * 60 * 1000 +
    date.getSeconds() * 1000 +
    date.getMilliseconds()
  );
}

function createQuotationSequenceContext(date) {
  const financialYearStart =
    date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1;
  const financialYearStartTimestamp = Date.UTC(financialYearStart, 3, 1);
  const nextFinancialYearTimestamp = Date.UTC(financialYearStart + 1, 3, 1);
  const financialYearDays = Math.round(
    (nextFinancialYearTimestamp - financialYearStartTimestamp) /
      MILLISECONDS_PER_DAY,
  );
  const financialYearDayIndex = Math.floor(
    (calendarDayTimestamp(date) - financialYearStartTimestamp) /
      MILLISECONDS_PER_DAY,
  );
  const dailyCapacity = Math.floor(
    (QUOTATION_SEQUENCE_MAX + 1) / financialYearDays,
  );
  const timeSlot = Math.floor(
    (millisecondsIntoDay(date) * dailyCapacity) / MILLISECONDS_PER_DAY,
  );
  const sequence = financialYearDayIndex * dailyCapacity + timeSlot;
  const dailyRangeEnd =
    (financialYearDayIndex + 1) * dailyCapacity - 1;

  return {
    dailyRangeEnd: Math.min(dailyRangeEnd, QUOTATION_SEQUENCE_MAX),
    financialYearStart,
    sequence: Math.min(
      Math.max(sequence, QUOTATION_SEQUENCE_MIN),
      QUOTATION_SEQUENCE_MAX,
    ),
  };
}

export function createQuotationSequence(date = new Date()) {
  return createQuotationSequenceContext(date).sequence;
}

export function createQuotationNumber(companyName, date = new Date()) {
  const context = createQuotationSequenceContext(date);
  const { financialYearStart } = context;
  const financialYear = `${String(financialYearStart).slice(-2)}-${String(financialYearStart + 1).slice(-2)}`;
  const nextSequence =
    lastIssuedFinancialYear === financialYearStart
      ? Math.max(context.sequence, lastIssuedSequence + 1)
      : context.sequence;

  if (nextSequence > context.dailyRangeEnd) {
    throw new Error("Daily quotation number capacity has been exhausted.");
  }

  lastIssuedFinancialYear = financialYearStart;
  lastIssuedSequence = nextSequence;

  const uniqueNumber = String(nextSequence).padStart(9, "0");

  return `TGES/${financialYear}/R1/${uniqueNumber}`;
}

export function titleCase(value) {
  return (
    String(value ?? "")
      .split("_")
      .filter(Boolean)
      .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
      .join(" ") || "Not specified"
  );
}

export function drawPdfCell(doc, x, y, width, height, options = {}) {
  const { fill, lineWidth = 0.2 } = options;

  doc.setLineWidth(lineWidth);
  doc.setDrawColor(...PDF_COLORS.line);

  if (fill) {
    doc.setFillColor(...fill);
    doc.rect(x, y, width, height, "FD");
    return;
  }

  doc.rect(x, y, width, height, "S");
}

export function drawPdfText(doc, text, x, y, options = {}) {
  const {
    bold = false,
    color = PDF_COLORS.ink,
    size = 8.5,
    align = "left",
    maxWidth,
  } = options;

  doc.setFont("helvetica", bold ? "bold" : "normal");
  doc.setFontSize(size);
  doc.setTextColor(...color);

  if (maxWidth && !Array.isArray(text)) {
    doc.text(doc.splitTextToSize(String(text), maxWidth), x, y, { align });
    return;
  }

  doc.text(Array.isArray(text) ? text : String(text), x, y, { align });
}

export function drawPdfLabelLine(
  doc,
  label,
  value,
  x,
  y,
  valueX = x + 25,
) {
  drawPdfText(doc, label, x, y, { bold: true, size: 8 });
  drawPdfText(doc, value || "-", valueX, y, { size: 8 });
}

export async function imageUrlToDataUrl(url) {
  const response = await fetch(url);

  if (!response.ok) throw new Error("Unable to load quotation logo.");

  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
