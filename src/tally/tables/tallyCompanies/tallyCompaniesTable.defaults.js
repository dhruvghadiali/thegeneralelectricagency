import { SORT_ORDERS, TABLE_DEFAULTS } from "@Enums";

export const TALLY_COMPANIES_TABLE_DEFAULTS = Object.freeze({
  limit: TABLE_DEFAULTS.LIMIT,
  sort: Object.freeze([
    Object.freeze({ field: "company_name", order: SORT_ORDERS.ASC }),
  ]),
});

