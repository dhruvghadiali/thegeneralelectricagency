import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";

const columns = [
  {
    field: "name",
    header: "Name",
    mobile: MOBILE_SLOTS.PRIMARY,
    className: "min-w-56 font-medium",
  },
  {
    field: "guid",
    header: "Tally GUID",
    mobile: MOBILE_SLOTS.SECONDARY,
    className: "min-w-56",
  },
  {
    field: "masterId",
    header: "Master ID",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-40",
  },
  {
    field: "alterId",
    header: "Alter ID",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-40",
  },
  {
    field: "hsnCode",
    header: "HSN code",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-40",
  },
];

export const NEW_PRODUCT_COLUMNS = columns.map(
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
