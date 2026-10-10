import { Trash2 } from "lucide-react";
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
import useProductDeleteDialogKeyboardShortcut from "@screenComponent/quotations/create/hooks/product/useProductDeleteDialogKeyboardShortcut";

function QuotationProductDeleteDialog({ product, onCancel, onConfirm }) {
  const keyboard = useProductDeleteDialogKeyboardShortcut({ onCancel });

  return (
    <Dialog
      open={Boolean(product)}
      onOpenChange={(open) => !open && onCancel()}
    >
      <DialogContent
        className="max-w-md"
        onEscapeKeyDown={keyboard.handleEscapeKeyDown}
        onOpenAutoFocus={keyboard.handleOpenAutoFocus}
        onKeyDown={keyboard.handleDialogKeyDown}
      >
        <DialogHeader>
          <DialogTitle>Delete product?</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove{" "}
            <span className="font-medium text-foreground">
              {product ? _.toUpper(product.product) : "this product"}
            </span>{" "}
            from this quotation?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              ref={keyboard.cancelButtonRef}
              type="button"
              variant="outline"
              aria-keyshortcuts="Alt+ArrowLeft"
            >
              No
            </Button>
          </DialogClose>
          <Button
            ref={keyboard.confirmButtonRef}
            type="button"
            variant="destructive"
            onClick={onConfirm}
            aria-keyshortcuts="Alt+ArrowRight"
          >
            <Trash2 className="size-4" />
            Yes, delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QuotationProductDeleteDialog;
