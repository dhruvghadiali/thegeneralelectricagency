import { Eye, Pencil } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";
import useQuotationDialogKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/dialogs/useQuotationDialogKeyboardShortcut";

function QuotationRowActionDialog({
  quotation,
  onOpenChange,
  onEdit,
  onView,
}) {
  const quotationLabel = quotation?.quotationNumber || "this quotation";
  const keyboard = useQuotationDialogKeyboardShortcut({
    onClose: () => onOpenChange(false),
  });

  return (
    <Dialog open={Boolean(quotation)} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md"
        onCloseAutoFocus={keyboard.handleCloseAutoFocus}
        onEscapeKeyDown={keyboard.handleEscapeKeyDown}
        onOpenAutoFocus={keyboard.handleOpenAutoFocus}
        onKeyDown={keyboard.handleDialogKeyDown}
      >
        <DialogHeader>
          <DialogTitle>Open quotation</DialogTitle>
          <DialogDescription>
            Would you like to view the information for {quotationLabel} or edit
            this record?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-between">
          <Button
            ref={keyboard.leftButtonRef}
            type="button"
            variant="outline"
            onClick={() => onView(quotation)}
            aria-keyshortcuts="ArrowLeft"
          >
            <Eye className="size-4" aria-hidden="true" />
            View information
          </Button>
          <Button
            ref={keyboard.rightButtonRef}
            type="button"
            onClick={() => {
              keyboard.skipFocusRestore();
              onEdit(quotation);
            }}
            aria-keyshortcuts="ArrowRight"
          >
            <Pencil className="size-4" aria-hidden="true" />
            Edit record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QuotationRowActionDialog;
