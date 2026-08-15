import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { TABLE_CAPABILITIES, TABLE_DEFAULTS } from "@Enums";

/**
 * Binds a table slice to the API. All state stays in the store - this only
 * decides *when* to talk to the server:
 *
 *  - typing updates the input immediately and commits the query on a debounce
 *  - column filters do the same, except a select or date picker applies at
 *    once, since there is nothing to wait for
 *  - one effect watches the committed query, sort, page, limit and applied
 *    filters, so any change to the request fires exactly one fetch
 *  - the previous request is aborted on the way out, so a slow response can
 *    never overwrite the results of a newer one
 *
 * `actions`, `selectors` and `fetchAction` must be stable references (module
 * level, or memoised) - an object rebuilt on each render would restart the
 * effect forever.
 */
export function useDataTable({ selectors, actions, fetchAction }) {
  const dispatch = useDispatch();

  const rows = useSelector(selectors.selectItems);
  const pagination = useSelector(selectors.selectPagination);
  const pageItems = useSelector(selectors.selectPageItems);
  const rowRange = useSelector(selectors.selectRowRange);
  const activeFilterCount = useSelector(selectors.selectActiveFilterCount);
  const isFiltered = useSelector(selectors.selectIsFiltered);
  const { isLoading, error } = useSelector(selectors.selectStatus);
  const { page, limit, search, searchQuery, sort, columnFilters, appliedFilters } =
    useSelector(selectors.selectQuery);

  const commitSearch = useMemo(
    () =>
      _.debounce(
        (value) => dispatch(actions.searchCommitted(value)),
        TABLE_DEFAULTS.SEARCH_DEBOUNCE_MS,
      ),
    [actions, dispatch],
  );

  const applyFilters = useMemo(
    () =>
      _.debounce(
        () => dispatch(actions.filtersApplied()),
        TABLE_DEFAULTS.FILTER_DEBOUNCE_MS,
      ),
    [actions, dispatch],
  );

  useEffect(
    () => () => {
      commitSearch.cancel();
      applyFilters.cancel();
    },
    [applyFilters, commitSearch],
  );

  // Objects are compared by identity in a dependency array, and the store
  // hands back a fresh one on every change - these give the effect something
  // stable to compare.
  //
  // While a capability is switched off its key stays constant, so sorting a
  // column or setting a filter updates the UI without firing a request the
  // backend would answer identically.
  const sortKey =
    TABLE_CAPABILITIES.SORT_ENABLED && sort?.field ? `${sort.field}:${sort.order}` : "";
  const filtersKey = TABLE_CAPABILITIES.COLUMN_FILTERS_ENABLED
    ? JSON.stringify(appliedFilters)
    : "";

  useEffect(() => {
    const request = dispatch(fetchAction());

    return () => request.abort();
  }, [dispatch, fetchAction, searchQuery, page, limit, sortKey, filtersKey]);

  const changeSearch = useCallback(
    (value) => {
      dispatch(actions.searchChanged(value));
      commitSearch(value);
    },
    [actions, commitSearch, dispatch],
  );

  // Enter should not have to wait out the debounce.
  const submitSearch = useCallback(() => commitSearch.flush(), [commitSearch]);

  const changeColumnFilter = useCallback(
    (key, value, { immediate = false } = {}) => {
      dispatch(actions.columnFilterChanged({ key, value }));

      if (!immediate) {
        applyFilters();
        return;
      }

      applyFilters.cancel();
      dispatch(actions.filtersApplied());
    },
    [actions, applyFilters, dispatch],
  );

  const clearFilters = useCallback(() => {
    commitSearch.cancel();
    applyFilters.cancel();
    dispatch(actions.filtersCleared());
  }, [actions, applyFilters, commitSearch, dispatch]);

  const changeSort = useCallback(
    (nextSort) => dispatch(actions.sortChanged(nextSort)),
    [actions, dispatch],
  );

  const changePage = useCallback(
    (value) => dispatch(actions.pageChanged(value)),
    [actions, dispatch],
  );

  const changeLimit = useCallback(
    (value) => dispatch(actions.limitChanged(value)),
    [actions, dispatch],
  );

  const refresh = useCallback(() => dispatch(fetchAction()), [dispatch, fetchAction]);

  return {
    rows,
    pagination,
    pageItems,
    rowRange,
    isLoading,
    error,
    search,
    sort,
    columnFilters,
    activeFilterCount,
    isFiltered,
    changeSearch,
    submitSearch,
    changeColumnFilter,
    clearFilters,
    changeSort,
    changePage,
    changeLimit,
    refresh,
  };
}

export default useDataTable;
