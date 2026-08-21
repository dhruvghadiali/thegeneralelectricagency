import { Building2 } from "lucide-react";

import { COMPANY_TABLE_COLUMNS } from "@Tables/company/companyTable.columns";

export const COMPANY_TABLE_CONFIG = Object.freeze({
  columns: COMPANY_TABLE_COLUMNS,
  rowKey: (company) => company.id,
  searchPlaceholder: "Search by company, email, phone, GST, or PAN...",
  rowNoun: "companies",
  emptyIcon: Building2,
  emptyTitle: "No companies found",
  emptyDescription: "Company profiles will appear here when available.",
  filteredEmptyDescription: "Try changing your search or filters.",
  fillHeight: true,
});
