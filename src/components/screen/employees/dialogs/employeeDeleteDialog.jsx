import { Trash2 } from "lucide-react";

import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
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
import { fullName } from "@Tables/employee/employeeTable.utils";

function EmployeeDeleteDialog({
  dialog,
  isDeleting,
  error,
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
          <DialogTitle>Delete employee?</DialogTitle>
          <DialogDescription>
            This will permanently remove{" "}
            <span className="font-medium text-foreground">
              {dialog?.employee ? fullName(dialog.employee) : "this employee"}
            </span>{" "}
            from the employee directory. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <FormErrorAlert message={error} />
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
            {isDeleting ? "Deleting..." : "Delete employee"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EmployeeDeleteDialog;
