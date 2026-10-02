import { Building2, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { COMPANY_COLUMNS } from "@Tally/component/companies/tallyCompanies/table/company.columns";
import CompanyDetails from "@Tally/component/companies/tallyCompanies/sheet";
import { TALLY_COMPANIES_STATUS } from "@Tally/enum/tallyCompaniesStatus.enum";
import {
  companyDetailsOpened,
  columnFilterChanged,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  sortChanged,
} from "@Tally/redux/tallyCompanies/tallyCompanies.slice";
import {
  selectTallyCompanies,
  selectTallyCompaniesTableView,
} from "@Tally/redux/tallyCompanies/tallyCompanies.selector";

function TallyCompaniesTable() {
  const dispatch = useDispatch();
  const { status } = useSelector(selectTallyCompanies);
  const {
    rows,
    search,
    sort,
    columnFilters,
    pagination,
    pageItems,
    rowRange,
    activeFilterCount,
    isFiltered,
  } = useSelector(selectTallyCompaniesTableView);

  return (
    <>
      <DataTable
        fillHeight
        hideHeaderWhenEmpty
        columns={COMPANY_COLUMNS}
        rows={rows}
        rowKey={(company) => company.guid || company.masterId || company.name}
        rowActions={(company) => (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => dispatch(companyDetailsOpened(company))}
            aria-label={`View details for ${company.name}`}
            title="View company details"
          >
            <Eye className="size-4" aria-hidden="true" />
          </Button>
        )}
        search={search}
        sort={sort}
        columnFilters={columnFilters}
        pagination={pagination}
        pageItems={pageItems}
        rowRange={rowRange}
        activeFilterCount={activeFilterCount}
        isFiltered={isFiltered}
        onSearchChange={(value) => dispatch(searchChanged(value))}
        onSearchSubmit={() => {}}
        onSortChange={(value) => dispatch(sortChanged(value))}
        onColumnFilterChange={(key, value) =>
          dispatch(columnFilterChanged({ key, value }))
        }
        onClearFilters={() => dispatch(filtersCleared())}
        onPageChange={(value) => dispatch(pageChanged(value))}
        onLimitChange={(value) => dispatch(limitChanged(value))}
        isLoading={status === TALLY_COMPANIES_STATUS.LOADING}
        searchPlaceholder="Search Tally companies..."
        rowNoun="companies"
        emptyIcon={Building2}
        emptyTitle={
          status === TALLY_COMPANIES_STATUS.SUCCEEDED
            ? "No companies found"
            : "No companies loaded"
        }
        emptyDescription={
          status === TALLY_COMPANIES_STATUS.SUCCEEDED
            ? "Tally returned no companies."
            : "Use Sync Tally Companies to load companies."
        }
        filteredEmptyDescription="No companies match your filters."
        paginationMode="client"
      />
      <CompanyDetails />
    </>
  );
}

export default TallyCompaniesTable;
