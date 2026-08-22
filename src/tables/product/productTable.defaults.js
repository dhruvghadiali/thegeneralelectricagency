import { SORT_ORDERS, TABLE_DEFAULTS } from "@Enums";

export const PRODUCT_TABLE_DEFAULTS = Object.freeze({
  limit: TABLE_DEFAULTS.LIMIT,
  sort: Object.freeze([
    Object.freeze({ field: "name", order: SORT_ORDERS.ASC }),
  ]),
  filters: Object.freeze({ is_active: "true" }),
});
