import { CircleAlert } from "lucide-react";

function QuotationSubmissionError({ error }) {
  if (!error) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
    >
      <CircleAlert
        className="mt-0.5 size-4 shrink-0"
        aria-hidden="true"
      />
      <p>{error}</p>
    </div>
  );
}

export default QuotationSubmissionError;
