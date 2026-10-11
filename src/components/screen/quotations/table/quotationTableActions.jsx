import { Eye } from "lucide-react";

function QuotationTableActions({ quotation }) {
  const quotationLabel = quotation.quotationNumber || quotation.id || "";

  return (
    <span
      role="img"
      aria-label={`View quotation ${quotationLabel}`.trim()}
      title="View quotation"
      className="flex size-9 items-center justify-center text-muted-foreground"
    >
      <Eye className="size-4" aria-hidden="true" />
    </span>
  );
}

export default QuotationTableActions;
