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

import FormErrorAlert from "@commonComponent/alert/formErrorAlert";

function ProductDialogs({
  dialog,
  isDeleting,
  deleteError,
  onClose,
  onDelete,
}) {
  return (
    <Dialog
      open={dialog?.type === "delete"}
      onOpenChange={(open) => !open && !isDeleting && onClose()}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete product?</DialogTitle>
          <DialogDescription>
            This will permanently remove{" "}
            {dialog?.product?.name ?? "this product"}. This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <FormErrorAlert message={deleteError} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={onDelete}
            disabled={isDeleting}
          >
            <Trash2 className="size-4" />
            {isDeleting ? "Deleting..." : "Delete product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDialogs;
