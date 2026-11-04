import { Boxes } from "lucide-react";

import DataTable from "@commonComponent/dataTable";
import useProductTable from "@screenComponent/stocks/table/useProductTable";

import { STOCK_PRODUCT_COLUMNS } from "@screenComponent/stocks/table/stockProductTable.columns";

function StockProductTable() {
  const table = useProductTable();

  return (
    <DataTable
      columns={STOCK_PRODUCT_COLUMNS}
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
      searchPlaceholder="Search products by name"
      rowNoun="products"
      emptyIcon={Boxes}
      emptyTitle="No products found"
      emptyDescription="Products will appear here when they are available."
      filteredEmptyDescription="Try changing your search or filters."
      fillHeight
    />
  );
}

export default StockProductTable;
