import { Eye, Pencil } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function QuotationTableActions({ quotation, onView, onEdit }) {
  const quotationLabel = quotation.quotationNumber || quotation.id || "";

  return (
    <div className="flex items-center gap-1 text-muted-foreground">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={(event) => {
          event.stopPropagation();
          onView?.(quotation);
        }}
        aria-label={`View quotation ${quotationLabel}`.trim()}
        title="View quotation"
        className="size-9 text-muted-foreground"
      >
        <Eye className="size-4" aria-hidden="true" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onEdit?.(quotation)}
        aria-label={`Edit quotation ${quotationLabel}`.trim()}
        title="Edit quotation"
        className="size-9 text-muted-foreground"
      >
        <Pencil className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

export default QuotationTableActions;
