import {
  COLUMN_TYPES,
  SORT_ORDERS,
  TABLE_DEFAULTS,
} from "./dataTable.enum";

export const PRODUCT_CATEGORIES = Object.freeze({
  MOTOR: "motor",
  DRIVE: "drive",
  PUMP: "pump",
  GEAR_BOX: "gear_box",
  CABLE: "cable",
  SPARE: "spare",
});

export const PRODUCT_TABS = Object.freeze({
  PRODUCTS: "Products",
  SYNC_PENDING: "Sync Pending",
});

export const PRODUCT_FORM_TABS = Object.freeze({
  PRODUCT_INFORMATION: "product-information",
  COMMERCIAL_INFORMATION: "commercial-information",
});

export const PRODUCT_INFORMATION_FIELDS = Object.freeze([
  "productCode",
  "name",
  "category",
  "agency",
  "agencyName",
  "modelNumber",
  "hsnCode",
  "description",
]);

export const CREATE_PRODUCT_ERROR_MESSAGES = Object.freeze({
  create: "Unable to add product.",
  permission: "Only employees can create products.",
});

export const UPDATE_PRODUCT_ERROR_MESSAGES = Object.freeze({
  update: "Unable to update the product.",
  permission: "You do not have permission to update products.",
  missingProductId: "The product ID is missing.",
});

export const TAX_TREATMENTS = Object.freeze([
  Object.freeze({
    value: "gujarat",
    label: "Gujarat",
    description: "CGST + SGST",
  }),
  Object.freeze({
    value: "out-of-gujarat",
    label: "Out of Gujarat",
    description: "IGST",
  }),
  Object.freeze({
    value: "sezlout",
    label: "SEZLOUT",
    description: "No GST · LUT/Bond",
  }),
]);

export const SYNC_PENDING_LIST_FILTER_COLUMNS = Object.freeze([
  Object.freeze({ type: COLUMN_TYPES.TEXT, filterKey: "name" }),
  Object.freeze({ type: COLUMN_TYPES.TEXT, filterKey: "hsn_code" }),
]);

export const PRODUCT_LIST_FILTER_COLUMNS = Object.freeze([
  Object.freeze({ type: COLUMN_TYPES.TEXT, filterKey: "name" }),
  Object.freeze({ type: COLUMN_TYPES.TEXT, filterKey: "hsn_code" }),
  Object.freeze({ type: COLUMN_TYPES.TEXT, filterKey: "description" }),
  Object.freeze({ type: COLUMN_TYPES.TEXT, filterKey: "product_code" }),
  Object.freeze({ type: COLUMN_TYPES.DATE_TIME, filterKey: "created" }),
]);

export const PRODUCT_LIST_DEFAULTS = Object.freeze({
  limit: TABLE_DEFAULTS.LIMIT,
  sort: Object.freeze([
    Object.freeze({ field: "name", order: SORT_ORDERS.ASC }),
  ]),
  filters: Object.freeze({ is_active: "true" }),
});

export const GET_PRODUCT_LIST_ERROR_MESSAGES = Object.freeze({
  list: "Unable to load products.",
  permission: "You do not have permission to view products.",
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
