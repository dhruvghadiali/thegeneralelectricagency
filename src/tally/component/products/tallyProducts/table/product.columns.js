import _ from "lodash";

import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";

const PRODUCT_COLUMN_DEFINITIONS = [
  {
    field: "name",
    header: "Product name",
    mobile: MOBILE_SLOTS.PRIMARY,
    className: "min-w-56 font-medium",
  },
  {
    field: "description",
    header: "Description",
    mobile: MOBILE_SLOTS.SECONDARY,
    width: "450px",
  },
  {
    field: "guid",
    header: "Tally GUID",
    mobile: MOBILE_SLOTS.META,
    width: "400px",
  },
  { field: "masterId", header: "Master ID", mobile: MOBILE_SLOTS.META },
  { field: "alterId", header: "Alter ID", mobile: MOBILE_SLOTS.META },
  { field: "group", header: "Stock group", mobile: MOBILE_SLOTS.META },
  { field: "units", header: "Base units", mobile: MOBILE_SLOTS.META },
  { field: "hsnCode", header: "HSN code", mobile: MOBILE_SLOTS.META },
  {
    field: "gstApplicable",
    header: "GST applicable",
    mobile: MOBILE_SLOTS.META,
  },
  { field: "supplyType", header: "Type of supply", mobile: MOBILE_SLOTS.META },
  {
    field: "openingBalance",
    header: "Opening balance",
    mobile: MOBILE_SLOTS.META,
  },
  {
    field: "closingBalance",
    header: "Closing balance",
    mobile: MOBILE_SLOTS.META,
  },
];

export const PRODUCT_COLUMNS = _.map(
  PRODUCT_COLUMN_DEFINITIONS,
  ({ field, header, mobile, width, headerClassName, className }) => ({
    key: field,
    field,
    header,
    type: COLUMN_TYPES.TEXT,
    sortKey: field,
    filterKey: field,
    mobile,
    mobileLabel: `${header}:`,
    width,
    headerClassName,
    className: className ?? "min-w-40",
  }),
);
