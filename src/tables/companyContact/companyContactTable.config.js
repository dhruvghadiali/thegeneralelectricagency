import { ContactRound } from "lucide-react";

import { COMPANY_CONTACT_TABLE_COLUMNS } from "@Tables/companyContact/companyContactTable.columns";

export const COMPANY_CONTACT_TABLE_CONFIG = Object.freeze({
  columns: COMPANY_CONTACT_TABLE_COLUMNS,
  rowKey: (contact) => contact.id,
  searchPlaceholder: "Search contacts or companies...",
  rowNoun: "contacts",
  emptyIcon: ContactRound,
  emptyTitle: "No contact persons found",
  emptyDescription: "Company contact persons will appear here when available.",
  filteredEmptyDescription: "Try changing your search or filters.",
  fillHeight: true,
});
