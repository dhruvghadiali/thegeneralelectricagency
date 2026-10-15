import { ArrowLeft, FileText } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function QuotationUnavailableState({ error, onBack }) {
  return (
    <main className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-6 text-center">
      <FileText
        className="size-10 text-muted-foreground/60"
        aria-hidden="true"
      />
      <h1 className="mt-4 text-lg font-semibold">Quotation unavailable</h1>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        {error || "This quotation was not found in the available records."}
      </p>
      <Button
        type="button"
        variant="outline"
        className="mt-5"
        onClick={onBack}
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to quotations
      </Button>
    </main>
  );
}

export default QuotationUnavailableState;
