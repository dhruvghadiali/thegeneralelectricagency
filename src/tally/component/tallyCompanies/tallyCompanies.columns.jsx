import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";

function textColumn(field, header, options = {}) {
  return {
    key: field, field, header,
    type: COLUMN_TYPES.TEXT,
    className: "min-w-44 whitespace-normal break-words",
    ...options,
  };
}

function userDetails(user) {
  if (!user) return "—";
  return (
    <div className="space-y-1">
      <p>{[user.first_name, user.last_name].filter(Boolean).join(" ") || "—"}</p>
      <p className="text-xs text-muted-foreground">{user.username || "—"}</p>
      <p className="text-xs">Employee ID: {user.emp_id || "—"}</p>
      <p className="text-xs text-muted-foreground">ID: {user._id || "—"}</p>
    </div>
  );
}

export const TALLY_COMPANIES_DETAIL_COLUMNS = [
  textColumn("company_name", "Company name", {
    sortKey: "company_name",
    className: "min-w-56 font-medium",
    mobile: MOBILE_SLOTS.PRIMARY,
  }),
  textColumn("company_id", "Tally company ID", { mobile: MOBILE_SLOTS.SECONDARY }),
  textColumn("company_code", "Company code"),
  textColumn("company_type", "Company type"),
  textColumn("email", "Email", { mobile: MOBILE_SLOTS.META, mobileLabel: "Email:" }),
  textColumn("phone_number", "Phone", { mobile: MOBILE_SLOTS.META, mobileLabel: "Phone:" }),
  textColumn("gst_number", "GST number"),
  textColumn("pan_number", "PAN number"),
  textColumn("website", "Website"),
  ...[1, 2, 3].map((index) => ({
    key: `address${index}`,
    header: `Address ${index}`,
    type: COLUMN_TYPES.CUSTOM,
    className: "min-w-64 whitespace-normal",
    render: (company) => [company[`address${index}`], company[`state${index}`], company[`pincode${index}`]].filter(Boolean).join(", ") || "—",
  })),
  ...[1, 2, 3].map((index) => ({
    key: `contact${index}`,
    header: `Contact person ${index}`,
    type: COLUMN_TYPES.CUSTOM,
    className: "min-w-52 whitespace-normal",
    render: (company) => {
      const name = company[`contact_person_name${index}`];
      const phone = company[`contact_person_mobile_number${index}`];
      const position = company[`contact_person_position${index}`];
      if (!name && !phone && !position) return "—";
      return (
        <div className="space-y-1">
          {name && <p className="font-medium">{name}</p>}
          {position && <p className="text-muted-foreground">{position}</p>}
          {phone && <p>{phone}</p>}
        </div>
      );
    },
  })),
  textColumn("is_active", "Status", {
    mobile: MOBILE_SLOTS.BADGE,
    render: (company) => company.is_active == null ? "—" : company.is_active ? "Active" : "Inactive",
  }),
  textColumn("is_system_generated", "System generated", {
    render: (company) => company.is_system_generated == null ? "—" : company.is_system_generated ? "Yes" : "No",
  }),
  textColumn("created_by", "Created by", { render: (company) => userDetails(company.created_by) }),
  textColumn("updated_by", "Updated by", { render: (company) => userDetails(company.updated_by) }),
  textColumn("created_at", "Created at", { type: COLUMN_TYPES.DATE_TIME }),
  textColumn("updated_at", "Updated at", { type: COLUMN_TYPES.DATE_TIME }),
  textColumn("_id", "Record ID", { className: "min-w-60 font-mono text-xs" }),
];

