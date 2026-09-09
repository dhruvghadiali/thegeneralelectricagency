import { SORT_ORDERS, TABLE_DEFAULTS } from "@Enums";

export const PURCHASE_TABLE_DEFAULTS = Object.freeze({
  limit: TABLE_DEFAULTS.LIMIT,
  sort: Object.freeze([
    Object.freeze({ field: "received_at", order: SORT_ORDERS.DESC }),
  ]),
  filters: Object.freeze({}),
});
