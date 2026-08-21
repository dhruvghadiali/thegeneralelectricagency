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
  COMPANY_STATUS_OPTIONS,
  COMPANY_TYPE_OPTIONS,
  MOBILE_SLOTS,
} from "@Enums";
import { Badge } from "@shadcnComponent/badge";
import CompanyTypeBadge from "@Tables/company/companyTypeBadge";

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
    render: (company) => <CompanyTypeBadge type={company.type} />,
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
  {
    key: "status",
    header: "Status",
    filterLabel: "Status",
    type: COLUMN_TYPES.SELECT,
    field: "isActive",
    sortKey: "is_active",
    filterKey: "is_active",
    options: COMPANY_STATUS_OPTIONS,
    allOptionLabel: "All statuses",
    mobile: MOBILE_SLOTS.BADGE,
    width: "150px",
    render: (company) => (
      <Badge variant={company.isActive ? "success" : "destructive"}>
        {company.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },
];

export default COMPANY_TABLE_COLUMNS;
