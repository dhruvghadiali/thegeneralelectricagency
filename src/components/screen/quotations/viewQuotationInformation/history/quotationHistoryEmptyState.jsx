import { History } from "lucide-react";

function QuotationHistoryEmptyState() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed px-4 py-10 text-center">
      <History className="size-8 text-muted-foreground/60" aria-hidden="true" />
      <p className="mt-3 text-sm font-medium">No quotation history yet</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Revisions will appear here after this quotation is updated.
      </p>
    </div>
  );
}

export default QuotationHistoryEmptyState;
