import { CircleAlert } from "lucide-react";

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

function QuotationUpdateUnavailableDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <CircleAlert className="size-5" aria-hidden="true" />
          </div>
          <DialogTitle>Quotation cannot be updated</DialogTitle>
          <DialogDescription>
            Some product information for this quotation was created before the
            latest app update and is not stored in the required format. This
            quotation cannot be updated. Please create a new quotation if
            changes are required.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Got it</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default QuotationUpdateUnavailableDialog;
