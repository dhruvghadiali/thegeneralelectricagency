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

function CompanyDeleteDialog({ company, isDeleting, error, onClose, onDelete }) {
  return (
    <Dialog
      open={Boolean(company)}
      onOpenChange={(open) => !open && !isDeleting && onClose()}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete company?</DialogTitle>
          <DialogDescription>
            This will permanently remove{" "}
            <span className="font-medium text-foreground">
              {company?.name ?? "this company"}
            </span>{" "}
            and its connected addresses and contact persons. This action cannot
            be undone.
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
            {isDeleting ? "Deleting..." : "Delete company"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CompanyDeleteDialog;
