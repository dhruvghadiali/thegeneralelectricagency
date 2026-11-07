import { Eye, Pencil } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shadcnComponent/dialog";
import useProductDialogKeyboardShortcut from "@screenComponent/products/keyboardShortcuts/dialogs/useProductDialogKeyboardShortcut";

function ProductRowActionDialog({
  product,
  canEdit,
  onOpenChange,
  onEdit,
  onView,
}) {
  const productLabel = product?.name || "this product";
  const keyboard = useProductDialogKeyboardShortcut({
    onClose: () => onOpenChange(false),
  });

  return (
    <Dialog open={Boolean(product)} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md"
        onCloseAutoFocus={keyboard.handleCloseAutoFocus}
        onEscapeKeyDown={keyboard.handleEscapeKeyDown}
        onOpenAutoFocus={keyboard.handleOpenAutoFocus}
        onKeyDown={keyboard.handleDialogKeyDown}
      >
        <DialogHeader>
          <DialogTitle>Open product</DialogTitle>
          <DialogDescription>
            {canEdit
              ? `Would you like to view the information for ${productLabel} or edit this product?`
              : `View the information for ${productLabel}.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-between">
          <Button
            ref={keyboard.leftButtonRef}
            type="button"
            variant="outline"
            onClick={() => onView(product)}
            aria-keyshortcuts="ArrowLeft"
          >
            <Eye className="size-4" aria-hidden="true" />
            View information
          </Button>
          {canEdit && (
            <Button
              ref={keyboard.rightButtonRef}
              type="button"
              onClick={() => {
                keyboard.skipFocusRestore();
                onEdit(product);
              }}
              aria-keyshortcuts="ArrowRight"
            >
              <Pencil className="size-4" aria-hidden="true" />
              Edit product
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProductRowActionDialog;
