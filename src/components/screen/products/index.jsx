import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcnComponent/tabs";

import { ROLE_PATHS } from "@Enums";
import { ROUTES, ROUTE_BUILDERS } from "@routes/navigate";
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

const PRODUCT_TABS = Object.freeze({ PRODUCT: "product", TALLY: "tally-product" });

function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector((state) => state.auth.role);
  const table = useProductTable();
  const canManage = role === ROLE_PATHS.EMPLOYEE;
  const canView = [ROLE_PATHS.SUPER_ADMIN, ROLE_PATHS.EMPLOYEE].includes(role);
  const [activeTab, setActiveTab] = useState(PRODUCT_TABS.PRODUCT);

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

  const productHeader = (
    <ProductHeader
      canManage={canManage}
      selectedCount={selectedProducts.length}
      onViewQuotation={() => setQuotationProducts(selectedProducts)}
      onAddProduct={() => navigate(ROUTES.PRODUCT_NEW)}
    />
  );

  const productTable = (
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
                    navigate(ROUTE_BUILDERS.productEdit(row.id), {
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
  );

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      {canManage ? (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex min-w-0 flex-col gap-4 roomy:min-h-0 roomy:flex-1"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TabsList aria-label="Product sections" className="w-full sm:w-auto">
              <TabsTrigger value={PRODUCT_TABS.PRODUCT} className="flex-1 sm:flex-none">
                Product
              </TabsTrigger>
              <TabsTrigger value={PRODUCT_TABS.TALLY} className="flex-1 sm:flex-none">
                Tally Product
              </TabsTrigger>
            </TabsList>
            {activeTab === PRODUCT_TABS.PRODUCT && productHeader}
          </div>
          <TabsContent
            value={PRODUCT_TABS.PRODUCT}
            className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
          >
            {productTable}
          </TabsContent>
          <TabsContent
            value={PRODUCT_TABS.TALLY}
            className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
          >
            <p>Tally Products</p>
          </TabsContent>
        </Tabs>
      ) : (
        <>
          {productHeader}
          {productTable}
        </>
      )}

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
