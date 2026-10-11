import { useDispatch, useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES, ROUTE_BUILDERS } from "@routes/navigate";
import { ROLE_PATHS } from "@Enums";

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
  const role = useSelector((state) => state.auth.role);
  const canManage = role === ROLE_PATHS.EMPLOYEE;
  const table = usePurchaseCreditTable();

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <header className="flex justify-end">
        <h1 className="sr-only">Supplier purchase credits</h1>
        {canManage && (
          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={() => navigate(ROUTES.PURCHASE_CREDIT_NEW)}
          >
            <Plus className="size-4" />
            Add purchase credit
          </Button>
        )}
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
            canManage={canManage}
            onView={(row) => dispatch(purchaseCreditDetailsOpened(row))}
            onEdit={(row) =>
              navigate(ROUTE_BUILDERS.purchaseCreditEdit(row.id), {
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
