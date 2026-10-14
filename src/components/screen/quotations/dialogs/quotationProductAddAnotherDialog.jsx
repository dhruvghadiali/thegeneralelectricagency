import { Plus } from "lucide-react";

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
import useQuotationDialogKeyboardShortcut from "@screenComponent/quotations/dialogs/useQuotationDialogKeyboardShortcut";

function QuotationProductAddAnotherDialog({ open, onNo, onYes }) {
  const keyboard = useQuotationDialogKeyboardShortcut({ onClose: onNo });

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onNo()}>
      <DialogContent
        className="max-w-md"
        onEscapeKeyDown={keyboard.handleEscapeKeyDown}
        onOpenAutoFocus={keyboard.handleOpenAutoFocus}
        onKeyDown={keyboard.handleDialogKeyDown}
      >
        <DialogHeader>
          <DialogTitle>Add another product?</DialogTitle>
          <DialogDescription>
            The product was saved. Do you want to add another product to this
            quotation?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              ref={keyboard.leftButtonRef}
              type="button"
              variant="outline"
              aria-keyshortcuts="ArrowLeft"
            >
              No
            </Button>
          </DialogClose>
          <Button
            ref={keyboard.rightButtonRef}
            type="button"
            onClick={onYes}
            aria-keyshortcuts="ArrowRight"
          >
            <Plus className="size-4" />
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QuotationProductAddAnotherDialog;
