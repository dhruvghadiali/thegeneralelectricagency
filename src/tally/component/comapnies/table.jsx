import { useMemo, useState } from "react";
import { Building2, Eye } from "lucide-react";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";
import { normalizeSort } from "@/utils/dataTable.util";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";
import CompanyDetails from "@Tally/component/comapnies/details";

const COLUMNS = [
  {
    key: "name",
    header: "Company name",
    type: COLUMN_TYPES.TEXT,
    field: "name",
    sortKey: "name",
    className: "min-w-56 font-medium",
    mobile: MOBILE_SLOTS.PRIMARY,
  },
  {
    key: "guid",
    header: "Tally GUID",
    type: COLUMN_TYPES.TEXT,
    field: "guid",
    sortKey: "guid",
    className: "min-w-72 break-all font-mono",
    mobile: MOBILE_SLOTS.META,
    mobileLabel: "GUID:",
  },
  {
    key: "masterId",
    header: "Master ID",
    type: COLUMN_TYPES.TEXT,
    field: "masterId",
    sortKey: "masterId",
    className: "font-mono",
    mobile: MOBILE_SLOTS.META,
    mobileLabel: "Master ID:",
  },
];

function CompaniesTable({ companies, status, error, onRetry }) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const matchingCompanies = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    const filtered = query
      ? companies.filter((company) =>
          [company.name, company.guid, company.masterId].some((value) =>
            value.toLocaleLowerCase().includes(query),
          ),
        )
      : companies;
    const sorts = normalizeSort(sort);
    if (sorts.length === 0) return filtered;

    return [...filtered].sort((first, second) => {
      for (const { field, order } of sorts) {
        const comparison = first[field].localeCompare(second[field], undefined, {
          numeric: true,
          sensitivity: "base",
        });
        if (comparison !== 0) return order === "desc" ? -comparison : comparison;
      }
      return 0;
    });
  }, [companies, search, sort]);

  const total = matchingCompanies.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const currentPage = Math.min(page, totalPages);
  const rows = matchingCompanies.slice((currentPage - 1) * limit, currentPage * limit);
  const pagination = { page: currentPage, limit, total, totalPages };

  return (
    <>
      <div className="min-w-0 w-full max-w-full overflow-hidden">
        <DataTable
      columns={COLUMNS}
      rows={rows}
      rowKey={(company) => company.guid || company.masterId || company.name}
      rowActions={(company) => (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setSelectedCompany(company)}
          aria-label={`View ${company.name}`}
          title="View company"
        >
          <Eye className="size-4" aria-hidden="true" />
        </Button>
      )}
      search={search}
      sort={sort}
      columnFilters={{}}
      pagination={pagination}
      pageItems={buildPageItems(currentPage, totalPages)}
      rowRange={getRowRange({ ...pagination, count: rows.length })}
      activeFilterCount={0}
      isFiltered={Boolean(search.trim())}
      onSearchChange={(value) => {
        setSearch(value);
        setPage(1);
      }}
      onSearchSubmit={() => {}}
      onSortChange={(value) => {
        setSort(value);
        setPage(1);
      }}
      onClearFilters={() => {
        setSearch("");
        setPage(1);
      }}
      onPageChange={setPage}
      onLimitChange={(value) => {
        setLimit(value);
        setPage(1);
      }}
      onRetry={onRetry}
      isLoading={status === "loading"}
      error={status === "failed" ? error : null}
      searchPlaceholder="Search companies by name or Tally ID..."
      rowNoun="companies"
      emptyIcon={Building2}
      emptyTitle={status === "succeeded" ? "No companies found" : "No companies loaded"}
      emptyDescription={
        status === "succeeded"
          ? "Tally returned no companies."
          : "Get company information from Tally to load companies."
      }
      filteredEmptyDescription="No companies match your search."
      maxBodyHeight="none"
        />
      </div>
      <CompanyDetails company={selectedCompany} onClose={() => setSelectedCompany(null)} />
    </>
  );
}

export default CompaniesTable;
