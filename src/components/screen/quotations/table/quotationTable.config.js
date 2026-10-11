import { FileText } from "lucide-react";

import { QUOTATION_TABLE_COLUMNS } from "@screenComponent/quotations/table/quotationTable.columns";

export const QUOTATION_TABLE_CONFIG = Object.freeze({
  columns: QUOTATION_TABLE_COLUMNS,
  rowKey: (quotation) => quotation.id ?? quotation.quotationNumber,
  searchPlaceholder: "Search by company or quotation number...",
  searchAutoFocus: true,
  keyboardRowNavigation: true,
  rowNoun: "quotations",
  emptyIcon: FileText,
  emptyTitle: "No quotations found",
  emptyDescription: "Create your first quotation to see it here.",
  filteredEmptyDescription: "Try changing your search.",
  fillHeight: true,
});
