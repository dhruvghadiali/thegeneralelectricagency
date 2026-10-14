import { Trash2 } from "lucide-react";

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

import useQuotationProductFormDiscardDialogKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/dialogs/useQuotationProductFormDiscardDialogKeyboardShortcut";

function QuotationProductFormDiscardDialog({ open, onCancel, onConfirm }) {
  const keyboard = useQuotationProductFormDiscardDialogKeyboardShortcut({
    onCancel,
    onConfirm,
  });

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onCancel()}>
      <DialogContent
        className="max-w-md"
        onEscapeKeyDown={keyboard.handleEscapeKeyDown}
        onKeyDown={keyboard.handleDialogKeyDown}
        onOpenAutoFocus={keyboard.handleOpenAutoFocus}
      >
        <DialogHeader>
          <DialogTitle>Discard product information?</DialogTitle>
          <DialogDescription>
            The information entered in the product form will not be saved.
            Select OK to clear the form and continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              ref={keyboard.leftButtonRef}
              type="button"
              variant="outline"
              aria-keyshortcuts="Enter ArrowLeft"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            ref={keyboard.rightButtonRef}
            type="button"
            variant="destructive"
            onClick={onConfirm}
            aria-keyshortcuts="Enter ArrowRight"
          >
            <Trash2 className="size-4" />
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QuotationProductFormDiscardDialog;
