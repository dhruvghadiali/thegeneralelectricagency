import { Boxes, Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { TALLY_PRODUCTS_STATUS } from "@Tally/enum/tallyProductsStatus.enum";
import { PRODUCT_COLUMNS } from "@Tally/component/products/tallyProducts/table/product.columns";
import ProductDetails from "@Tally/component/products/tallyProducts/sheet";
import {
  columnFilterChanged,
  filtersCleared,
  limitChanged,
  pageChanged,
  productDetailsOpened,
  searchChanged,
  sortChanged,
} from "@Tally/redux/tallyProducts/tallyProducts.slice";
import {
  selectTallyProducts,
  selectTallyProductsTableView,
} from "@Tally/redux/tallyProducts/tallyProducts.selector";

function TallyProductsTable() {
  const dispatch = useDispatch();
  const { status } = useSelector(selectTallyProducts);
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
  } = useSelector(selectTallyProductsTableView);

  return (
    <>
      <DataTable
        fillHeight
        hideHeaderWhenEmpty
        columns={PRODUCT_COLUMNS}
        rows={rows}
        rowKey={(product) => product.guid || product.masterId || product.name}
        rowActions={(product) => (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => dispatch(productDetailsOpened(product))}
            aria-label={`View details for ${product.name}`}
            title="View product details"
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
        isLoading={status === TALLY_PRODUCTS_STATUS.LOADING}
        searchPlaceholder="Search Tally products..."
        rowNoun="products"
        emptyIcon={Boxes}
        emptyTitle={
          status === TALLY_PRODUCTS_STATUS.SUCCEEDED
            ? "No products found"
            : "No products loaded"
        }
        emptyDescription={
          status === TALLY_PRODUCTS_STATUS.SUCCEEDED
            ? "Tally returned no products."
            : "Use Sync Tally Products to load products."
        }
        filteredEmptyDescription="No products match your filters."
        paginationMode="client"
      />
      <ProductDetails />
    </>
  );
}

export default TallyProductsTable;
