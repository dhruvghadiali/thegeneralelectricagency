import { Eye, Pencil } from "lucide-react";

function QuotationTableActions({ quotation }) {
  const quotationLabel = quotation.quotationNumber || quotation.id || "";

  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <span
        role="img"
        aria-label={`View quotation ${quotationLabel}`.trim()}
        title="View quotation"
        className="flex size-9 items-center justify-center"
      >
        <Eye className="size-4" aria-hidden="true" />
      </span>
      <span
        role="img"
        aria-label={`Edit quotation ${quotationLabel}`.trim()}
        title="Edit quotation"
        className="flex size-9 items-center justify-center"
      >
        <Pencil className="size-4" aria-hidden="true" />
      </span>
    </div>
  );
}

export default QuotationTableActions;
