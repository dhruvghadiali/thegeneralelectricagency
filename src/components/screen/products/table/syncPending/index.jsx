import { Boxes } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ROUTE_BUILDERS } from "@routes/navigate";
import DataTable from "@commonComponent/dataTable";
import useSyncPendingTable from "@screenComponent/products/table/syncPending/useSyncPendingTable";
import { SYNC_PENDING_TABLE_COLUMNS } from "@screenComponent/products/table/syncPending/syncPendingTable.columns";
import SyncPendingTableActions from "@screenComponent/products/table/syncPending/syncPendingTableActions";

function SyncPending() {
  const navigate = useNavigate();
  const table = useSyncPendingTable();

  return (
    <DataTable
      columns={SYNC_PENDING_TABLE_COLUMNS}
      rows={table.rows}
      rowKey={(product) => product.id}
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
      rowActions={(product) => (
        <SyncPendingTableActions
          product={product}
          onEdit={(row) =>
            navigate(ROUTE_BUILDERS.productEdit(row.id), {
              state: { product: row },
            })
          }
        />
      )}
      searchPlaceholder="Search pending products..."
      rowNoun="products"
      emptyIcon={Boxes}
      emptyTitle="No sync-pending products"
      emptyDescription="Products pending synchronization will appear here."
      fillHeight
    />
  );
}

export default SyncPending;
