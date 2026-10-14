import { Save, Trash2 } from "lucide-react";

import useQuotationExitDialogKeyboardShortcut from "@screenComponent/quotations/hooks/useQuotationExitDialogKeyboardShortcut";
import { Button } from "@shadcnComponent/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";

function EditQuotationExitDialog({ open, onClose, onDiscard, onKeep }) {
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
          <DialogTitle>Keep quotation changes?</DialogTitle>
          <DialogDescription>
            Select Yes to keep these unsaved changes in this session before
            leaving. Select No to discard them.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            ref={keyboard.noButtonRef}
            type="button"
            variant="destructive"
            onClick={onDiscard}
            aria-keyshortcuts="ArrowLeft"
          >
            <Trash2 className="size-4" />
            No
          </Button>
          <Button
            ref={keyboard.yesButtonRef}
            type="button"
            onClick={onKeep}
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

export default EditQuotationExitDialog;
