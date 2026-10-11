import { useEffect } from "react";
import { Building2, Eye, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { COMPANY_COLUMNS } from "@Tally/component/companies/systemCompanies/table/company.columns";
import SystemCompanyDetails from "@Tally/component/companies/systemCompanies/sheet";
import { SYSTEM_COMPANIES_STATUS } from "@Tally/enum/systemCompaniesStatus.enum";
import { fetchSystemCompanies } from "@Tally/redux/systemCompanies/systemCompanies.action";
import {
  companyDetailsOpened,
  columnFilterChanged,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
} from "@Tally/redux/systemCompanies/systemCompanies.slice";
import {
  selectSystemCompanies,
  selectSystemCompaniesTableView,
} from "@Tally/redux/systemCompanies/systemCompanies.selector";

function SystemCompaniesTable() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectSystemCompanies);
  const isLoading = status === SYSTEM_COMPANIES_STATUS.LOADING;
  const {
    rows,
    search,
    columnFilters,
    pagination,
    pageItems,
    rowRange,
    activeFilterCount,
    isFiltered,
  } = useSelector(selectSystemCompaniesTableView);

  useEffect(() => {
    if (status === SYSTEM_COMPANIES_STATUS.IDLE) dispatch(fetchSystemCompanies());
  }, [dispatch, status]);

  return (
    <>
      <DataTable
        fillHeight
        hideHeaderWhenEmpty
        columns={COMPANY_COLUMNS}
        rows={rows}
        rowKey={(company) => company._id || company.company_id}
        rowActions={(company) => (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => dispatch(companyDetailsOpened(company))}
            aria-label={`View details for ${company.company_name || company.company_id}`}
            title="View company details"
          >
            <Eye className="size-4" aria-hidden="true" />
          </Button>
        )}
        search={search}
        sort={[]}
        columnFilters={columnFilters}
        activeFilterCount={activeFilterCount}
        isFiltered={isFiltered}
        onSearchChange={(value) => dispatch(searchChanged(value))}
        onSearchSubmit={() => {}}
        onColumnFilterChange={(key, value) => dispatch(columnFilterChanged({ key, value }))}
        onClearFilters={() => dispatch(filtersCleared())}
        onRetry={() => dispatch(fetchSystemCompanies())}
        toolbarActions={
          <Button
            type="button"
            variant="outline"
            onClick={() => dispatch(fetchSystemCompanies())}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            <RefreshCw className={isLoading ? "size-4 animate-spin" : "size-4"} aria-hidden="true" />
            Refresh
          </Button>
        }
        pagination={pagination}
        pageItems={pageItems}
        rowRange={rowRange}
        isLoading={isLoading}
        error={error}
        onPageChange={(page) => dispatch(pageChanged(page))}
        onLimitChange={(limit) => dispatch(limitChanged(limit))}
        searchPlaceholder="Search company name, ID, code or GST number..."
        rowNoun="companies"
        emptyIcon={Building2}
        emptyTitle="No companies found"
        emptyDescription="No system companies are available."
        filteredEmptyDescription="No companies match your search or filters."
        paginationMode="client"
      />
      <SystemCompanyDetails />
    </>
  );
}

export default SystemCompaniesTable;
