import { SORT_ORDERS, TABLE_DEFAULTS } from "@Enums";

export const COMPANY_CONTACT_TABLE_DEFAULTS = Object.freeze({
  limit: TABLE_DEFAULTS.LIMIT,
  sort: Object.freeze([
    Object.freeze({ field: "contact_person_name", order: SORT_ORDERS.ASC }),
  ]),
  filters: Object.freeze({ is_active: "true" }),
});
