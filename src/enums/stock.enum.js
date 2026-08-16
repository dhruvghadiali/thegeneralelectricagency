import { SORT_ORDERS, TABLE_DEFAULTS } from "./dataTable.enum";

export const STOCK_CATEGORY_OPTIONS = Object.freeze([
  { value: "motor", label: "Motors" },
  { value: "pump", label: "Pumps" },
  { value: "gearbox", label: "Gearboxes" },
  { value: "drive", label: "Drives" },
  { value: "electrical", label: "Electricals" },
  { value: "cable", label: "Cables" },
  { value: "bearing", label: "Bearings" },
]);

export const STOCK_TABLE_DEFAULTS = Object.freeze({
  LIMIT: TABLE_DEFAULTS.LIMIT,
  SORT: Object.freeze({ field: "product_name", order: SORT_ORDERS.ASC }),
});
