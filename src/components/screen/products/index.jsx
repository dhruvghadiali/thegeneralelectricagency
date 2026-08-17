import { Boxes } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import { ROLE_PATHS } from "@Enums";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "@Redux/product/product.action";
import { selectProductDialogState } from "@Redux/product/product.selector";
import {
  productDialogClosed,
  productDialogOpened,
} from "@Redux/product/product.slice";
import ProductActions from "@screenComponent/products/productActions";
import { PRODUCT_COLUMNS } from "@screenComponent/products/product.columns";
import ProductDialogs from "@screenComponent/products/productDialogs";
import ProductHeader from "@screenComponent/products/productHeader";
import { useProductList } from "@screenComponent/products/useProductList";

function Products() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const table = useProductList();
  const canManage = role === ROLE_PATHS.EMPLOYEE;
  const {
    dialog,
    isCreating,
    createError,
    isUpdating,
    updateError,
    isDeleting,
    deleteError,
  } = useSelector(selectProductDialogState);

  const openDialog = (type, product) => {
    if (!canManage) return;
    dispatch(productDialogOpened({ type, ...(product && { product }) }));
  };

  const saveProduct = async (values) => {
    try {
      if (dialog?.type === "edit") {
        await dispatch(
          updateProduct({ id: dialog.product.id, values }),
        ).unwrap();
      } else {
        await dispatch(createProduct(values)).unwrap();
      }
      table.refresh();
    } catch {
      // The slice keeps the form open and exposes a display-ready error.
    }
  };

  const deleteSelectedProduct = async () => {
    if (!dialog?.product?.id) return;

    try {
      await dispatch(deleteProduct(dialog.product.id)).unwrap();
      table.refresh();
    } catch {
      // The slice keeps the confirmation open with the request error.
    }
  };

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <ProductHeader
        canManage={canManage}
        onAddProduct={() => openDialog("add")}
      />

      <DataTable
        columns={PRODUCT_COLUMNS}
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
        rowActions={
          canManage
            ? (product) => (
                <ProductActions
                  product={product}
                  onEdit={(row) => openDialog("edit", row)}
                  onDelete={(row) => openDialog("delete", row)}
                />
              )
            : undefined
        }
        searchPlaceholder="Search by product code, name, model, or agency..."
        rowNoun="products"
        emptyIcon={Boxes}
        emptyTitle="No products found"
        emptyDescription={
          canManage
            ? "Add your first product to start building the catalogue."
            : "Products will appear here when an employee adds them."
        }
        filteredEmptyDescription="Try changing your search or filters."
        fillHeight
      />

      {canManage && (
        <ProductDialogs
          dialog={dialog}
          isSaving={dialog?.type === "edit" ? isUpdating : isCreating}
          saveError={dialog?.type === "edit" ? updateError : createError}
          isDeleting={isDeleting}
          deleteError={deleteError}
          onClose={() => dispatch(productDialogClosed())}
          onSave={saveProduct}
          onDelete={deleteSelectedProduct}
        />
      )}
    </main>
  );
}

export default Products;
