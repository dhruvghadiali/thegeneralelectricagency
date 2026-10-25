import { useEffect, useMemo } from "react";
import { Boxes, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { getUnmappedProductColumns } from "@Tally/component/products/unmappedProducts/table/product.columns";
import { UNMAPPED_PRODUCTS_STATUS } from "@Tally/enum/unmappedProductsStatus.enum";
import { fetchUnmappedProducts } from "@Tally/redux/unmappedProducts/unmappedProducts.action";
import {
  columnFilterChanged,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  sortChanged,
} from "@Tally/redux/unmappedProducts/unmappedProducts.slice";
import {
  selectUnmappedProducts,
  selectUnmappedProductsTableView,
} from "@Tally/redux/unmappedProducts/unmappedProducts.selector";

function UnmappedProductsTable() {
  const dispatch = useDispatch();
  const { status, error, stockGroups } = useSelector(selectUnmappedProducts);
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
  } = useSelector(selectUnmappedProductsTableView);
  const isLoading = status === UNMAPPED_PRODUCTS_STATUS.LOADING;
  const columns = useMemo(
    () => getUnmappedProductColumns(stockGroups),
    [stockGroups],
  );

  useEffect(() => {
    if (status === UNMAPPED_PRODUCTS_STATUS.IDLE) {
      dispatch(fetchUnmappedProducts());
    }
  }, [dispatch, status]);

  return (
    <DataTable
      fillHeight
      hideHeaderWhenEmpty
      columns={columns}
      rows={rows}
      rowKey={(product) => product._id || product.product_id}
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
      onRetry={() => dispatch(fetchUnmappedProducts())}
      toolbarActions={
        <Button
          type="button"
          variant="outline"
          onClick={() => dispatch(fetchUnmappedProducts())}
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
      isLoading={isLoading}
      error={error}
      searchPlaceholder="Search un-mapped products..."
      rowNoun="products"
      emptyIcon={Boxes}
      emptyTitle="No un-mapped products found"
      emptyDescription="All Tally products are mapped to system products."
      filteredEmptyDescription="No un-mapped products match your filters."
      paginationMode="client"
    />
  );
}

export default UnmappedProductsTable;
