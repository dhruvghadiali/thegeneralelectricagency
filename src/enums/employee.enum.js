import { ROLE_PATHS, USER_TYPE_BY_ROLE } from "./role.enum";
import { SORT_ORDERS, TABLE_DEFAULTS } from "./dataTable.enum";

/**
 * Filter options are keyed by the value the backend stores, not the value the
 * UI works in - a select filter's choice is sent through to the query string
 * untouched, so translating it here means the table never has to.
 */
export const EMPLOYEE_USER_TYPE_OPTIONS = Object.freeze([
  { value: USER_TYPE_BY_ROLE[ROLE_PATHS.EMPLOYEE], label: "Employee" },
  {
    value: USER_TYPE_BY_ROLE[ROLE_PATHS.WAREHOUSE_MANAGER],
    label: "Warehouse Manager",
  },
]);

/**
 * `is_active` is a boolean on the wire; as select values they are the strings
 * "true" and "false", which serialise to exactly the same query string.
 */
export const EMPLOYEE_STATUS_OPTIONS = Object.freeze([
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
]);

export const EMPLOYEE_TABLE_DEFAULTS = Object.freeze({
  LIMIT: TABLE_DEFAULTS.LIMIT,
  /** Newest joiners first, until the user sorts by something else. */
  SORT: Object.freeze({ field: "created_at", order: SORT_ORDERS.DESC }),
});
