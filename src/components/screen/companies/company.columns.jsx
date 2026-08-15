import {
  Building2,
  Globe2,
  Mail,
  MapPin,
  Phone,
  UsersRound,
} from "lucide-react";

import { COLUMN_TYPES, COMPANY_TYPE_OPTIONS, MOBILE_SLOTS } from "@Enums";
import { Badge } from "@/components/ui/badge";
import {
  companyTypeLabel,
  companyTypeVariant,
} from "@/components/screen/companies/company.utils";

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
    render: (company) => (
      <Badge variant={companyTypeVariant(company.type)}>
        {companyTypeLabel(company.type)}
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
  },
  {
    key: "gstNumber",
    header: "GST number",
    type: COLUMN_TYPES.TEXT,
    field: "gstNumber",
    sortKey: "gst_number",
    filterKey: "gst_number",
    className: "whitespace-nowrap font-mono text-xs",
  },
  {
    key: "panNumber",
    header: "PAN number",
    type: COLUMN_TYPES.TEXT,
    field: "panNumber",
    sortKey: "pan_number",
    filterKey: "pan_number",
    className: "whitespace-nowrap font-mono text-xs",
  },
  {
    key: "website",
    header: "Website",
    type: COLUMN_TYPES.TEXT,
    field: "website",
    sortKey: "website",
    filterKey: "website",
    className: "min-w-44",
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
