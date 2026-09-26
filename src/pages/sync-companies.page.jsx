import { Building2, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import { Button } from "@shadcnComponent/button";
import { syncTallyCompanies } from "@Tally/redux/company/company.action";
import {
  selectTallyCompanies,
  selectTallyCompanyCount,
} from "@Tally/redux/company/company.selector";

function SyncCompaniesPage() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectTallyCompanies);
  const companyCount = useSelector(selectTallyCompanyCount);
  const isSyncing = status === "loading";

  return (
    <main className="w-full space-y-4">
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

      {status === "failed" && <FormErrorAlert message={error} />}
      {status === "succeeded" && (
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {companyCount ?? 0} companies retrieved from Tally.
        </p>
      )}
    </main>
  );
}

export default SyncCompaniesPage;
