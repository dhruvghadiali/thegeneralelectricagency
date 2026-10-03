import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import ProductTableActions from "@screenComponent/products/table/productTableActions";
import useProductTable from "@screenComponent/products/table/useProductTable";
import {
  selectCanManageProducts,
  selectSelectedProductIds,
  selectSelectedProducts,
} from "@Redux/product/product.selector";
import { productRowSelectionChanged } from "@Redux/product/product.slice";
import { PRODUCT_TABLE_CONFIG } from "@Tables/product";

function ProductTable({ onCreateQuotation }) {
  const dispatch = useDispatch();
  const table = useProductTable();
  const canManage = useSelector(selectCanManageProducts);
  const selectedProducts = useSelector(selectSelectedProducts);
  const selectedProductIds = useSelector(selectSelectedProductIds);

  const displayedProducts = useMemo(() => {
    if (selectedProducts.length === 0) return table.rows;

    return [
      ...selectedProducts,
      ...table.rows.filter((product) => !selectedProductIds.has(product.id)),
    ];
  }, [selectedProductIds, selectedProducts, table.rows]);

  const changeProductSelection = (product, checked) =>
    dispatch(productRowSelectionChanged({ product, checked }));

  return (
    <DataTable
      {...PRODUCT_TABLE_CONFIG}
      rows={displayedProducts}
      rowKey={(product) => product.id}
      selectedRowKeys={[...selectedProductIds]}
      onRowSelectionChange={canManage ? changeProductSelection : undefined}
      selectionLabel={(product) => `Select ${product.name} for quotation`}
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
      rowActions={
        canManage
          ? (product) => (
              <ProductTableActions
                product={product}
                canManage={canManage}
                onPdf={(row) => onCreateQuotation([row])}
                showPdf={selectedProducts.length === 0}
              />
            )
          : undefined
      }
      emptyDescription={
        canManage
          ? "Add your first product to start building the catalogue."
          : "Products will appear here when an employee adds them."
      }
    />
  );
}

export default ProductTable;
