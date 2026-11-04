import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";

const optionalValue = (value) => value || "—";

export const STOCK_PRODUCT_COLUMNS = [
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
    width: "280px",
    render: (product) => optionalValue(product.name),
  },
];

export default STOCK_PRODUCT_COLUMNS;
