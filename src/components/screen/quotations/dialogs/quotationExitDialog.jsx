import { Save, Trash2 } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";
import useQuotationDialogKeyboardShortcut from "@screenComponent/quotations/dialogs/useQuotationDialogKeyboardShortcut";

const EXIT_DIALOG_CONTENT = {
  create: {
    title: "Save quotation information?",
    description:
      "Select Yes to keep this quotation information before leaving. Select No to remove it and start with an empty quotation next time.",
  },
  edit: {
    title: "Keep quotation changes?",
    description:
      "Select Yes to keep these unsaved changes in this session before leaving. Select No to discard them.",
  },
};

function QuotationExitDialog({
  mode = "create",
  open,
  onClose,
  onDiscard,
  onKeep,
}) {
  const content = EXIT_DIALOG_CONTENT[mode] ?? EXIT_DIALOG_CONTENT.create;
  const keyboard = useQuotationDialogKeyboardShortcut({ onClose });

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
          <DialogTitle>{content.title}</DialogTitle>
          <DialogDescription>{content.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            ref={keyboard.leftButtonRef}
            type="button"
            variant="destructive"
            onClick={onDiscard}
            aria-keyshortcuts="ArrowLeft"
          >
            <Trash2 className="size-4" />
            No
          </Button>
          <Button
            ref={keyboard.rightButtonRef}
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

export default QuotationExitDialog;
