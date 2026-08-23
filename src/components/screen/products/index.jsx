import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROLE_PATHS } from "@Enums";
import { deleteProduct } from "@Redux/product/product.action";
import { selectProductDialogState } from "@Redux/product/product.selector";
import {
  productDialogClosed,
  productDialogOpened,
} from "@Redux/product/product.slice";
import {
  PRODUCT_TABLE_CONFIG,
  ProductTableActions,
  useProductTable,
} from "@Tables/product";

import DataTable from "@commonComponent/dataTable";
import ProductHeader from "@screenComponent/products/header/productHeader";
import ProductDialogs from "@screenComponent/products/dialogs/productDialogs";
import ProductStockSheet from "@screenComponent/products/sheet/productStockSheet";
import ProductQuotationSheet from "@screenComponent/products/quotation/productQuotationSheet";

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector((state) => state.auth.role);
  const table = useProductTable();
  const canManage = role === ROLE_PATHS.EMPLOYEE;
  const canView = [ROLE_PATHS.SUPER_ADMIN, ROLE_PATHS.EMPLOYEE].includes(role);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quotationProducts, setQuotationProducts] = useState([]);
  const [viewedProduct, setViewedProduct] = useState(null);
  const { dialog, isDeleting, deleteError } = useSelector(
    selectProductDialogState,
  );

  const selectedProductIds = useMemo(
    () => new Set(selectedProducts.map((product) => product.id)),
    [selectedProducts],
  );
  
  const displayedProducts = useMemo(() => {
    if (selectedProducts.length === 0) return table.rows;

    return [
      ...selectedProducts,
      ...table.rows.filter((product) => !selectedProductIds.has(product.id)),
    ];
  }, [selectedProductIds, selectedProducts, table.rows]);

  const changeProductSelection = (product, checked) => {
    setSelectedProducts((current) => {
      const alreadySelected = current.some((item) => item.id === product.id);

      if (checked) {
        return alreadySelected ? current : [...current, product];
      }

      return current.filter((item) => item.id !== product.id);
    });
  };

  const openDeleteDialog = (product) => {
    if (!canManage) return;
    dispatch(productDialogOpened({ type: "delete", product }));
  };

  const deleteSelectedProduct = async () => {
    if (!dialog?.product?.id) return;

    try {
      await dispatch(deleteProduct(dialog.product.id)).unwrap();
      setSelectedProducts((current) =>
        current.filter((product) => product.id !== dialog.product.id),
      );
      table.refresh();
    } catch {
      // The slice keeps the confirmation open with the request error.
    }
  };

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <ProductHeader
        canManage={canManage}
        selectedCount={selectedProducts.length}
        onViewQuotation={() => setQuotationProducts(selectedProducts)}
        onAddProduct={() => navigate("/products/new")}
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
          canView
            ? (product) => (
                <ProductTableActions
                  product={product}
                  onView={setViewedProduct}
                  canManage={canManage}
                  onEdit={(row) =>
                    navigate(`/products/${row.id}/edit`, {
                      state: { product: row },
                    })
                  }
                  onDelete={openDeleteDialog}
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

      <ProductStockSheet
        product={viewedProduct}
        onClose={() => setViewedProduct(null)}
      />

      {canManage && (
        <>
          <ProductDialogs
            dialog={dialog}
            isDeleting={isDeleting}
            deleteError={deleteError}
            onClose={() => dispatch(productDialogClosed())}
            onDelete={deleteSelectedProduct}
          />
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
