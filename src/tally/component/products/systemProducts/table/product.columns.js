import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";

export const PRODUCT_COLUMNS = [
  {
    key: "productId",
    field: "product_id",
    header: "Product ID",
    type: COLUMN_TYPES.TEXT,
    mobile: MOBILE_SLOTS.PRIMARY,
    className: "min-w-56 font-medium",
  },
  {
    key: "productMasterId",
    field: "product_master_id",
    header: "Product master ID",
    type: COLUMN_TYPES.TEXT,
    mobile: MOBILE_SLOTS.SECONDARY,
    className: "min-w-40",
  },
  {
    key: "productAlterId",
    field: "product_alter_id",
    header: "Product alter ID",
    type: COLUMN_TYPES.TEXT,
    mobile: MOBILE_SLOTS.META,
    className: "min-w-40",
  },
  {
    key: "hsnCode",
    field: "hsn_code",
    header: "HSN code",
    type: COLUMN_TYPES.TEXT,
    filterKey: "hsn_code",
    mobile: MOBILE_SLOTS.META,
    className: "min-w-40",
  },
];
