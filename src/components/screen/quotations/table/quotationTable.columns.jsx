import { Building2, CalendarClock, FileText, UserRound } from "lucide-react";

import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";

export const QUOTATION_TABLE_COLUMNS = [
  {
    key: "company",
    header: "Company",
    field: "companyName",
    type: COLUMN_TYPES.TEXT,
    className: "font-medium",
    mobile: MOBILE_SLOTS.PRIMARY,
    mobileIcon: Building2,
    width: "280px",
  },
  {
    key: "quotationNumber",
    header: "Quotation number",
    field: "quotationNumber",
    type: COLUMN_TYPES.TEXT,
    className: "whitespace-nowrap font-medium",
    mobile: MOBILE_SLOTS.SECONDARY,
    mobileIcon: FileText,
    width: "220px",
  },
  {
    key: "createdBy",
    header: "Created by",
    field: "createdBy.name",
    type: COLUMN_TYPES.TEXT,
    className: "whitespace-nowrap",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: UserRound,
    mobileLabel: "Created by",
    width: "220px",
  },
  {
    key: "createdAt",
    header: "Created at",
    field: "createdAt",
    type: COLUMN_TYPES.DATE_TIME,
    className: "whitespace-nowrap text-muted-foreground",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: CalendarClock,
    mobileLabel: "Created",
    width: "220px",
  },
  {
    key: "updatedBy",
    header: "Updated by",
    field: "updatedBy.name",
    type: COLUMN_TYPES.TEXT,
    className: "whitespace-nowrap",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: UserRound,
    mobileLabel: "Updated by",
    width: "220px",
  },
  {
    key: "updatedAt",
    header: "Updated at",
    field: "updatedAt",
    type: COLUMN_TYPES.DATE_TIME,
    className: "whitespace-nowrap text-muted-foreground",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: CalendarClock,
    mobileLabel: "Updated",
    width: "220px",
  },
];

export default QUOTATION_TABLE_COLUMNS;
