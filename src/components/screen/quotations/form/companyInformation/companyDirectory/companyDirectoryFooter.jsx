import { Loader2 } from "lucide-react";
import { Button } from "@shadcnComponent/button";

function CompanyDirectoryFooter({
  pagination,
  error,
  hasMoreCompanies,
  isLoadingMore,
  onLoadMore,
}) {
  if (pagination.totalPages <= 1 && !error) return null;

  return (
    <div className="sticky bottom-0 space-y-2 border-t bg-card p-3">
      {error && <p className="text-center text-sm text-destructive">{error}</p>}
      {(hasMoreCompanies || error) && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isLoadingMore}
          onClick={onLoadMore}
          className="w-full"
        >
          {isLoadingMore && (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          )}
          {isLoadingMore ? "Loading..." : "Load more companies"}
        </Button>
      )}
      {pagination.totalPages > 0 && (
        <p className="text-center text-xs text-muted-foreground">
          Page {pagination.page} of {pagination.totalPages}
        </p>
      )}
    </div>
  );
}

export default CompanyDirectoryFooter;
