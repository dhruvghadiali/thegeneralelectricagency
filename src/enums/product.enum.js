import { SORT_ORDERS, TABLE_DEFAULTS } from "./dataTable.enum";

export const PRODUCT_CATEGORIES = Object.freeze({
  MOTOR: "motor",
  DRIVE: "drive",
  PUMP: "pump",
  GEAR_BOX: "gear_box",
  CABLE: "cable",
  SPARE: "spare",
});

export const AGENCIES = Object.freeze({
  CG: "CG",
  RPG_KEC: "RPG KEC",
  PREMIUM: "Premium",
});

export const INDIAN_GST_RATES = Object.freeze({
  NIL: 0,
  FIVE: 5,
  TWELVE: 12,
  EIGHTEEN: 18,
  TWENTY_EIGHT: 28,
});

export const INDIAN_GST_OPTIONS = Object.freeze(
  Object.values(INDIAN_GST_RATES).map((rate) => ({
    value: String(rate),
    label: rate === INDIAN_GST_RATES.NIL ? "Nil (0%)" : `${rate}%`,
  })),
);

const titleCase = (value) =>
  value
    .split("_")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");

export const PRODUCT_CATEGORY_OPTIONS = Object.freeze(
  Object.values(PRODUCT_CATEGORIES).map((value) => ({
    value,
    label: titleCase(value),
  })),
);

export const AGENCY_OPTIONS = Object.freeze(
  Object.values(AGENCIES).map((value) => ({ value, label: value })),
);

export const PRODUCT_STATUS_OPTIONS = Object.freeze([
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
]);

export const PRODUCT_TABLE_DEFAULTS = Object.freeze({
  LIMIT: TABLE_DEFAULTS.LIMIT,
  SORT: Object.freeze([
    Object.freeze({ field: "name", order: SORT_ORDERS.ASC }),
  ]),
  FILTERS: Object.freeze({ is_active: "true" }),
});
