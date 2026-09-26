import { RefreshCw } from "lucide-react";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { TALLY_COMPANY_SYNC_COLUMNS } from "@Tally/component/companySyncs/companySyncs.columns";
import { useCompanySyncs } from "@Tally/component/companySyncs/useCompanySyncs";

function TallyCompanySyncs() {
  const table = useCompanySyncs();

  return (
    <DataTable
      columns={TALLY_COMPANY_SYNC_COLUMNS}
      rows={table.rows}
      rowKey={(sync) => sync.id}
      search={table.search}
      sort={table.sort}
      columnFilters={table.columnFilters}
      pagination={table.pagination}
      pageItems={table.pageItems}
      rowRange={table.rowRange}
      activeFilterCount={table.activeFilterCount}
      isFiltered={table.isFiltered}
      onSearchChange={table.changeSearch}
      onSearchSubmit={table.submitSearch}
      onSortChange={table.changeSort}
      onColumnFilterChange={table.changeColumnFilter}
      onClearFilters={table.clearFilters}
      onPageChange={table.changePage}
      onLimitChange={table.changeLimit}
      onRetry={table.refresh}
      isLoading={table.isLoading}
      error={table.error}
      toolbarActions={(
        <Button
          variant="outline"
          onClick={table.refresh}
          disabled={table.isLoading}
        >
          <RefreshCw className={table.isLoading ? "size-4 animate-spin" : "size-4"} />
          Refresh
        </Button>
      )}
      searchPlaceholder="Search Tally company syncs..."
      rowNoun="syncs"
      emptyIcon={RefreshCw}
      emptyTitle="No company syncs found"
      emptyDescription="Tally company sync history will appear here after the first sync."
      filteredEmptyDescription="Try changing your search."
      fillHeight
    />
  );
}

export default TallyCompanySyncs;
