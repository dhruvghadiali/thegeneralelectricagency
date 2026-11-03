import { Building2 } from "lucide-react";

import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";

export const COMPANY_TABLE_COLUMNS = [
  {
    key: "name",
    header: "Company",
    filterLabel: "Company name",
    type: COLUMN_TYPES.TEXT,
    field: "name",
    sortKey: "company_name",
    filterKey: "company_name",
    className: "min-w-52 font-medium",
    mobile: MOBILE_SLOTS.PRIMARY,
    mobileIcon: Building2,
    width: "500px",
  },
];

export default COMPANY_TABLE_COLUMNS;
