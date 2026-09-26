import { Building2 } from "lucide-react";
import { TALLY_COMPANIES_TABLE_COLUMNS } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.columns";

export const TALLY_COMPANIES_TABLE_CONFIG = Object.freeze({
  columns: TALLY_COMPANIES_TABLE_COLUMNS,
  rowKey: (company) => company._id,
  searchPlaceholder: "Search Tally companies...",
  rowNoun: "companies",
  emptyIcon: Building2,
  emptyTitle: "No Tally companies found",
  emptyDescription: "Saved Tally companies will appear here.",
  filteredEmptyDescription: "No companies match your search.",
});
