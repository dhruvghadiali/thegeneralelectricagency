import { useState } from "react";
import { Plus, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import PurchaseOrderActions from "@screenComponent/purchaseOrders/purchaseOrderActions";
import { PURCHASE_ORDER_COLUMNS } from "@screenComponent/purchaseOrders/purchaseOrder.columns";
import PurchaseOrderDetailSheet from "@screenComponent/purchaseOrders/purchaseOrderDetailSheet";
import PurchaseOrderSummary from "@screenComponent/purchaseOrders/purchaseOrderSummary";
import { usePurchaseOrderList } from "@screenComponent/purchaseOrders/usePurchaseOrderList";

function PurchaseOrders() {
  const navigate = useNavigate();
  const table = usePurchaseOrderList();
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <header className="flex justify-end">
        <h1 className="sr-only">Purchase orders</h1>
        <Button
          onClick={() => navigate("/purchases/new")}
          className="w-full sm:w-auto"
        >
          <Plus className="size-4" />
          Add purchase order
        </Button>
      </header>

      <PurchaseOrderSummary />

      <DataTable
        columns={PURCHASE_ORDER_COLUMNS}
        rows={table.rows}
        rowKey={(purchase) => purchase.id}
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
        rowActions={(purchase) => (
          <PurchaseOrderActions
            purchase={purchase}
            onView={setSelectedPurchase}
          />
        )}
        searchPlaceholder="Search by purchase ID, product, or supplier..."
        rowNoun="purchase orders"
        emptyIcon={ShoppingCart}
        emptyTitle="No purchase orders found"
        emptyDescription="Create your first purchase order to start tracking supplier purchases."
        filteredEmptyDescription="Try changing your search or filters."
        fillHeight
      />

      <PurchaseOrderDetailSheet
        purchase={selectedPurchase}
        onClose={() => setSelectedPurchase(null)}
      />
    </main>
  );
}

export default PurchaseOrders;
