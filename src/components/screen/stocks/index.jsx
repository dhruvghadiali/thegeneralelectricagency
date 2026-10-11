import { useDispatch, useSelector } from "react-redux";
import { Boxes } from "lucide-react";

import DataTable from "@commonComponent/dataTable";
import {
  stockDetailsClosed,
  stockDetailsOpened,
} from "@Redux/stock/stock.slice";
import { selectSelectedStock } from "@Redux/stock/stock.selector";
import { STOCK_COLUMNS } from "@screenComponent/stocks/stock.columns";
import { useStockList } from "@screenComponent/stocks/useStockList";

import StockActions from "@screenComponent/stocks/stockActions";
import StockDetailSheet from "@screenComponent/stocks/stockDetailSheet";
import StockHeader from "@screenComponent/stocks/stockHeader";
import StockSummary from "@screenComponent/stocks/stockSummary";

function Stocks() {
  const dispatch = useDispatch();
  const table = useStockList();
  const selectedStock = useSelector(selectSelectedStock);

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <StockHeader />
      <StockSummary />

      <DataTable
        columns={STOCK_COLUMNS}
        rows={table.rows}
        rowKey={(stock) => stock.id}
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
        rowActions={(stock) => (
          <StockActions
            stock={stock}
            onView={(row) => dispatch(stockDetailsOpened(row))}
          />
        )}
        searchPlaceholder="Search by product, SKU, brand, category, or model..."
        rowNoun="products"
        emptyIcon={Boxes}
        emptyTitle="No stock found"
        emptyDescription="Existing product stock will appear here when available."
        filteredEmptyDescription="Try changing your search or filters."
        fillHeight
      />

      <StockDetailSheet
        stock={selectedStock}
        onClose={() => dispatch(stockDetailsClosed())}
      />
    </main>
  );
}

export default Stocks;
