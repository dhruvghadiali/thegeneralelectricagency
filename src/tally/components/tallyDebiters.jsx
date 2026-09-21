import { useMemo, useState } from "react";
import { RotateCw, Search } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import DataTablePagination from "@commonComponent/dataTable/dataTablePagination";
import { buildPageItems, getRowRange } from "@/utils/pagination.util";
import DebitersTable from "@Tally/components/debitersTable";
import { useDebiters } from "@Tally/hooks/useDebiters";
import { getSharedGstinLedgers } from "@Tally/get/sharedGstin";

function hasCompanyDetails(ledger) {
  // Names, balances and default country/registration values alone are not contact details.
  return ["address", "pincode", "gstin", "pan", "phone", "mobile", "email", "contactPerson"]
    .some((key) => {
      const value = String(ledger[key] ?? "").trim();
      if (!value || /^(?:[-—–]+|n\/?a|not applicable|none|null)$/i.test(value)) return false;
      if (key === "phone" || key === "mobile") {
        const digits = value.replace(/\D/g, "");
        return digits.length > 3 && /[1-9]/.test(digits);
      }
      return true;
    });
}

function TallyDebiters() {
  const { debiters, error, isLoading, refresh } = useDebiters();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("companies");
  const [requestedPage, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const companyLedgers = useMemo(() => debiters.filter(hasCompanyDetails), [debiters]);
  const sharedGstin = useMemo(() => getSharedGstinLedgers(debiters), [debiters]);
  const displayedLedgers = activeTab === "shared" ? sharedGstin.ledgers : companyLedgers;
  function changeTab(tab) {
    setActiveTab(tab);
    setSearch("");
    setPage(1);
  }
  const filteredDebiters = useMemo(() => {
    const sortedLedgers = activeTab === "shared" ? displayedLedgers : [...displayedLedgers].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base", numeric: true }),
    );
    if (!normalizedSearch) return sortedLedgers;

    return sortedLedgers.filter((debiter) =>
      Object.entries(debiter).some(([key, value]) =>
        key !== "id" && String(value ?? "").toLocaleLowerCase().includes(normalizedSearch),
      ),
    );
  }, [displayedLedgers, activeTab, normalizedSearch]);
  const total = filteredDebiters.length;
  const totalPages = Math.ceil(total / limit);
  const page = Math.min(requestedPage, Math.max(1, totalPages));
  const pageDebiters = filteredDebiters.slice((page - 1) * limit, page * limit);

  return (
    <main className="flex w-full flex-col gap-6 pb-2">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Tally Ledgers</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ledgers with address, tax, or contact details from THE GENERAL ELECTRIC STORES.
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

      <div role="tablist" aria-label="Tally ledger views" className="flex gap-2 border-b pb-2">
        {[["companies", "Companies"], ["shared", "Shared GSTIN"]].map(([id, label], index) => (
          <Button key={id} id={`tally-tab-${id}`} role="tab" type="button"
            aria-selected={activeTab === id} aria-controls="tally-ledger-panel"
            tabIndex={activeTab === id ? 0 : -1}
            variant={activeTab === id ? "default" : "ghost"}
            onClick={() => changeTab(id)}
            onKeyDown={(event) => {
              if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
              event.preventDefault();
              const next = event.key === "Home" ? "companies" : event.key === "End" ? "shared" : index === 0 ? "shared" : "companies";
              changeTab(next);
              document.getElementById(`tally-tab-${next}`)?.focus();
            }}>
            {label}
          </Button>
        ))}
      </div>

      <section id="tally-ledger-panel" role="tabpanel" aria-labelledby={`tally-tab-${activeTab}`} className="flex min-w-0 flex-col gap-4">
      {activeTab === "shared" && !error && !isLoading && (
        <p className="text-sm text-muted-foreground">
          {sharedGstin.groupCount} shared GSTINs across {sharedGstin.ledgers.length} company records. Companies with the same GSTIN are listed together.
        </p>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative block w-full sm:max-w-sm">
          <span className="sr-only">Search ledgers</span>
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
            placeholder="Search ledgers..."
            className="pl-9"
          />
        </label>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {error ? "Total records: unavailable" : isLoading ? "Loading records…" : (
            <>
              Total records: <span className="font-semibold tabular-nums text-foreground">{displayedLedgers.length.toLocaleString("en-IN")}</span>
              {normalizedSearch && (
                <span className="ml-3">
                  Matching records: <span className="font-semibold tabular-nums text-foreground">{filteredDebiters.length.toLocaleString("en-IN")}</span>
                </span>
              )}
            </>
          )}
        </p>
      </div>

      <DebitersTable
        debiters={pageDebiters}
        error={error}
        isLoading={isLoading}
        onRetry={refresh}
        isFiltered={Boolean(normalizedSearch)}
        emptyMessage={activeTab === "shared" ? "No companies share a GSTIN in the loaded Tally data." : undefined}
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
          rowNoun="ledgers"
        />
      )}
      </section>
    </main>
  );
}

export default TallyDebiters;
