import { Trash2 } from "lucide-react";

import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import { PRODUCT_INITIAL_VALUES } from "@Forms/product/product.initialValues";
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
import ProductForm from "@screenComponent/products/productForm";

function ProductDialogs({
  dialog,
  isSaving,
  saveError,
  isDeleting,
  deleteError,
  onClose,
  onSave,
  onDelete,
}) {
  const isFormOpen = dialog?.type === "add" || dialog?.type === "edit";

  return (
    <>
      <Dialog open={isFormOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {dialog?.type === "edit" ? "Edit product" : "Add product"}
            </DialogTitle>
            <DialogDescription>
              Required fields are marked with an asterisk.
            </DialogDescription>
          </DialogHeader>
          {isFormOpen && (
            <>
              <FormErrorAlert message={saveError} />
              <ProductForm
                key={`${dialog.type}-${dialog.product?.id ?? "new"}`}
                product={dialog.product ?? PRODUCT_INITIAL_VALUES}
                onSubmit={onSave}
                submitLabel={
                  dialog.type === "edit" ? "Save changes" : "Add product"
                }
                isSubmitting={isSaving}
              />
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={dialog?.type === "delete"}
        onOpenChange={(open) => !open && !isDeleting && onClose()}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete product?</DialogTitle>
            <DialogDescription>
              This will permanently remove {dialog?.product?.name ?? "this product"}
              . This action cannot be undone.
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
    </>
  );
}

export default ProductDialogs;
