import { useMemo, useState } from "react";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";
import { normalizeSort } from "@/utils/dataTable.util";
import { TALLY_COMPANIES_TABLE_COLUMNS } from "@Tally/tables/tallyCompanies/tallyCompaniesTable.columns";

export function useTallyComparisonTable(companies) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState([{ field: "company_name", order: "asc" }]);
  const matches = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = companies.filter((company) => TALLY_COMPANIES_TABLE_COLUMNS.some(({ field }) => String(company[field] ?? "").toLowerCase().includes(query)));
    return filtered.sort((a, b) => {
      for (const { field, order } of normalizeSort(sort)) {
        const comparison = String(a[field] ?? "").localeCompare(String(b[field] ?? ""), undefined, { numeric: true, sensitivity: "base" });
        if (comparison) return order === "desc" ? -comparison : comparison;
      }
      return 0;
    });
  }, [companies, search, sort]);
  const totalPages = Math.max(1, Math.ceil(matches.length / limit));
  const currentPage = Math.min(page, totalPages);
  const rows = matches.slice((currentPage - 1) * limit, currentPage * limit);
  const pagination = { page: currentPage, limit, total: matches.length, totalPages };
  return {
    rows, pagination, search, sort,
    columnFilters: {}, activeFilterCount: 0, isFiltered: Boolean(search.trim()),
    pageItems: buildPageItems(currentPage, totalPages),
    rowRange: getRowRange({ ...pagination, count: rows.length }),
    onSearchChange: (value) => { setSearch(value); setPage(1); },
    onSearchSubmit: () => {},
    onSortChange: (value) => { setSort(value); setPage(1); },
    onPageChange: setPage,
    onLimitChange: (value) => { setLimit(value); setPage(1); },
    onClearFilters: () => { setSearch(""); setPage(1); },
  };
}
