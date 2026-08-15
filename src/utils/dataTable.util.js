import _ from "lodash";
import moment from "moment";

import {
  API_DATE_FORMAT,
  COLUMN_TYPES,
  FILTER_ALL,
  FILTER_PARAM_SUFFIXES,
  SORT_ORDERS,
  SORT_PARAM_KEYS,
  TABLE_CAPABILITIES,
} from "@Enums";
import { DATE_FORMATS, formatDate } from "@/utils/date.util";

/**
 * Turning a column definition into query parameters, and a raw row value into
 * something readable. Everything here is pure, so it is equally usable from a
 * reducer, a thunk or a cell renderer.
 */

const RANGE_TYPES = [COLUMN_TYPES.NUMBER, COLUMN_TYPES.DATE, COLUMN_TYPES.DATE_TIME];
const DATE_TYPES = [COLUMN_TYPES.DATE, COLUMN_TYPES.DATE_TIME];

export function isRangeColumn(type) {
  return _.includes(RANGE_TYPES, type);
}

export function isDateColumn(type) {
  return _.includes(DATE_TYPES, type);
}

/**
 * The shape a column's filter starts in. Range filters need both ends present
 * from the outset so the two inputs stay controlled.
 */
export function emptyFilterValue(type) {
  if (type === COLUMN_TYPES.NUMBER) {
    return { min: "", max: "" };
  }

  if (isDateColumn(type)) {
    return { from: "", to: "" };
  }

  return type === COLUMN_TYPES.SELECT ? FILTER_ALL : "";
}

/**
 * Whether a filter value would actually narrow anything. A half-filled range
 * counts - "everyone who joined after March" is a real filter.
 */
export function isFilterActive(value) {
  if (_.isPlainObject(value)) {
    return _.some(_.values(value), (part) => !_.isNil(part) && _.trim(String(part)) !== "");
  }

  return !_.isNil(value) && _.trim(String(value)) !== "" && value !== FILTER_ALL;
}

export function countActiveFilters(filters = {}) {
  return _.filter(_.values(filters), isFilterActive).length;
}

export function isFilterableColumn(column) {
  return Boolean(column?.filterKey) && column?.type !== COLUMN_TYPES.CUSTOM;
}

/** Columns a filter control can be built for. */
export function getFilterableColumns(columns = []) {
  return _.filter(columns, isFilterableColumn);
}

/** Columns that occupy a slot in the table itself, as opposed to filter-only ones. */
export function getVisibleColumns(columns = []) {
  return _.filter(columns, (column) => column.showInTable !== false);
}

export function isSortableColumn(column) {
  return Boolean(column?.sortKey) && column?.type !== COLUMN_TYPES.CUSTOM;
}

function toDateParam(value, type) {
  const date = moment(value);

  if (!date.isValid()) {
    return undefined;
  }

  // A date-only column is compared by calendar day, so sending a timestamp
  // would make the boundary depend on the user's clock.
  return type === COLUMN_TYPES.DATE ? date.format(API_DATE_FORMAT) : date.toISOString();
}

function toNumberParam(value) {
  const parsed = _.toNumber(value);

  return _.isFinite(parsed) ? parsed : undefined;
}

/**
 * Builds the query parameters for every active column filter.
 *
 *   text / select  ->  ?<filterKey>=<value>
 *   number         ->  ?<filterKey>_min=&<filterKey>_max=
 *   date, datetime ->  ?<filterKey>_from=&<filterKey>_to=
 *
 * Empty halves of a range are omitted rather than sent blank, so an open-ended
 * range stays open-ended.
 *
 * Returns nothing at all while COLUMN_FILTERS_ENABLED is off - the controls
 * still render and the choices are still stored, they just do not reach the
 * request until the endpoint can act on them.
 */
export function buildColumnFilterParams(columns = [], filters = {}) {
  if (!TABLE_CAPABILITIES.COLUMN_FILTERS_ENABLED) {
    return {};
  }

  const params = {};

  _.forEach(getFilterableColumns(columns), (column) => {
    const value = _.get(filters, column.filterKey);

    if (!isFilterActive(value)) {
      return;
    }

    if (column.type === COLUMN_TYPES.NUMBER) {
      params[`${column.filterKey}${FILTER_PARAM_SUFFIXES.MIN}`] = toNumberParam(value.min);
      params[`${column.filterKey}${FILTER_PARAM_SUFFIXES.MAX}`] = toNumberParam(value.max);
      return;
    }

    if (isDateColumn(column.type)) {
      params[`${column.filterKey}${FILTER_PARAM_SUFFIXES.FROM}`] = toDateParam(
        value.from,
        column.type,
      );
      params[`${column.filterKey}${FILTER_PARAM_SUFFIXES.TO}`] = toDateParam(
        value.to,
        column.type,
      );
      return;
    }

    params[column.filterKey] = _.trim(String(value));
  });

  return _.omitBy(params, (param) => _.isUndefined(param) || param === "");
}

/** Held back the same way, and for the same reason, as the column filters. */
export function buildSortParams(sort) {
  if (!TABLE_CAPABILITIES.SORT_ENABLED || !sort?.field) {
    return {};
  }

  return {
    [SORT_PARAM_KEYS.FIELD]: sort.field,
    [SORT_PARAM_KEYS.ORDER]: sort.order ?? SORT_ORDERS.ASC,
  };
}

/**
 * Clicking a header cycles ascending -> descending -> unsorted. Returning to
 * unsorted matters: it is the only way back to the backend's own default
 * ordering once a column has been touched.
 */
export function nextSortState(currentSort, field) {
  if (currentSort?.field !== field) {
    return { field, order: SORT_ORDERS.ASC };
  }

  return currentSort.order === SORT_ORDERS.ASC
    ? { field, order: SORT_ORDERS.DESC }
    : null;
}

export function getCellValue(row, column) {
  return column.field ? _.get(row, column.field) : undefined;
}

/**
 * The fallback cell renderer, used whenever a column does not supply its own.
 * Dates are the reason this exists - an ISO string in a table cell is not an
 * answer to "when did they join".
 */
export function formatCellValue(value, column) {
  if (_.isNil(value) || value === "") {
    return column.emptyLabel ?? "—";
  }

  if (column.type === COLUMN_TYPES.DATE) {
    return formatDate(value, DATE_FORMATS.DATE);
  }

  if (column.type === COLUMN_TYPES.DATE_TIME) {
    return formatDate(value, DATE_FORMATS.DATE_TIME);
  }

  if (column.type === COLUMN_TYPES.SELECT) {
    return _.find(column.options, { value: String(value) })?.label ?? String(value);
  }

  return String(value);
}

export function renderCell(row, column) {
  return column.render ? column.render(row) : formatCellValue(getCellValue(row, column), column);
}
