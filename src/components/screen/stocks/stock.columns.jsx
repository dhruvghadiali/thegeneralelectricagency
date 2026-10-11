import { Boxes, MapPin, PackageCheck, Tag } from "lucide-react";

import { COLUMN_TYPES, MOBILE_SLOTS, STOCK_CATEGORY_OPTIONS } from "@Enums";
import { Badge } from "@shadcnComponent/badge";
import {
  formatCurrency,
  stockCategoryLabel,
  stockStatus,
} from "@screenComponent/stocks/stock.utils";

export const STOCK_COLUMNS = [
  {
    key: "productName",
    header: "Product",
    type: COLUMN_TYPES.TEXT,
    field: "productName",
    sortKey: "product_name",
    filterKey: "product_name",
    className: "min-w-64 font-medium",
    mobile: MOBILE_SLOTS.PRIMARY,
    mobileIcon: Boxes,
  },
  {
    key: "sku",
    header: "SKU",
    type: COLUMN_TYPES.TEXT,
    field: "sku",
    sortKey: "sku",
    filterKey: "sku",
    className: "whitespace-nowrap font-mono text-xs",
    mobile: MOBILE_SLOTS.SECONDARY,
  },
  {
    key: "category",
    header: "Category",
    type: COLUMN_TYPES.SELECT,
    field: "category",
    sortKey: "category",
    filterKey: "category",
    options: STOCK_CATEGORY_OPTIONS,
    allOptionLabel: "All categories",
    className: "whitespace-nowrap",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: Tag,
    render: (stock) => stockCategoryLabel(stock.category),
  },
  {
    key: "brand",
    header: "Brand",
    type: COLUMN_TYPES.TEXT,
    field: "brand",
    sortKey: "brand",
    filterKey: "brand",
    className: "min-w-40",
  },
  {
    key: "availableQuantity",
    header: "Available",
    type: COLUMN_TYPES.NUMBER,
    field: "availableQuantity",
    sortKey: "available_quantity",
    filterKey: "available_quantity",
    className: "text-center font-semibold",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: PackageCheck,
    mobileLabel: "Available",
    render: (stock) => `${stock.availableQuantity} ${stock.unit}`,
  },
  {
    key: "reservedQuantity",
    header: "Reserved",
    type: COLUMN_TYPES.NUMBER,
    field: "reservedQuantity",
    sortKey: "reserved_quantity",
    filterKey: "reserved_quantity",
    className: "text-center",
  },
  {
    key: "damagedQuantity",
    header: "Damaged",
    type: COLUMN_TYPES.NUMBER,
    field: "damagedQuantity",
    sortKey: "damaged_quantity",
    filterKey: "damaged_quantity",
    className: "text-center",
  },
  {
    key: "status",
    header: "Status",
    type: COLUMN_TYPES.CUSTOM,
    mobile: MOBILE_SLOTS.BADGE,
    render: (stock) => {
      const status = stockStatus(stock);
      return <Badge variant={status.variant}>{status.label}</Badge>;
    },
  },
  {
    key: "reorderLevel",
    header: "Reorder at",
    type: COLUMN_TYPES.NUMBER,
    field: "reorderLevel",
    sortKey: "reorder_level",
    filterKey: "reorder_level",
    className: "text-center",
  },
  {
    key: "unitPrice",
    header: "Unit price",
    type: COLUMN_TYPES.NUMBER,
    field: "unitPrice",
    sortKey: "unit_price",
    filterKey: "unit_price",
    className: "whitespace-nowrap text-right",
    render: (stock) => formatCurrency(stock.unitPrice),
  },
  {
    key: "stockValue",
    header: "Stock value",
    type: COLUMN_TYPES.CUSTOM,
    className: "whitespace-nowrap text-right font-medium",
    render: (stock) => formatCurrency(stock.stockValue),
  },
  {
    key: "locations",
    header: "Locations",
    type: COLUMN_TYPES.CUSTOM,
    className: "whitespace-nowrap",
    render: (stock) => (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        <MapPin className="size-3.5" />
        {stock.locationCount}
      </span>
    ),
  },
];

export default STOCK_COLUMNS;
