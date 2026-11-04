import { Mail, Phone, ReceiptText } from "lucide-react";

import {
  COLUMN_TYPES,
  SORT_ORDERS,
  TABLE_DEFAULTS,
} from "./dataTable.enum";

export const COMPANY_FORM_TABS = Object.freeze({
  COMPANY_INFORMATION: "company-information",
  COMPANY_CONTACT_PERSONS: "company-contact-persons",
});

export const COMPANY_INFORMATION_FIELDS = Object.freeze([
  "companyName",
  "companyType",
  "email",
  "phoneNumber",
  "gstNumber",
  "panNumber",
  "website",
  "address",
  "state",
  "pincode",
]);

export const COMPANY_FIELDS = Object.freeze([
  Object.freeze({ key: "email", label: "Email", icon: Mail }),
  Object.freeze({ key: "phoneNumber", label: "Phone", icon: Phone }),
  Object.freeze({ key: "gstNumber", label: "GST number", icon: ReceiptText }),
]);

export const COMPANY_TYPES = Object.freeze({
  SUPPLIER: "supplier",
  CUSTOMER: "customer",
});

export const COMPANY_TYPE_OPTIONS = Object.freeze([
  { value: COMPANY_TYPES.SUPPLIER, label: "Supplier" },
  { value: COMPANY_TYPES.CUSTOMER, label: "Customer" },
]);

export const COMPANY_STATUS_OPTIONS = Object.freeze([
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
]);

export const COMPANY_LIST_FILTER_COLUMNS = Object.freeze([
  Object.freeze({ type: COLUMN_TYPES.TEXT, filterKey: "company_name" }),
]);

export const COMPANY_LIST_DEFAULTS = Object.freeze({
  limit: TABLE_DEFAULTS.LIMIT,
  sort: Object.freeze([
    Object.freeze({ field: "company_name", order: SORT_ORDERS.ASC }),
  ]),
  filters: Object.freeze({ is_active: "true" }),
});

export const GET_COMPANY_LIST_ERROR_MESSAGES = Object.freeze({
  list: "Unable to load companies.",
  permission: "You do not have permission to view companies.",
});

export const CREATE_COMPANY_ERROR_MESSAGES = Object.freeze({
  create: "Unable to add company.",
  permission: "Only employees can create companies.",
});

export const UPDATE_COMPANY_ERROR_MESSAGES = Object.freeze({
  update: "Unable to update company information.",
  permission: "Only employees can update companies.",
  missingCompanyId: "The company ID is missing.",
  missingAddressId: "The company address ID is missing.",
});

export const MIGRATE_COMPANY_ERROR_MESSAGES = Object.freeze({
  migrate: "Unable to migrate the Tally company.",
  permission: "Only employees can migrate Tally companies.",
  missingTallyCompanyId: "The Tally company ID is missing.",
});

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
