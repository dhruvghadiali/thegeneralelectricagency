import { useDispatch } from "react-redux";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "@commonComponent/dataTable";
import { Button } from "@shadcnComponent/button";
import { purchaseCreditDetailsOpened } from "@Redux/purchaseCredit/purchaseCredit.slice";
import PurchaseCreditDetailSheet from "@screenComponent/purchaseCredits/sheet/purchaseCreditDetailSheet";
import {
  PURCHASE_CREDIT_TABLE_CONFIG,
  PurchaseCreditTableActions,
  usePurchaseCreditTable,
} from "@Tables/purchaseCredit";

function PurchaseCredits() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const table = usePurchaseCreditTable();

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <header className="flex justify-end">
        <h1 className="sr-only">Supplier purchase credits</h1>
        <Button
          type="button"
          className="w-full sm:w-auto"
          onClick={() => navigate("/purchase-credit/new")}
        >
          <Plus className="size-4" />
          Add purchase credit
        </Button>
      </header>

      <DataTable
        {...PURCHASE_CREDIT_TABLE_CONFIG}
        rows={table.rows}
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
        rowActions={(purchaseCredit) => (
          <PurchaseCreditTableActions
            purchaseCredit={purchaseCredit}
            onView={(row) => dispatch(purchaseCreditDetailsOpened(row))}
            onEdit={(row) =>
              navigate(`/purchase-credit/${row.id}/edit`, {
                state: { purchaseCredit: row },
              })
            }
          />
        )}
      />

      <PurchaseCreditDetailSheet />
    </main>
  );
}

export default PurchaseCredits;
