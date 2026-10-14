import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DataTable from "@commonComponent/dataTable";
import QuotationHeader from "@screenComponent/quotations/header";
import QuotationRowActionDialog from "@screenComponent/quotations/dialogs/quotationRowActionDialog";
import QuotationUpdateUnavailableDialog from "@screenComponent/quotations/dialogs/quotationUpdateUnavailableDialog";
import {
  QUOTATION_TABLE_CONFIG,
  QuotationTableActions,
  useQuotationTable,
} from "@screenComponent/quotations/table";
import {
  selectQuotationRowActionQuotation,
  selectQuotationUpdateUnavailableDialogOpen,
} from "@Redux/quotation/quotation.selector";
import {
  quotationRowActionClosed,
  quotationRowActionRequested,
  quotationUpdateUnavailableDialogClosed,
  quotationUpdateUnavailableDialogOpened,
} from "@Redux/quotation/quotation.slice";
import { ROUTE_BUILDERS } from "@routes/navigate";

function Quotations() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const table = useQuotationTable();
  const rowActionQuotation = useSelector(
    selectQuotationRowActionQuotation,
  );
  const isUpdateUnavailableDialogOpen = useSelector(
    selectQuotationUpdateUnavailableDialogOpen,
  );
  const openRowActionDialog = (quotation) => {
    dispatch(
      quotationRowActionRequested(
        quotation.id ?? quotation.quotationNumber,
      ),
    );
  };
  const viewQuotation = () => {
    dispatch(quotationRowActionClosed());
  };
  const editQuotation = (quotation) => {
    dispatch(quotationRowActionClosed());

    if (!quotation.isUpdateAvailable) {
      dispatch(quotationUpdateUnavailableDialogOpened());
      return;
    }

    navigate(ROUTE_BUILDERS.quotationEdit(quotation.id));
  };

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <QuotationHeader />

      <DataTable
        {...QUOTATION_TABLE_CONFIG}
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
        onRowEnter={openRowActionDialog}
        rowActions={(quotation) => (
          <QuotationTableActions
            quotation={quotation}
            onView={viewQuotation}
            onEdit={editQuotation}
          />
        )}
      />

      <QuotationRowActionDialog
        quotation={rowActionQuotation}
        onOpenChange={(open) =>
          !open && dispatch(quotationRowActionClosed())
        }
        onView={viewQuotation}
        onEdit={editQuotation}
      />
      <QuotationUpdateUnavailableDialog
        open={isUpdateUnavailableDialogOpen}
        onOpenChange={(open) =>
          !open && dispatch(quotationUpdateUnavailableDialogClosed())
        }
      />
    </main>
  );
}

export default Quotations;
