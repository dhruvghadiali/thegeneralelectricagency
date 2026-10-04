import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";
import { optionalValue } from "@screenComponent/products/table/productTable.utils";

export const SYNC_PENDING_TABLE_COLUMNS = [
  {
    key: "name",
    header: "Product name",
    filterLabel: "Product name",
    type: COLUMN_TYPES.TEXT,
    field: "name",
    sortKey: "name",
    filterKey: "name",
    className: "min-w-56 font-medium",
    mobile: MOBILE_SLOTS.PRIMARY,
    width: "320px",
  },
  {
    key: "hsnCode",
    header: "HSN code",
    filterLabel: "HSN code",
    type: COLUMN_TYPES.TEXT,
    field: "hsnCode",
    sortKey: "hsn_code",
    filterKey: "hsn_code",
    className: "whitespace-nowrap",
    mobile: MOBILE_SLOTS.META,
    mobileLabel: "HSN code",
    width: "170px",
    render: (product) => optionalValue(product.hsnCode),
  },
  {
    key: "description",
    header: "Description",
    type: COLUMN_TYPES.TEXT,
    field: "description",
    filterKey: "description",
    className: "max-w-sm truncate text-muted-foreground",
    width: "380px",
    render: (product) => optionalValue(product.description),
  },
];

export default SYNC_PENDING_TABLE_COLUMNS;
