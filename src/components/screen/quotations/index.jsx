import { useState } from "react";

import DataTable from "@commonComponent/dataTable";
import QuotationHeader from "@screenComponent/quotations/header";
import { QUOTATION_TABLE_CONFIG } from "@screenComponent/quotations/table";

const EMPTY_PAGINATION = Object.freeze({
  page: 1,
  limit: 20,
  total: 0,
  totalPages: 0,
});

const EMPTY_ROW_RANGE = Object.freeze({ from: 0, to: 0, total: 0 });
const NO_OP = () => {};

function Quotations() {
  const [search, setSearch] = useState("");
  const isFiltered = search.trim().length > 0;

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <QuotationHeader />

      <DataTable
        {...QUOTATION_TABLE_CONFIG}
        rows={[]}
        search={search}
        sort={[]}
        columnFilters={{}}
        pagination={EMPTY_PAGINATION}
        pageItems={[]}
        rowRange={EMPTY_ROW_RANGE}
        activeFilterCount={0}
        isFiltered={isFiltered}
        onSearchChange={setSearch}
        onSearchSubmit={NO_OP}
        onSortChange={NO_OP}
        onColumnFilterChange={NO_OP}
        onClearFilters={() => setSearch("")}
        onPageChange={NO_OP}
        onLimitChange={NO_OP}
        onRetry={NO_OP}
        isLoading={false}
        error={null}
      />
    </main>
  );
}

export default Quotations;
