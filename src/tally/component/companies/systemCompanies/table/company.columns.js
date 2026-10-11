import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";

export const COMPANY_COLUMNS = [
  {
    key: "companyName",
    field: "company_name",
    header: "Company name",
    type: COLUMN_TYPES.TEXT,
    filterKey: "company_name",
    mobile: MOBILE_SLOTS.PRIMARY,
    className: "min-w-56 font-medium",
  },
  {
    key: "companyId",
    field: "company_id",
    header: "Tally company ID",
    type: COLUMN_TYPES.TEXT,
    filterKey: "company_id",
    mobile: MOBILE_SLOTS.SECONDARY,
    className: "min-w-56",
  },
  {
    key: "companyCode",
    field: "company_code",
    header: "Company code",
    type: COLUMN_TYPES.TEXT,
    filterKey: "company_code",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-40",
  },
  {
    key: "gstNumber",
    field: "gst_number",
    header: "GST number",
    type: COLUMN_TYPES.TEXT,
    filterKey: "gst_number",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-44",
  },
];
