import { createSelector, current, isDraft } from "@reduxjs/toolkit";
import _ from "lodash";

import { TABLE_CAPABILITIES, TABLE_DEFAULTS } from "@Enums";
import { countActiveFilters, isFilterActive } from "@/utils/dataTable.util";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";

/**
 * The half of a list screen's store that is identical everywhere: which page
 * you are on, what you searched for, how the rows are sorted and which column
 * filters are set.
 *
 * A slice spreads TABLE_REDUCERS into its own reducers, so the generated
 * actions stay namespaced to that slice (`employees/pageChanged`) while the
 * behaviour is written once.
 *
 * Search and filters are each stored twice on purpose. `search` and
 * `columnFilters` are bound to the inputs and update on every keystroke;
 * `searchQuery` and `appliedFilters` are the debounced copies the request is
 * built from. Without the split, either the inputs lag or the API is called
 * per character.
 */
export function createTableState({
  limit = TABLE_DEFAULTS.LIMIT,
  sort = null,
  columnFilters = {},
} = {}) {
  return {
    items: [],
    pagination: {
      page: TABLE_DEFAULTS.PAGE,
      limit,
      total: 0,
      totalPages: 0,
    },
    page: TABLE_DEFAULTS.PAGE,
    limit,
    search: "",
    searchQuery: "",
    sort,
    columnFilters: { ...columnFilters },
    appliedFilters: { ...columnFilters },
    isLoading: false,
    listError: null,
  };
}

/**
 * Deep-compares only ever run on plain values - an Immer draft compares by
 * proxy behaviour, and a false "changed" here would silently bounce the user
 * back to page one on every debounce tick.
 */
function plain(value) {
  return isDraft(value) ? current(value) : value;
}

/**
 * Anything that changes which rows match has to return to page one - page 3
 * of the old result set is meaningless against the new one, and usually does
 * not exist.
 */
function resetToFirstPage(state) {
  state.page = TABLE_DEFAULTS.PAGE;
}

export const TABLE_REDUCERS = {
  searchChanged(state, action) {
    state.search = action.payload;
  },
  searchCommitted(state, action) {
    const value = _.trim(action.payload ?? "");

    if (state.searchQuery === value) {
      return;
    }

    state.searchQuery = value;
    resetToFirstPage(state);
  },
  sortChanged(state, action) {
    state.sort = action.payload ?? null;

    // While the backend ignores sort_by the row order cannot change, so
    // moving the user off their page would be a pointless refetch.
    if (TABLE_CAPABILITIES.SORT_ENABLED) {
      resetToFirstPage(state);
    }
  },
  /** Live value behind the filter control - does not trigger a request. */
  columnFilterChanged(state, action) {
    const { key, value } = action.payload;

    if (isFilterActive(value)) {
      state.columnFilters[key] = value;
      return;
    }

    delete state.columnFilters[key];
  },
  /** Promotes the live filters to the ones the request is built from. */
  filtersApplied(state) {
    const live = plain(state.columnFilters);

    if (_.isEqual(plain(state.appliedFilters), live)) {
      return;
    }

    state.appliedFilters = _.cloneDeep(live);

    // Same reasoning as sortChanged: an ignored filter cannot change which
    // rows match, so page one is not where the user needs to be.
    if (TABLE_CAPABILITIES.COLUMN_FILTERS_ENABLED) {
      resetToFirstPage(state);
    }
  },
  filtersCleared(state) {
    state.search = "";
    state.searchQuery = "";
    state.columnFilters = {};
    state.appliedFilters = {};
    resetToFirstPage(state);
  },
  pageChanged(state, action) {
    const page = _.toNumber(action.payload) || TABLE_DEFAULTS.PAGE;

    state.page = _.clamp(page, 1, Math.max(state.pagination.totalPages, 1));
  },
  limitChanged(state, action) {
    state.limit = _.toNumber(action.payload) || TABLE_DEFAULTS.LIMIT;
    resetToFirstPage(state);
  },
};

/**
 * The three thunk states of a list fetch. A slice wires them onto its own
 * fetch thunk in extraReducers.
 */
export const tableFetchCases = {
  pending(state) {
    state.isLoading = true;
    state.listError = null;
  },
  fulfilled(state, action) {
    state.isLoading = false;
    state.listError = null;
    state.items = action.payload.items ?? [];
    state.pagination = action.payload.pagination;
    // The backend clamps out-of-range pages, so the requested page is
    // realigned to the one actually returned.
    state.page = action.payload.pagination.page;
  },
  rejected(state, action, fallbackMessage = "Unable to load this list.") {
    // An aborted request was superseded by a newer one already in flight - it
    // is not a failure, and must not clear the spinner the newer one set.
    if (action.meta.aborted) {
      return;
    }

    state.isLoading = false;
    state.listError = action.payload ?? fallbackMessage;
  },
};

/**
 * Memoised reads of a table slice. The grouped ones build a new object per
 * call, so without memoisation every unrelated dispatch would re-render the
 * whole table.
 */
export function createTableSelectors(selectSlice) {
  const selectItems = createSelector(selectSlice, (slice) => slice.items);

  const selectPagination = createSelector(selectSlice, (slice) => slice.pagination);

  const selectQuery = createSelector(
    selectSlice,
    ({ page, limit, search, searchQuery, sort, columnFilters, appliedFilters }) => ({
      page,
      limit,
      search,
      searchQuery,
      sort,
      columnFilters,
      appliedFilters,
    }),
  );

  const selectStatus = createSelector(selectSlice, ({ isLoading, listError }) => ({
    isLoading,
    error: listError,
  }));

  const selectActiveFilterCount = createSelector(selectSlice, (slice) =>
    countActiveFilters(slice.columnFilters),
  );

  const selectIsFiltered = createSelector(
    [selectSlice, selectActiveFilterCount],
    (slice, activeFilterCount) => Boolean(_.trim(slice.search)) || activeFilterCount > 0,
  );

  const selectPageItems = createSelector(selectPagination, (pagination) =>
    buildPageItems(pagination.page, pagination.totalPages, TABLE_DEFAULTS.PAGINATION_SIBLINGS),
  );

  const selectRowRange = createSelector(
    [selectPagination, selectItems],
    (pagination, items) => getRowRange({ ...pagination, count: items.length }),
  );

  return {
    selectSlice,
    selectItems,
    selectPagination,
    selectQuery,
    selectStatus,
    selectActiveFilterCount,
    selectIsFiltered,
    selectPageItems,
    selectRowRange,
  };
}
