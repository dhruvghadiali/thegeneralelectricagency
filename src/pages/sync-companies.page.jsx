import { Building2, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@shadcnComponent/button";
import CompaniesTable from "@Tally/component/comapnies/table";
import { syncTallyCompanies } from "@Tally/redux/company/company.action";
import {
  selectTallyCompanies,
  selectTallyCompanyCount,
  selectTallyCompanyRows,
} from "@Tally/redux/company/company.selector";

function SyncCompaniesPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectTallyCompanies);
  const companyCount = useSelector(selectTallyCompanyCount);
  const companies = useSelector(selectTallyCompanyRows);
  const isSyncing = status === "loading";

  return (
    <main className="min-w-0 w-full space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Button
          type="button"
          className="ml-auto shrink-0"
          onClick={() => dispatch(syncTallyCompanies())}
          disabled={isSyncing}
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

      <CompaniesTable
        companies={companies}
        status={status}
        error={error}
        onRetry={() => dispatch(syncTallyCompanies())}
      />
    </main>
  );
}

export default SyncCompaniesPage;
