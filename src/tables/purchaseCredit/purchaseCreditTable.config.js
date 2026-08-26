import { ReceiptIndianRupee } from "lucide-react";

import { PURCHASE_CREDIT_TABLE_COLUMNS } from "@Tables/purchaseCredit/purchaseCreditTable.columns";

export const PURCHASE_CREDIT_TABLE_CONFIG = Object.freeze({
  columns: PURCHASE_CREDIT_TABLE_COLUMNS,
  rowKey: (purchaseCredit) => purchaseCredit.id,
  searchPlaceholder:
    "Search by supplier, product, GST, or acknowledgement ID...",
  rowNoun: "purchase credits",
  emptyIcon: ReceiptIndianRupee,
  emptyTitle: "No purchase credits found",
  emptyDescription:
    "Add your first purchase credit to start tracking supplier credit purchases.",
  filteredEmptyDescription: "Try changing your search or filters.",
  fillHeight: true,
});
