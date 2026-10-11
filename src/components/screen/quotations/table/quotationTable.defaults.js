import { TABLE_DEFAULTS } from "@Enums";

export const QUOTATION_TABLE_DEFAULTS = Object.freeze({
  limit: TABLE_DEFAULTS.LIMIT,
  sort: Object.freeze([]),
  filters: Object.freeze({}),
});

export default QUOTATION_TABLE_DEFAULTS;
