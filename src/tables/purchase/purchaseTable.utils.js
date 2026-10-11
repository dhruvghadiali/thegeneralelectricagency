const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
});

export function formatPurchaseCurrency(value) {
  if (value === null || value === undefined || value === "") return "—";

  const amount = Number(value);
  return Number.isFinite(amount) ? currencyFormatter.format(amount) : "—";
}

export function formatPurchaseNumber(value) {
  if (value === null || value === undefined || value === "") return "—";

  const number = Number(value);
  return Number.isFinite(number) ? numberFormatter.format(number) : "—";
}

export function formatPurchasePercentage(value) {
  if (value === null || value === undefined || value === "") return "—";

  const percentage = Number(value);
  return Number.isFinite(percentage) ? `${percentage}%` : "—";
}
