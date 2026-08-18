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

export const COMPANY_STATUS_OPTIONS = Object.freeze([
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
]);

export const CONTACT_PERSON_POSITIONS = Object.freeze({
  OWNER: "owner",
  DIRECTOR: "director",
  MANAGER: "manager",
  HR: "hr",
  ACCOUNTS: "accounts",
  PURCHASE: "purchase",
  SALES: "sales",
  STORE_KEEPER: "store_keeper",
  ENGINEER: "engineer",
  OTHER: "other",
});

export const CONTACT_POSITION_LABELS = Object.freeze({
  [CONTACT_PERSON_POSITIONS.OWNER]: "Owner",
  [CONTACT_PERSON_POSITIONS.DIRECTOR]: "Director",
  [CONTACT_PERSON_POSITIONS.MANAGER]: "Manager",
  [CONTACT_PERSON_POSITIONS.HR]: "HR",
  [CONTACT_PERSON_POSITIONS.ACCOUNTS]: "Accounts",
  [CONTACT_PERSON_POSITIONS.PURCHASE]: "Purchase",
  [CONTACT_PERSON_POSITIONS.SALES]: "Sales",
  [CONTACT_PERSON_POSITIONS.STORE_KEEPER]: "Store keeper",
  [CONTACT_PERSON_POSITIONS.ENGINEER]: "Engineer",
  [CONTACT_PERSON_POSITIONS.OTHER]: "Other",
});

export const CONTACT_POSITION_OPTIONS = Object.freeze(
  Object.values(CONTACT_PERSON_POSITIONS).map((value) => ({
    value,
    label: CONTACT_POSITION_LABELS[value],
  })),
);

export const COMPANY_TABLE_DEFAULTS = Object.freeze({
  LIMIT: TABLE_DEFAULTS.LIMIT,
  SORT: Object.freeze([
    Object.freeze({ field: "company_name", order: SORT_ORDERS.ASC }),
  ]),
  FILTERS: Object.freeze({ is_active: "true" }),
});
