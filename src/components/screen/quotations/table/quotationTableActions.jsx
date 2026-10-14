import { useState } from "react";
import { Eye, Pencil } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import QuotationUpdateUnavailableDialog from "@screenComponent/quotations/table/quotationUpdateUnavailableDialog";

function QuotationTableActions({ quotation, onEdit }) {
  const [isUpdateUnavailableDialogOpen, setUpdateUnavailableDialogOpen] =
    useState(false);
  const quotationLabel = quotation.quotationNumber || quotation.id || "";
  const editQuotation = () => {
    if (!quotation.isUpdateAvailable) {
      setUpdateUnavailableDialogOpen(true);
      return;
    }

    onEdit?.(quotation);
  };

  return (
    <>
      <div className="flex items-center gap-1 text-muted-foreground">
        <span
          role="img"
          aria-label={`View quotation ${quotationLabel}`.trim()}
          title="View quotation"
          className="flex size-9 items-center justify-center"
        >
          <Eye className="size-4" aria-hidden="true" />
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={editQuotation}
          aria-label={`Edit quotation ${quotationLabel}`.trim()}
          title="Edit quotation"
          className="size-9 text-muted-foreground"
        >
          <Pencil className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <QuotationUpdateUnavailableDialog
        open={isUpdateUnavailableDialogOpen}
        onOpenChange={setUpdateUnavailableDialogOpen}
      />
    </>
  );
}

export default QuotationTableActions;
