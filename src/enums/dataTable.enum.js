/**
 * Shared vocabulary for the common data table. A screen describes its table
 * with these values and gets sorting, typed per-column filtering, search and
 * pagination without writing any of it again.
 */

/**
 * Which query parameters the backend understands today.
 *
 * The table renders the sort headers and the filter row either way, and the
 * store remembers what the user picked - these flags only decide whether the
 * parameters are put on the request. Held back, a backend that rejects
 * unknown query keys cannot 400 on a parameter it has never heard of, and no
 * pointless refetch is fired for a change the server would ignore.
 *
 * Flip a flag to true the day that endpoint gains support. Nothing else
 * changes: the UI, the store and the parameter builders are already there.
 */
export const TABLE_CAPABILITIES = Object.freeze({
  SORT_ENABLED: false,
  COLUMN_FILTERS_ENABLED: false,
});

/**
 * A column's type decides three things at once: which filter control is
 * rendered, how a raw cell value is formatted when the column has no custom
 * renderer, and how its filter is turned into query parameters.
 */
export const COLUMN_TYPES = Object.freeze({
  TEXT: "text",
  NUMBER: "number",
  DATE: "date",
  DATE_TIME: "datetime",
  SELECT: "select",
  /** Rendered from `render()` only - never sorted, never filtered. */
  CUSTOM: "custom",
});

export const SORT_ORDERS = Object.freeze({
  ASC: "asc",
  DESC: "desc",
});

export const TABLE_DEFAULTS = Object.freeze({
  PAGE: 1,
  LIMIT: 20,
  /** Typing pauses this long before the request goes out. */
  SEARCH_DEBOUNCE_MS: 400,
  /** Column text/number filters are given slightly longer than the search box. */
  FILTER_DEBOUNCE_MS: 500,
  PAGINATION_SIBLINGS: 1,
});

export const TABLE_PAGE_SIZE_OPTIONS = Object.freeze([10, 20, 50, 100]);

/**
 * Radix Select cannot hold an empty string as a value, so "no choice" needs a
 * real one. Filters carrying this are dropped from the request.
 */
export const FILTER_ALL = "all";

/**
 * The query parameters the backend sorts by. Both live here so a rename on
 * the API is a one-line change for every table in the app.
 */
export const SORT_PARAM_KEYS = Object.freeze({
  FIELD: "sort_by",
  ORDER: "sort_order",
});

/**
 * Range filters send two parameters built from the column's filter key -
 * a `created_at` date column becomes `created_at_from` / `created_at_to`,
 * and a `salary` number column becomes `salary_min` / `salary_max`.
 */
export const FILTER_PARAM_SUFFIXES = Object.freeze({
  MIN: "_min",
  MAX: "_max",
  FROM: "_from",
  TO: "_to",
});

/** Wire format for date-only filter parameters. */
export const API_DATE_FORMAT = "YYYY-MM-DD";

/**
 * Where a column shows up in the mobile card layout, since a table cannot be
 * a table on a phone.
 */
export const MOBILE_SLOTS = Object.freeze({
  PRIMARY: "primary",
  SECONDARY: "secondary",
  META: "meta",
  BADGE: "badge",
});
