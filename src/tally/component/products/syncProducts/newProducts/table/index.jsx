import { useEffect } from "react";
import { Boxes } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { NEW_PRODUCT_COLUMNS } from "@Tally/component/products/syncProducts/newProducts/table/product.columns";
import { SYSTEM_PRODUCTS_STATUS } from "@Tally/enum/systemProductsStatus.enum";
import { TALLY_PRODUCTS_STATUS } from "@Tally/enum/tallyProductsStatus.enum";
import {
  columnFilterChanged,
  filtersCleared,
  limitChanged,
  pageChanged,
  searchChanged,
  rowSelectionChanged,
  rowsSelectionChanged,
  selectionCleared,
  sortChanged,
} from "@Tally/redux/syncProducts/syncProducts.slice";
import {
  selectNewProductSelection,
  selectNewProductsTableView,
} from "@Tally/redux/syncProducts/syncProducts.selector";
import { fetchSystemProducts } from "@Tally/redux/systemProducts/systemProducts.action";
import { selectSystemProducts } from "@Tally/redux/systemProducts/systemProducts.selector";
import { selectTallyProducts } from "@Tally/redux/tallyProducts/tallyProducts.selector";

function NewProductsTable() {
  const dispatch = useDispatch();
  const { status: systemStatus, error: systemError } = useSelector(selectSystemProducts);
  const { status: tallyStatus } = useSelector(selectTallyProducts);
  const selectedRowKeys = useSelector(selectNewProductSelection);
  const {
    rows,
    selectionRows,
    search,
    sort,
    columnFilters,
    pagination,
    pageItems,
    rowRange,
    activeFilterCount,
    isFiltered,
  } = useSelector(selectNewProductsTableView);

  useEffect(() => {
    if (systemStatus === SYSTEM_PRODUCTS_STATUS.IDLE) dispatch(fetchSystemProducts());
  }, [dispatch, systemStatus]);

  const isReady =
    systemStatus === SYSTEM_PRODUCTS_STATUS.SUCCEEDED &&
    tallyStatus === TALLY_PRODUCTS_STATUS.SUCCEEDED;
  const isLoading =
    systemStatus === SYSTEM_PRODUCTS_STATUS.LOADING ||
    tallyStatus === TALLY_PRODUCTS_STATUS.LOADING;

  return (
    <DataTable
      fillHeight
      hideHeaderWhenEmpty
      columns={NEW_PRODUCT_COLUMNS}
      rows={rows}
      selectedRowKeys={selectedRowKeys}
      selectionRows={selectionRows}
      selectionLabel={(product) => `Select ${product.name || product.guid}`}
      onRowSelectionChange={(product, checked) =>
        dispatch(rowSelectionChanged({ key: product.guid, checked }))
      }
      onAllRowsSelectionChange={(products, checked) =>
        dispatch(rowsSelectionChanged({
          keys: products.map((product) => product.guid),
          checked,
        }))
      }
      rowKey={(product) => product.guid || product.masterId || product.name}
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
      isLoading={isLoading}
      error={systemError}
      onRetry={() => dispatch(fetchSystemProducts())}
      searchPlaceholder="Search new Tally products..."
      toolbarActions={selectedRowKeys.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <span>{selectedRowKeys.length} selected</span>
          <Button type="button" variant="outline" size="sm" onClick={() => dispatch(selectionCleared())}>
            Clear selection
          </Button>
        </div>
      )}
      rowNoun="products"
      emptyIcon={Boxes}
      emptyTitle={isReady ? "No new products found" : "Comparison not ready"}
      emptyDescription={
        tallyStatus !== TALLY_PRODUCTS_STATUS.SUCCEEDED
          ? "Use Sync Tally Products to load products from Tally."
          : "Every Tally product GUID already exists as a system product ID."
      }
      filteredEmptyDescription="No new products match your filters."
      paginationMode="client"
    />
  );
}

export default NewProductsTable;
