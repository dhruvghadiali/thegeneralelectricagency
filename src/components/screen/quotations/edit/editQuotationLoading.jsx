import { Loader2 } from "lucide-react";

function EditQuotationLoading() {
  return (
    <main
      className="flex h-full min-h-0 w-full items-center justify-center"
      aria-live="polite"
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        Loading quotation…
      </div>
    </main>
  );
}

export default EditQuotationLoading;
