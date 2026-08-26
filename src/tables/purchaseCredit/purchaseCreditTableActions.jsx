import { Eye, Pencil } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function PurchaseCreditTableActions({ purchaseCredit, onView, onEdit }) {
  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onView(purchaseCredit)}
        aria-label={`View purchase credit for ${purchaseCredit.supplierName}`}
        title="View purchase credit details"
      >
        <Eye className="size-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onEdit(purchaseCredit)}
        aria-label={`Edit purchase credit for ${purchaseCredit.supplierName}`}
        title="Edit purchase credit"
      >
        <Pencil className="size-4" />
      </Button>
    </div>
  );
}

export default PurchaseCreditTableActions;
