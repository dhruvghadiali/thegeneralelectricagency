import { Building2 } from "lucide-react";
import { Button } from "@shadcnComponent/button";

import CompanyDirectoryLoading from "@screenComponent/quotations/form/companyInformation/companyDirectory/companyDirectoryLoading";

function CompanyDirectoryStatus({ isLoading, error, isEmpty, onRetry }) {
  if (isLoading) return <CompanyDirectoryLoading />;

  if (!isEmpty) return null;

  return (
    <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 px-6 text-center">
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Building2 className="size-8" aria-hidden="true" />
          <p className="text-sm">No companies found.</p>
        </div>
      )}
      <Button type="button" variant="outline" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

export default CompanyDirectoryStatus;
