import { SORT_ORDERS, TABLE_DEFAULTS } from "@Enums";

export const PRODUCT_LIST_DEFAULTS = Object.freeze({
  limit: TABLE_DEFAULTS.LIMIT,
  sort: Object.freeze([
    Object.freeze({ field: "name", order: SORT_ORDERS.ASC }),
  ]),
  filters: Object.freeze({ is_active: "true" }),
});

export const PRODUCT_ERROR_MESSAGES = Object.freeze({
  list: "Unable to load products.",
  quotationList: "Unable to load products. Try searching again.",
  create: "Unable to add product.",
  update: "Unable to update product.",
  delete: "Unable to delete product.",
  viewPermission: "You do not have permission to view products.",
  managePermission: "Only employees can manage products.",
});
