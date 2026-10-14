import { Save, Trash2 } from "lucide-react";

import { QUOTATION_FORM_MODES } from "@Enums";
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

const EXIT_DIALOG_CONTENT = {
  [QUOTATION_FORM_MODES.CREATE]: {
    title: "Save quotation information?",
    description:
      "Select Yes to keep this quotation information before leaving. Select No to remove it and start with an empty quotation next time.",
  },
  [QUOTATION_FORM_MODES.EDIT]: {
    title: "Leave edit quotation?",
    description:
      "Your changes will not be saved. Leaving this page will discard all unsaved edit quotation information.",
  },
};

function QuotationExitDialog({
  mode = QUOTATION_FORM_MODES.CREATE,
  open,
  onClose,
  onDiscard,
  onKeep,
}) {
  const content =
    EXIT_DIALOG_CONTENT[mode] ??
    EXIT_DIALOG_CONTENT[QUOTATION_FORM_MODES.CREATE];
  const isEditMode = mode === QUOTATION_FORM_MODES.EDIT;
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
          {isEditMode ? (
            <>
              <Button
                ref={keyboard.leftButtonRef}
                type="button"
                variant="outline"
                onClick={onClose}
                aria-keyshortcuts="ArrowLeft"
              >
                Cancel
              </Button>
              <Button
                ref={keyboard.rightButtonRef}
                type="button"
                variant="destructive"
                onClick={onDiscard}
                aria-keyshortcuts="ArrowRight"
              >
                <Trash2 className="size-4" />
                Leave without saving
              </Button>
            </>
          ) : (
            <>
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
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QuotationExitDialog;
