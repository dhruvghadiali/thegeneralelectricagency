import { LoaderCircle } from "lucide-react";

function QuotationLoadingState() {
  return (
    <div className="flex min-h-72 items-center justify-center">
      <LoaderCircle
        className="size-7 animate-spin text-primary"
        aria-label="Loading quotation"
      />
    </div>
  );
}

export default QuotationLoadingState;
