import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Save } from "lucide-react";
import DataTable from "@commonComponent/dataTable";
import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import { Button } from "@shadcnComponent/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcnComponent/tabs";
import { fetchTallyCompaniesComparison } from "@Tally/redux/tallyCompanies/tallyCompaniesComparison.action";
import { selectTallyCompanies } from "@Tally/redux/company/company.selector";
import { TALLY_COMPANIES_TABLE_CONFIG } from "@Tally/tables/tallyCompanies";
import { useTallyComparisonTable } from "@Tally/tables/tallyCompanies/useTallyComparisonTable";
import { useTallyComparisonSelection } from "@Tally/tables/tallyCompanies/useTallyComparisonSelection";
import TallyComparisonTableActions from "@Tally/tables/tallyCompanies/tallyComparisonTableActions";
import { saveTallyCompanies } from "@Tally/redux/tallyCompanies/tallyCompaniesSave.action";

const NEW_RECORD_COLUMNS = TALLY_COMPANIES_TABLE_CONFIG.columns.filter(
  (column) => column.field === "company_name",
);

function ComparisonTable({ companies, kind, selection, isSaving }) {
  const table = useTallyComparisonTable(companies);
  return (
    <DataTable
      {...TALLY_COMPANIES_TABLE_CONFIG}
      {...table}
      columns={kind === "new" ? NEW_RECORD_COLUMNS : TALLY_COMPANIES_TABLE_CONFIG.columns}
      fillHeight
      isLoading={isSaving}
      selectedRowKeys={selection.selectedRowKeys}
      onRowSelectionChange={(company, checked) => !isSaving && selection.onRowSelectionChange(company, checked)}
      selectionRows={kind === "new" ? companies : table.rows}
      paginationMode="client"
      onAllRowsSelectionChange={(rows, checked) => !isSaving && selection.onAllRowsSelectionChange(rows, checked)}
      selectionLabel={(company) =>
        `Select ${company.company_name} for ${kind === "new" ? "addition" : "deletion"}`
      }
      rowActions={kind === "new" ? undefined : (company) => (
        <TallyComparisonTableActions
          company={company}
          kind={kind}
          selected={selection.selectedRowKeys.includes(company._id)}
          onSelect={selection.onRowSelectionChange}
        />
      )}
      toolbarActions={
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground" aria-live="polite">
            {selection.selectedRowKeys.length} selected for{" "}
            {kind === "new" ? "addition" : "deletion"}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isSaving || !selection.selectedRowKeys.length}
            onClick={selection.clearSelection}
          >
            Clear selection
          </Button>
        </div>
      }
      emptyTitle={kind === "new" ? "No new records" : "No deleted records"}
      emptyDescription={
        kind === "new"
          ? "All Tally companies are already stored in the system."
          : "All system companies are present in Tally."
      }
    />
  );
}

export default function TallyCompaniesComparison() {
  const dispatch = useDispatch();
  const { response, status: syncStatus } = useSelector(selectTallyCompanies);
  const comparison = useSelector(
    (state) => state.tallyCompaniesList.comparison,
  );
  const newSelection = useTallyComparisonSelection(comparison.newRecords);
  const { saveStatus, saveError, savedCount } = useSelector((state) => state.tallyCompaniesList);
  const isSaving = saveStatus === "loading";
  const deletedSelection = useTallyComparisonSelection(
    comparison.deletedRecords,
  );

  useEffect(() => {
    if (syncStatus !== "succeeded") return;
    const request = dispatch(fetchTallyCompaniesComparison());
    return () => request.abort();
  }, [dispatch, response, syncStatus]);

  if (syncStatus !== "succeeded") {
    return (
      <p className="text-sm text-muted-foreground">
        Complete a successful Tally fetch to compare companies.
      </p>
    );
  }
  if (comparison.status === "loading" || comparison.status === "idle") {
    return (
      <p role="status" className="flex items-center gap-2 text-sm">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        Loading all system companies for comparison...
      </p>
    );
  }
  if (comparison.status === "failed") {
    return (
      <div className="space-y-3">
        <FormErrorAlert message={comparison.error} />
        <Button
          variant="outline"
          onClick={() => dispatch(fetchTallyCompaniesComparison())}
        >
          Retry comparison
        </Button>
      </div>
    );
  }
  return (
    <Tabs
      defaultValue="new"
      className="flex min-w-0 flex-col gap-4 roomy:min-h-0 roomy:flex-1"
    >
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
      <TabsList
        aria-label="Company comparison results"
        className="w-fit shrink-0"
      >
        <TabsTrigger value="new">
          New records ({comparison.newRecords.length})
        </TabsTrigger>
        <TabsTrigger value="deleted">
          Deleted records ({comparison.deletedRecords.length})
        </TabsTrigger>
      </TabsList>
      <Button
        type="button"
        className="ml-auto shrink-0"
        disabled={isSaving || newSelection.selectedRowKeys.length + deletedSelection.selectedRowKeys.length === 0}
        onClick={() => dispatch(saveTallyCompanies(newSelection.selectedRowKeys))}
        aria-busy={isSaving}
      >
        {isSaving ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Save className="size-4" aria-hidden="true" />}
        {isSaving ? "Saving..." : "Save"}
      </Button>
      </div>
      {saveError && <FormErrorAlert message={saveError} />}
      {savedCount > 0 && <p role="status" className="shrink-0 text-sm text-muted-foreground">{savedCount} companies saved.</p>}
      {deletedSelection.selectedRowKeys.length > 0 && <p className="shrink-0 text-sm text-muted-foreground">Save adds selected new records. Selected deleted records will not be removed.</p>}
      <TabsContent
        value="new"
        className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1"
      >
        <ComparisonTable
          companies={comparison.newRecords}
          kind="new"
          selection={newSelection}
          isSaving={isSaving}
        />
      </TabsContent>
      <TabsContent
        value="deleted"
        className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1"
      >
        <ComparisonTable
          companies={comparison.deletedRecords}
          kind="deleted"
          selection={deletedSelection}
          isSaving={isSaving}
        />
      </TabsContent>
    </Tabs>
  );
}
