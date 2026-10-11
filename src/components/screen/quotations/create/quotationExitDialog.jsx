import { Save, Trash2 } from "lucide-react";

import useQuotationExitDialogKeyboardShortcut from "@screenComponent/quotations/create/hooks/useQuotationExitDialogKeyboardShortcut";
import { Button } from "@shadcnComponent/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";

function QuotationExitDialog({ open, onClose, onNo, onYes }) {
  const keyboard = useQuotationExitDialogKeyboardShortcut({ onClose });

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent
        data-quotation-exit-dialog
        className="max-w-md"
        onEscapeKeyDown={keyboard.handleEscapeKeyDown}
        onKeyDown={keyboard.handleDialogKeyDown}
        onOpenAutoFocus={keyboard.handleOpenAutoFocus}
      >
        <DialogHeader>
          <DialogTitle>Save quotation information?</DialogTitle>
          <DialogDescription>
            Select Yes to keep this quotation information before leaving. Select
            No to remove it and start with an empty quotation next time.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            ref={keyboard.noButtonRef}
            type="button"
            variant="destructive"
            onClick={onNo}
            aria-keyshortcuts="ArrowLeft"
          >
            <Trash2 className="size-4" />
            No
          </Button>
          <Button
            ref={keyboard.yesButtonRef}
            type="button"
            onClick={onYes}
            aria-keyshortcuts="ArrowRight"
          >
            <Save className="size-4" />
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QuotationExitDialog;
