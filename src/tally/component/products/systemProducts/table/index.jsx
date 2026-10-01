import { useEffect } from "react";
import { Boxes, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { SYSTEM_PRODUCTS_STATUS } from "@Tally/enum/systemProductsStatus.enum";
import { fetchSystemProducts } from "@Tally/redux/systemProducts/systemProducts.action";
import {
  columnFilterChanged,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
} from "@Tally/redux/systemProducts/systemProducts.slice";
import {
  selectSystemProducts,
  selectSystemProductsTableView,
} from "@Tally/redux/systemProducts/systemProducts.selector";
import { PRODUCT_COLUMNS } from "@Tally/component/products/systemProducts/table/product.columns";

function SystemProductsTable() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectSystemProducts);
  const isLoading = status === SYSTEM_PRODUCTS_STATUS.LOADING;
  const {
    rows,
    search,
    columnFilters,
    pagination,
    pageItems,
    rowRange,
    activeFilterCount,
    isFiltered,
  } = useSelector(selectSystemProductsTableView);

  useEffect(() => {
    if (status === SYSTEM_PRODUCTS_STATUS.IDLE) dispatch(fetchSystemProducts());
  }, [dispatch, status]);

  return (
    <DataTable
      fillHeight
      hideHeaderWhenEmpty
      columns={PRODUCT_COLUMNS}
      rows={rows}
      rowKey={(product) => product._id || product.product_id}
      search={search}
      sort={[]}
      columnFilters={columnFilters}
      activeFilterCount={activeFilterCount}
      isFiltered={isFiltered}
      onSearchChange={(value) => dispatch(searchChanged(value))}
      onSearchSubmit={() => {}}
      onColumnFilterChange={(key, value) =>
        dispatch(columnFilterChanged({ key, value }))
      }
      onClearFilters={() => dispatch(filtersCleared())}
      onRetry={() => dispatch(fetchSystemProducts())}
      toolbarActions={
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(fetchSystemProducts())}
          disabled={isLoading}
          aria-busy={isLoading}
        >
          <RefreshCw
            className={isLoading ? "size-4 animate-spin" : "size-4"}
            aria-hidden="true"
          />
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
      searchPlaceholder="Search product name or HSN code..."
      rowNoun="products"
      emptyIcon={Boxes}
      emptyTitle="No products found"
      emptyDescription="No system products are available."
      filteredEmptyDescription="No products match your search or filters."
      paginationMode="client"
    />
  );
}

export default SystemProductsTable;
