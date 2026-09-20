import { useMemo, useState } from "react";
import { RotateCw, Search } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import DataTablePagination from "@commonComponent/dataTable/dataTablePagination";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";
import DebitersTable from "@Tally/components/debitersTable";
import { useDebiters } from "@Tally/hooks/useDebiters";

function TallyDebiters() {
  const { debiters, error, isLoading, refresh } = useDebiters();
  const [search, setSearch] = useState("");
  const [requestedPage, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filteredDebiters = useMemo(() => {
    if (!normalizedSearch) return debiters;

    return debiters.filter((debiter) =>
      [debiter.name, debiter.parent, debiter.closingBalance].some((value) =>
        value.toLocaleLowerCase().includes(normalizedSearch),
      ),
    );
  }, [debiters, normalizedSearch]);
  const total = filteredDebiters.length;
  const totalPages = Math.ceil(total / limit);
  const page = Math.min(requestedPage, Math.max(1, totalPages));
  const pageDebiters = filteredDebiters.slice((page - 1) * limit, page * limit);

  return (
    <main className="flex w-full flex-col gap-6 pb-2">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tally Debiters</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sundry debtor ledgers loaded directly from Tally.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={refresh}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          <RotateCw className={isLoading ? "size-4 animate-spin" : "size-4"} />
          Refresh
        </Button>
      </header>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-sm">
          <span className="sr-only">Search debiters</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search debiters..."
            className="pl-9"
          />
        </label>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {filteredDebiters.length} {filteredDebiters.length === 1 ? "record" : "records"}
        </p>
      </div>

      <DebitersTable
        debiters={pageDebiters}
        error={error}
        isLoading={isLoading}
        onRetry={refresh}
      />
      {!error && (
        <DataTablePagination
          pagination={{ page, limit, total, totalPages }}
          pageItems={buildPageItems(page, totalPages)}
          rowRange={getRowRange({ page, limit, total, count: pageDebiters.length })}
          isLoading={isLoading}
          onPageChange={setPage}
          onLimitChange={(nextLimit) => {
            setLimit(nextLimit);
            setPage(1);
          }}
          rowNoun="debiters"
        />
      )}
    </main>
  );
}

export default TallyDebiters;
