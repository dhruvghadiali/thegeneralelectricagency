import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ROUTE_BUILDERS } from "@routes/navigate";
import { isEmployeeCanManageProducts } from "@Redux/product/product.selector";
import { PRODUCT_TABLE_CONFIG } from "@screenComponent/products/table/productTable.config";

import DataTable from "@commonComponent/dataTable";
import ProductRowActionDialog from "@screenComponent/products/dialogs/productRowActionDialog";
import ProductDetailSheet from "@screenComponent/products/sheet/productView";
import useProductTable from "@screenComponent/products/table/useProductTable";
import ProductTableActions from "@screenComponent/products/table/productTableActions";

function ProductTable() {
  const navigate = useNavigate();
  const table = useProductTable();
  const canManage = useSelector(isEmployeeCanManageProducts);
  const [viewedProduct, setViewedProduct] = useState(null);
  const [rowActionProduct, setRowActionProduct] = useState(null);

  const editProduct = (product) => {
    setRowActionProduct(null);
    navigate(ROUTE_BUILDERS.productEdit(product.id), {
      state: { product },
    });
  };

  const viewProduct = (product) => {
    setRowActionProduct(null);
    setViewedProduct(product);
  };

  return (
    <>
      <DataTable
        {...PRODUCT_TABLE_CONFIG}
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
        onRowEnter={setRowActionProduct}
        rowActions={(product) => (
          <ProductTableActions
            product={product}
            canManage={canManage}
            onView={viewProduct}
            onEdit={editProduct}
          />
        )}
        emptyDescription={
          canManage
            ? "Add your first product to start building the catalogue."
            : "Products will appear here when an employee adds them."
        }
      />

      <ProductRowActionDialog
        product={rowActionProduct}
        canEdit={canManage}
        onOpenChange={(open) => !open && setRowActionProduct(null)}
        onView={viewProduct}
        onEdit={editProduct}
      />

      <ProductDetailSheet
        product={viewedProduct}
        onClose={() => setViewedProduct(null)}
      />
    </>
  );
}

export default ProductTable;
