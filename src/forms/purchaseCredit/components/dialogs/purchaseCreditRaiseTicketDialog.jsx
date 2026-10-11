import { useState } from "react";
import { TicketPlus } from "lucide-react";

import PurchaseCreditRaiseTicketForm from "@Forms/purchaseCredit/components/purchaseCreditRaiseTicketForm";
import { Button } from "@shadcnComponent/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shadcnComponent/dialog";

function PurchaseCreditRaiseTicketDialog({ disabled = false }) {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" disabled={disabled}>
          <TicketPlus className="size-4" aria-hidden="true" />
          Raise ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Raise edit ticket</DialogTitle>
          <DialogDescription>
            Select the locked purchase-credit fields that need correction and explain why they should be updated.
          </DialogDescription>
        </DialogHeader>
        {open && (
          <PurchaseCreditRaiseTicketForm
            onCancel={closeDialog}
            onSubmit={closeDialog}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PurchaseCreditRaiseTicketDialog;
