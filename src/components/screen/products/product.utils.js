import { AGENCY_OPTIONS, PRODUCT_CATEGORY_OPTIONS } from "@Enums";

function optionLabel(options, value) {
  return options.find((option) => option.value === value)?.label ?? value ?? "—";
}

export const productCategoryLabel = (value) =>
  optionLabel(PRODUCT_CATEGORY_OPTIONS, value);

export const agencyLabel = (value) => optionLabel(AGENCY_OPTIONS, value);

export function generateProductCode() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();

  return `PRD-${timestamp}-${random}`;
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export function formatCurrency(value) {
  if (value === null || value === undefined || value === "") return "—";

  const amount = Number(value);
  return Number.isFinite(amount) ? currencyFormatter.format(amount) : "—";
}

export function formatPercentage(value) {
  if (value === null || value === undefined || value === "") return "—";

  const percentage = Number(value);
  return Number.isFinite(percentage) ? `${percentage}%` : "—";
}

export function formatNumber(value) {
  if (value === null || value === undefined || value === "") return "—";

  const number = Number(value);
  return Number.isFinite(number) ? numberFormatter.format(number) : "—";
}

export function formatRange(range, formatter, separator = " - ") {
  const hasMin =
    range?.min !== null && range?.min !== undefined && range?.min !== "";
  const hasMax =
    range?.max !== null && range?.max !== undefined && range?.max !== "";

  if (!hasMin && !hasMax) return "—";
  if (hasMin && hasMax) {
    const minimum = Number(range.min);
    const maximum = Number(range.max);
    const lowerValue =
      Number.isFinite(minimum) && Number.isFinite(maximum)
        ? Math.min(minimum, maximum)
        : range.min;
    const upperValue =
      Number.isFinite(minimum) && Number.isFinite(maximum)
        ? Math.max(minimum, maximum)
        : range.max;

    if (Number(lowerValue) === Number(upperValue)) {
      return formatter(lowerValue);
    }
    return `${formatter(lowerValue)}${separator}${formatter(upperValue)}`;
  }

  return hasMin
    ? `From ${formatter(range.min)}`
    : `Up to ${formatter(range.max)}`;
}
