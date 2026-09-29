import { useState } from "react";
import { Building2, Loader2, RefreshCw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import { Button } from "@shadcnComponent/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcnComponent/tabs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@shadcnComponent/sheet";
import { renderCell } from "@/utils/dataTable.util";
import { syncTallyCompanies } from "@Tally/redux/company/company.action";
import {
  getTallyCompanyRows,
  selectTallyCompanies,
  selectTallyCompanyRows,
} from "@Tally/redux/company/company.selector";
import CompaniesTable from "@Tally/component/comapnies/table";
import TallyCompaniesComparison from "@Tally/component/tallyCompanies/comparison";
import {
  TALLY_COMPANIES_TABLE_CONFIG,
  TallyCompaniesTableActions,
  useTallyCompaniesTable,
} from "@Tally/tables/tallyCompanies";
import { TALLY_COMPANIES_DETAIL_COLUMNS } from "@Tally/component/tallyCompanies/tallyCompanies.columns";

function TallyCompanies() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectTallyCompanies);
  const syncedCompanies = useSelector(selectTallyCompanyRows);
  const isSaving = useSelector((state) => state.tallyCompaniesList.saveStatus === "loading");
  const [activeTab, setActiveTab] = useState("system");
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const table = useTallyCompaniesTable();
  const selectedCompany = table.rows.find(
    (company) => company._id === selectedCompanyId,
  );
  const isSyncing = status === "loading";
  const hasSyncedCompanies = syncedCompanies.length > 0;

  async function getCompanyInformation() {
    const result = await dispatch(syncTallyCompanies());
    if (syncTallyCompanies.fulfilled.match(result)) {
      setActiveTab(
        getTallyCompanyRows(result.payload).length > 0 ? "sync" : "system",
      );
      table.refresh();
    }
  }

  return (
    <main className="flex min-w-0 w-full flex-col roomy:h-full roomy:min-h-0">
      <Tabs
        value={hasSyncedCompanies ? activeTab : "system"}
        onValueChange={setActiveTab}
        className="flex min-w-0 flex-col gap-4 roomy:min-h-0 roomy:flex-1"
      >
        <div className="flex shrink-0 flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          {hasSyncedCompanies && (
            <TabsList
              aria-label="Tally company lists"
              className="h-auto w-full flex-wrap justify-start gap-1 xl:w-auto"
            >
              <TabsTrigger value="system" className="gap-2">
                System store tally companies
                <span
                  className="rounded-full bg-background/70 px-2 py-0.5 text-xs tabular-nums"
                  aria-live="polite"
                >
                  {table.totalCount}
                </span>
              </TabsTrigger>
              <TabsTrigger value="sync" className="gap-2">
                Sync tally companies
                <span
                  className="rounded-full bg-background/70 px-2 py-0.5 text-xs tabular-nums"
                  aria-live="polite"
                >
                  {syncedCompanies.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="comparison"
                disabled={isSyncing || status !== "succeeded"}
              >
                Compare companies
              </TabsTrigger>
            </TabsList>
          )}
          <Button
            type="button"
            className="ml-auto shrink-0"
            onClick={getCompanyInformation}
            disabled={isSyncing || isSaving}
            aria-busy={isSyncing}
          >
            {isSyncing ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <Building2 className="size-4" aria-hidden="true" />
            )}
            {isSyncing
              ? "Getting company information..."
              : "Get company information from Tally"}
          </Button>
        </div>
        {status === "failed" && <FormErrorAlert message={error} />}
        <TabsContent
          value="system"
          className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1"
        >
          <DataTable
            {...TALLY_COMPANIES_TABLE_CONFIG}
            fillHeight
            rows={table.rows}
            rowActions={(company) => (
              <TallyCompaniesTableActions
                company={company}
                onView={(selected) => setSelectedCompanyId(selected._id)}
              />
            )}
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
            onClearFilters={table.clearFilters}
            onPageChange={table.changePage}
            onLimitChange={table.changeLimit}
            onRetry={table.refresh}
            isLoading={table.isLoading}
            error={table.error}
            toolbarActions={
              <Button
                type="button"
                variant="outline"
                onClick={table.refresh}
                disabled={table.isLoading}
              >
                <RefreshCw
                  className={table.isLoading ? "size-4 animate-spin" : "size-4"}
                  aria-hidden="true"
                />
                Refresh
              </Button>
            }
          />
        </TabsContent>
        {hasSyncedCompanies && (
          <TabsContent
            value="sync"
            className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1"
          >
            <CompaniesTable
              companies={syncedCompanies}
              status={status}
              onRetry={getCompanyInformation}
              fillHeight
            />
          </TabsContent>
        )}
        {hasSyncedCompanies && (
          <TabsContent
            value="comparison"
            className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
          >
            <TallyCompaniesComparison />
          </TabsContent>
        )}
      </Tabs>
      <Sheet
        open={Boolean(selectedCompany)}
        onOpenChange={(open) => !open && setSelectedCompanyId(null)}
      >
        <SheetContent className="w-full gap-0 sm:max-w-xl">
          <SheetHeader className="border-b pr-12">
            <SheetTitle className="break-words">
              {selectedCompany?.company_name}
            </SheetTitle>
            <SheetDescription>
              Saved Tally company information.
            </SheetDescription>
          </SheetHeader>
          <div
            data-lenis-prevent
            className="min-h-0 flex-1 overflow-y-auto p-4"
          >
            <dl className="divide-y">
              {selectedCompany &&
                TALLY_COMPANIES_DETAIL_COLUMNS.map((column) => (
                  <div
                    key={column.key}
                    className="grid gap-1 py-3 sm:grid-cols-[9rem_1fr] sm:gap-4"
                  >
                    <dt className="text-sm text-muted-foreground">
                      {column.header}
                    </dt>
                    <dd className="min-w-0 break-words text-sm">
                      {renderCell(selectedCompany, column)}
                    </dd>
                  </div>
                ))}
            </dl>
          </div>
        </SheetContent>
      </Sheet>
    </main>
  );
}

export default TallyCompanies;
