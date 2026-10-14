import { useNavigate } from "react-router-dom";

import DataTable from "@commonComponent/dataTable";
import QuotationHeader from "@screenComponent/quotations/header";
import {
  QUOTATION_TABLE_CONFIG,
  QuotationTableActions,
  useQuotationTable,
} from "@screenComponent/quotations/table";
import { ROUTE_BUILDERS } from "@routes/navigate";

function Quotations() {
  const navigate = useNavigate();
  const table = useQuotationTable();
  const editQuotation = (quotation) => {
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
        rowActions={(quotation) => (
          <QuotationTableActions
            quotation={quotation}
            onEdit={editQuotation}
          />
        )}
      />
    </main>
  );
}

export default Quotations;
