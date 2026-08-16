import { STOCK_CATEGORY_OPTIONS } from "@Enums";

export function stockCategoryLabel(category) {
  return STOCK_CATEGORY_OPTIONS.find((option) => option.value === category)?.label ?? category;
}

export function stockStatus(stock) {
  if (stock.availableQuantity <= 0) {
    return { label: "Out of stock", variant: "destructive" };
  }

  if (stock.availableQuantity <= stock.reorderLevel) {
    return { label: "Low stock", variant: "warning" };
  }

  return { label: "In stock", variant: "success" };
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

export function specificationLabel(key) {
  return key
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
