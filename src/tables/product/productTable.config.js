import { Boxes } from "lucide-react";

import { PRODUCT_TABLE_COLUMNS } from "@Tables/product/productTable.columns";

export const PRODUCT_TABLE_CONFIG = Object.freeze({
  columns: PRODUCT_TABLE_COLUMNS,
  rowKey: (product) => product.id,
  searchPlaceholder: "Search by product code, name, model, or company...",
  rowNoun: "products",
  emptyIcon: Boxes,
  emptyTitle: "No products found",
  filteredEmptyDescription: "Try changing your search or filters.",
  fillHeight: true,
});
