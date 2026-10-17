import { Percent } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";
import useQuotationPdfDiscountDialogKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/dialogs/useQuotationPdfDiscountDialogKeyboardShortcut";

function QuotationPdfDiscountDialog({ open, onCancel, onNo, onYes }) {
  const keyboard = useQuotationPdfDiscountDialogKeyboardShortcut({
    onCancel,
    onNo,
    onYes,
  });

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onCancel()}>
      <DialogContent
        className="max-w-md"
        onEscapeKeyDown={keyboard.handleEscapeKeyDown}
        onOpenAutoFocus={keyboard.handleOpenAutoFocus}
        onKeyDown={keyboard.handleDialogKeyDown}
      >
        <DialogHeader>
          <DialogTitle>Show discount percentage?</DialogTitle>
          <DialogDescription>
            Would you like the downloaded quotation PDF to show a Discount (%)?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              ref={keyboard.leftButtonRef}
              type="button"
              variant="outline"
              onClick={onNo}
              aria-keyshortcuts="ArrowLeft N"
            >
              No
            </Button>
          </DialogClose>
          <Button
            ref={keyboard.rightButtonRef}
            type="button"
            onClick={onYes}
            aria-keyshortcuts="ArrowRight Y"
          >
            <Percent className="size-4" aria-hidden="true" />
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QuotationPdfDiscountDialog;
