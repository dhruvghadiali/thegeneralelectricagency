import { MOBILE_SLOTS } from "@Enums";
import { textColumn } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.utils";

export const TALLY_COMPANIES_TABLE_COLUMNS = [
  textColumn("company_name", "Company name", {
    sortKey: "company_name",
    className: "min-w-56 font-medium",
    mobile: MOBILE_SLOTS.PRIMARY,
  }),
  textColumn("company_id", "Tally company ID", { mobile: MOBILE_SLOTS.SECONDARY }),
  ...[
    ["company_code", "Company code"],
    ["gst_number", "GST number"],
    ["address1", "Address"],
    ["state1", "State"],
    ["pincode1", "Pincode"],
  ].map(([field, header]) => textColumn(field, header, {
    mobile: MOBILE_SLOTS.META,
    mobileLabel: `${header}:`,
  })),
];


