import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@shadcnComponent/button";
import { Card, CardContent, CardHeader, CardTitle } from "@shadcnComponent/card";
import { syncTallyCompanies } from "@Tally/redux/company/company.action";
import {
  selectTallyCompanies,
  selectTallyCompanyCount,
  selectTallyCompanyRows,
} from "@Tally/redux/company/company.selector";
import CompaniesTable from "@Tally/component/comapnies/table";

function Companies() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectTallyCompanies);
  const companyCount = useSelector(selectTallyCompanyCount);
  const companies = useSelector(selectTallyCompanyRows);
  const isSyncing = status === "loading";

  return (
    <Card className="min-w-0 w-full">
      <CardHeader className="grid-cols-[1fr_auto] grid-rows-1 items-center border-b">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <CardTitle>Companies</CardTitle>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium tabular-nums" aria-live="polite">
            Total: {companyCount ?? "—"}
          </span>
        </div>
        <Button
          type="button"
          onClick={() => dispatch(syncTallyCompanies())}
          disabled={isSyncing}
          aria-busy={isSyncing}
        >
          {isSyncing && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {isSyncing ? "Syncing..." : "Sync"}
        </Button>
      </CardHeader>
      <CardContent className="min-w-0 space-y-4 pb-6">
        <CompaniesTable
          companies={companies}
          status={status}
          error={error}
          onRetry={() => dispatch(syncTallyCompanies())}
        />
      </CardContent>
    </Card>
  );
}

export default Companies;
