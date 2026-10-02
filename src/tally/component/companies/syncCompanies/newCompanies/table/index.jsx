import { useEffect } from "react";
import { Building2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { NEW_COMPANY_COLUMNS } from "@Tally/component/companies/syncCompanies/newCompanies/table/company.columns";
import { SYSTEM_COMPANIES_STATUS } from "@Tally/enum/systemCompaniesStatus.enum";
import { TALLY_COMPANIES_STATUS } from "@Tally/enum/tallyCompaniesStatus.enum";
import { SYNC_COMPANIES_SAVE_STATUS } from "@Tally/enum/syncCompaniesSaveStatus.enum";
import { fetchSystemCompanies } from "@Tally/redux/systemCompanies/systemCompanies.action";
import { selectSystemCompanies } from "@Tally/redux/systemCompanies/systemCompanies.selector";
import { selectTallyCompanies } from "@Tally/redux/tallyCompanies/tallyCompanies.selector";
import {
  columnFilterChanged, filtersCleared, limitChanged, pageChanged,
  searchChanged, rowSelectionChanged, rowsSelectionChanged,
  selectionCleared, sortChanged,
} from "@Tally/redux/syncCompanies/syncCompanies.slice";
import {
  selectNewCompanySelection, selectNewCompaniesTableView,
  selectSyncCompaniesSaveState,
} from "@Tally/redux/syncCompanies/syncCompanies.selector";

function NewCompaniesTable() {
  const dispatch = useDispatch();
  const { status: systemStatus, error: systemError } = useSelector(selectSystemCompanies);
  const { status: tallyStatus } = useSelector(selectTallyCompanies);
  const selectedRowKeys = useSelector(selectNewCompanySelection);
  const { status: saveStatus } = useSelector(selectSyncCompaniesSaveState);
  const isSaving = saveStatus === SYNC_COMPANIES_SAVE_STATUS.LOADING;
  const {
    rows, selectionRows, search, sort, columnFilters, pagination,
    pageItems, rowRange, activeFilterCount, isFiltered,
  } = useSelector(selectNewCompaniesTableView);

  useEffect(() => {
    if (systemStatus === SYSTEM_COMPANIES_STATUS.IDLE) dispatch(fetchSystemCompanies());
  }, [dispatch, systemStatus]);

  const isReady =
    systemStatus === SYSTEM_COMPANIES_STATUS.SUCCEEDED &&
    tallyStatus === TALLY_COMPANIES_STATUS.SUCCEEDED;
  const isLoading =
    systemStatus === SYSTEM_COMPANIES_STATUS.LOADING ||
    tallyStatus === TALLY_COMPANIES_STATUS.LOADING;

  return (
    <DataTable
      fillHeight
      hideHeaderWhenEmpty
      columns={NEW_COMPANY_COLUMNS}
      rows={rows}
      selectedRowKeys={selectedRowKeys}
      selectionRows={selectionRows}
      selectionLabel={(company) => `Select ${company.company_name || company.company_id}`}
      onRowSelectionChange={(company, checked) => {
        if (!isSaving) dispatch(rowSelectionChanged({ key: company._id, checked }));
      }}
      onAllRowsSelectionChange={(companies, checked) =>
        !isSaving && dispatch(rowsSelectionChanged({
          keys: companies.map((company) => company._id),
          checked,
        }))
      }
      rowKey={(company) => company._id}
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
      onColumnFilterChange={(key, value) => dispatch(columnFilterChanged({ key, value }))}
      onClearFilters={() => dispatch(filtersCleared())}
      onPageChange={(value) => dispatch(pageChanged(value))}
      onLimitChange={(value) => dispatch(limitChanged(value))}
      isLoading={isLoading || isSaving}
      error={systemError}
      onRetry={() => dispatch(fetchSystemCompanies())}
      searchPlaceholder="Search new Tally companies..."
      toolbarActions={selectedRowKeys.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <span>{selectedRowKeys.length} selected</span>
          <Button type="button" variant="outline" size="sm" onClick={() => dispatch(selectionCleared())} disabled={isSaving}>
            Clear selection
          </Button>
        </div>
      )}
      rowNoun="companies"
      emptyIcon={Building2}
      emptyTitle={isReady ? "No new companies found" : "Comparison not ready"}
      emptyDescription={
        tallyStatus !== TALLY_COMPANIES_STATUS.SUCCEEDED
          ? "Use Sync Tally Companies to load companies from Tally."
          : "All Tally companies are already stored in the system."
      }
      filteredEmptyDescription="No new companies match your filters."
      paginationMode="client"
    />
  );
}

export default NewCompaniesTable;

