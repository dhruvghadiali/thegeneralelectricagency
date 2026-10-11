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
    field: "guid",
    header: "Tally GUID",
    mobile: MOBILE_SLOTS.META,
    width: "400px",
  },
  { field: "masterId", header: "Master ID", mobile: MOBILE_SLOTS.META },
  { field: "alterId", header: "Alter ID", mobile: MOBILE_SLOTS.META },
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
