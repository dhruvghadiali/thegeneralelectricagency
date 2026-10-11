import { ShoppingCart } from "lucide-react";

import { PURCHASE_TABLE_COLUMNS } from "@Tables/purchase/purchaseTable.columns";

export const PURCHASE_TABLE_CONFIG = Object.freeze({
  columns: PURCHASE_TABLE_COLUMNS,
  rowKey: (purchase) => purchase.id,
  searchPlaceholder: "Search by purchase ID, product, or supplier...",
  rowNoun: "purchase orders",
  emptyIcon: ShoppingCart,
  emptyTitle: "No purchase orders found",
  emptyDescription:
    "Create your first purchase order to start tracking supplier purchases.",
  filteredEmptyDescription: "Try changing your search or filters.",
  fillHeight: true,
});
