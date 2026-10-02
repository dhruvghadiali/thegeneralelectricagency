import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";

const columns = [
  {
    field: "company_name",
    header: "Company name",
    mobile: MOBILE_SLOTS.PRIMARY,
    className: "min-w-56 font-medium",
  },
  {
    field: "company_id",
    header: "Tally company ID",
    mobile: MOBILE_SLOTS.SECONDARY,
    className: "min-w-56",
  },
  {
    field: "company_code",
    header: "Company code",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-40",
  },
  {
    field: "gst_number",
    header: "GST number",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-40",
  },
  {
    field: "address1",
    header: "Address",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-56",
  },
  {
    field: "state1",
    header: "State",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-40",
  },
  {
    field: "pincode1",
    header: "Pincode",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-40",
  },
];

export const NEW_COMPANY_COLUMNS = columns.map(
  ({ field, header, mobile, className }) => ({
    key: field,
    field,
    header,
    type: COLUMN_TYPES.TEXT,
    sortKey: field,
    filterKey: field,
    mobile,
    mobileLabel: `${header}:`,
    className,
  }),
);
