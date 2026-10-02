import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";

const optionalValue = (value) => value || "—";

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
  {
    key: "productCode",
    header: "Product code",
    filterLabel: "Product code",
    type: COLUMN_TYPES.TEXT,
    field: "productCode",
    sortKey: "product_code",
    filterKey: "product_code",
    className: "whitespace-nowrap font-medium",
    mobile: MOBILE_SLOTS.SECONDARY,
    width: "180px",
  },
  {
    key: "createdAt",
    header: "Created at",
    filterLabel: "Created at",
    type: COLUMN_TYPES.DATE_TIME,
    field: "createdAt",
    sortKey: "created_at",
    filterKey: "created",
    className: "whitespace-nowrap text-muted-foreground",
    mobile: MOBILE_SLOTS.META,
    mobileLabel: "Created at",
    width: "210px",
  },
];

export default PRODUCT_TABLE_COLUMNS;
