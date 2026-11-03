import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";
import { optionalValue } from "@screenComponent/products/table/productTable.utils";

export const PRODUCT_TABLE_COLUMNS = [
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
    render: (product) => String(optionalValue(product.name)).toUpperCase(),
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

export default PRODUCT_TABLE_COLUMNS;
