import {
  Building2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  UsersRound,
} from "lucide-react";

import {
  COLUMN_TYPES,
  COMPANY_TYPES,
  COMPANY_TYPE_OPTIONS,
  MOBILE_SLOTS,
} from "@Enums";
import { Badge } from "@shadcnComponent/badge";

const COMPANY_TYPE_BADGE_CLASSES = Object.freeze({
  [COMPANY_TYPES.SUPPLIER]:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300",
  [COMPANY_TYPES.CUSTOMER]:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300",
  [COMPANY_TYPES.MANUFACTURER]:
    "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300",
  [COMPANY_TYPES.DEALER]:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950/50 dark:text-amber-300",
  [COMPANY_TYPES.BOTH]:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-800 dark:bg-rose-950/50 dark:text-rose-300",
});

export const COMPANY_COLUMNS = [
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
    width:"500px"
  },
  {
    key: "type",
    header: "Type",
    filterLabel: "Company type",
    type: COLUMN_TYPES.SELECT,
    field: "type",
    sortKey: "company_type",
    filterKey: "company_type",
    options: COMPANY_TYPE_OPTIONS,
    allOptionLabel: "All company types",
    mobile: MOBILE_SLOTS.BADGE,
    width:"200px",
    render: (company) => (
      <Badge
        variant="outline"
        className={COMPANY_TYPE_BADGE_CLASSES[company.type]}
      >
        {COMPANY_TYPE_OPTIONS.find((option) => option.value === company.type)
          ?.label ?? company.type}
      </Badge>
    ),
  },
  {
    key: "email",
    header: "Email",
    type: COLUMN_TYPES.TEXT,
    field: "email",
    sortKey: "email",
    filterKey: "email",
    className: "min-w-56",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: Mail,
    width:"400px",
  },
  {
    key: "phone",
    header: "Phone",
    type: COLUMN_TYPES.TEXT,
    field: "phone",
    sortKey: "phone_number",
    filterKey: "phone_number",
    className: "whitespace-nowrap",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: Phone,
    width:"200px"
  },
  {
    key: "gstNumber",
    header: "GST number",
    type: COLUMN_TYPES.TEXT,
    field: "gstNumber",
    sortKey: "gst_number",
    filterKey: "gst_number",
    width:"200px",
  },
  {
    key: "panNumber",
    header: "PAN number",
    type: COLUMN_TYPES.TEXT,
    field: "panNumber",
    sortKey: "pan_number",
    filterKey: "pan_number",
    width:"200px",
  },
  {
    key: "website",
    header: "Website",
    type: COLUMN_TYPES.TEXT,
    field: "website",
    sortKey: "website",
    filterKey: "website",
    width:"500px",
    render: (company) => (
      <a
        href={company.website}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1.5 text-primary hover:underline"
      >
        <Globe2 className="size-3.5" />
        {company.website.replace(/^https?:\/\//, "")}
      </a>
    ),
  },
  {
    key: "locations",
    header: "Locations",
    type: COLUMN_TYPES.CUSTOM,
    className: "min-w-44",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: MapPin,
    width:"300px",
    render: (company) => (
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="size-3.5" />
          {company.addressCount} {company.addressCount === 1 ? "address" : "addresses"}
        </span>
        <span className="inline-flex items-center gap-1">
          <UsersRound className="size-3.5" />
          {company.contactCount} {company.contactCount === 1 ? "contact" : "contacts"}
        </span>
      </div>
    ),
  },
];

export default COMPANY_COLUMNS;
