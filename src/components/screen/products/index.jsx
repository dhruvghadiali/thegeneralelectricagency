import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  selectCanManageProducts,
  selectSelectedProductIds,
  selectSelectedProducts,
} from "@Redux/product/product.selector";
import {
  PRODUCT_TABLE_CONFIG,
  ProductTableActions,
  useProductTable,
} from "@Tables/product";
import { productRowSelectionChanged } from "@Redux/product/product.slice";

import DataTable from "@commonComponent/dataTable";
import ProductHeader from "@screenComponent/products/header/productHeader";
import ProductQuotationSheet from "@screenComponent/products/quotation/productQuotationSheet";

function Products() {
  const dispatch = useDispatch();

  const table = useProductTable();
  const canManage = useSelector(selectCanManageProducts);
  const selectedProducts = useSelector(selectSelectedProducts);
  const selectedProductIds = useSelector(selectSelectedProductIds);

  const [quotationProducts, setQuotationProducts] = useState([]);

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
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <ProductHeader
        onViewQuotation={() => setQuotationProducts(selectedProducts)}
      />

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
                  onPdf={(row) => setQuotationProducts([row])}
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

      {canManage && (
        <>
          <ProductQuotationSheet
            products={quotationProducts}
            onClose={() => setQuotationProducts([])}
          />
        </>
      )}
    </main>
  );
}

export default Products;
