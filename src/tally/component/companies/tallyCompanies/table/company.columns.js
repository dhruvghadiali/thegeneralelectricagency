import _ from "lodash";

import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";

const COMPANY_COLUMN_DEFINITIONS = [
  {
    field: "name",
    header: "Company name",
    mobile: MOBILE_SLOTS.PRIMARY,
    className: "min-w-56 font-medium",
  },
  {
    field: "guid",
    header: "Tally GUID",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-72 break-all font-mono",
  },
  {
    field: "masterId",
    header: "Master ID",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-40 font-mono",
  },
  {
    field: "parent",
    header: "Ledger group",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-44",
  },
  {
    field: "gstin",
    header: "GSTIN",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-44",
  },
];

export const COMPANY_COLUMNS = _.map(
  COMPANY_COLUMN_DEFINITIONS,
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
