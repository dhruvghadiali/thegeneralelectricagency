import { ArrowRight, Building2 } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";

import useQuotationUnsavedCompanyDialogKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/dialogs/useQuotationUnsavedCompanyDialogKeyboardShortcut";

function QuotationUnsavedCompanyDialog({
  companyName,
  open,
  onCancel,
  onProceed,
}) {
  const keyboard = useQuotationUnsavedCompanyDialogKeyboardShortcut({
    onCancel,
    onProceed,
  });

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onCancel()}>
      <DialogContent
        className="max-w-md"
        onCloseAutoFocus={keyboard.handleCloseAutoFocus}
        onEscapeKeyDown={keyboard.handleEscapeKeyDown}
        onKeyDown={keyboard.handleDialogKeyDown}
        onOpenAutoFocus={keyboard.handleOpenAutoFocus}
      >
        <DialogHeader>
          <DialogTitle>Company is not saved</DialogTitle>
          <DialogDescription>
            <span className="font-medium text-foreground">
              {companyName || "This company"}
            </span>{" "}
            is not present in the system. Do you want to proceed with this
            unsaved company?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            ref={keyboard.leftButtonRef}
            type="button"
            variant="outline"
            onClick={onCancel}
            aria-keyshortcuts="ArrowLeft N"
          >
            <Building2 className="size-4" aria-hidden="true" />
            Go back
          </Button>
          <Button
            ref={keyboard.rightButtonRef}
            type="button"
            onClick={onProceed}
            aria-keyshortcuts="ArrowRight Y"
          >
            Proceed anyway
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QuotationUnsavedCompanyDialog;
