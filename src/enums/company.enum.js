import { SORT_ORDERS, TABLE_DEFAULTS } from "./dataTable.enum";

export const COMPANY_TYPES = Object.freeze({
  SUPPLIER: "supplier",
  CUSTOMER: "customer",
  MANUFACTURER: "manufacturer",
  DEALER: "dealer",
  BOTH: "both",
});

export const COMPANY_TYPE_OPTIONS = Object.freeze([
  { value: COMPANY_TYPES.SUPPLIER, label: "Supplier" },
  { value: COMPANY_TYPES.CUSTOMER, label: "Customer" },
  { value: COMPANY_TYPES.MANUFACTURER, label: "Manufacturer" },
  { value: COMPANY_TYPES.DEALER, label: "Dealer" },
  { value: COMPANY_TYPES.BOTH, label: "Supplier & customer" },
]);

export const CONTACT_POSITION_LABELS = Object.freeze({
  owner: "Owner",
  director: "Director",
  manager: "Manager",
  hr: "HR",
  accounts: "Accounts",
  purchase: "Purchase",
  sales: "Sales",
  store_keeper: "Store keeper",
  engineer: "Engineer",
  other: "Other",
});

export const COMPANY_TABLE_DEFAULTS = Object.freeze({
  LIMIT: TABLE_DEFAULTS.LIMIT,
  SORT: Object.freeze({ field: "company_name", order: SORT_ORDERS.ASC }),
});
