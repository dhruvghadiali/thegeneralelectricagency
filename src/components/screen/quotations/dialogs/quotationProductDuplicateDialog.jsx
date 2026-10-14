import { Pencil } from "lucide-react";
import _ from "lodash";

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

function QuotationProductDuplicateDialog({ product, onNo, onYes }) {
  const keyboard = useQuotationDialogKeyboardShortcut({ onClose: onNo });

  return (
    <Dialog open={Boolean(product)} onOpenChange={(open) => !open && onNo()}>
      <DialogContent
        className="max-w-md"
        onEscapeKeyDown={keyboard.handleEscapeKeyDown}
        onOpenAutoFocus={keyboard.handleOpenAutoFocus}
        onKeyDown={keyboard.handleDialogKeyDown}
      >
        <DialogHeader>
          <DialogTitle>Product already added</DialogTitle>
          <DialogDescription>
            <span className="font-medium text-foreground">
              {product ? _.toUpper(product.product) : "This product"}
            </span>{" "}
            is already in this quotation. Do you want to update its existing
            information?
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
            <Pencil className="size-4" />
            Yes, update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QuotationProductDuplicateDialog;
