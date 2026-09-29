import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTallyCompanies } from "@Tally/redux/tallyCompanies/tallyCompanies.action";
import { useTallyComparisonTable } from "@Tally/tables/tallyCompanies/useTallyComparisonTable";

export function useTallyCompaniesTable() {
  const dispatch = useDispatch();
  const { items, isLoading, listError } = useSelector((state) => state.tallyCompaniesList);
  const table = useTallyComparisonTable(items);
  useEffect(() => {
    const request = dispatch(fetchTallyCompanies());
    return () => request.abort();
  }, [dispatch]);
  const refresh = useCallback(() => dispatch(fetchTallyCompanies()), [dispatch]);
  return {
    ...table,
    totalCount: items.length,
    isLoading,
    error: listError,
    refresh,
    changeSearch: table.onSearchChange,
    submitSearch: table.onSearchSubmit,
    changeSort: table.onSortChange,
    clearFilters: table.onClearFilters,
    changePage: table.onPageChange,
    changeLimit: table.onLimitChange,
  };
}

export default useTallyCompaniesTable;
