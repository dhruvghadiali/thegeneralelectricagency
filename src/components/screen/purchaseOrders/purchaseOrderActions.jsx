import { Eye } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function PurchaseOrderActions({ purchase, onView }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => onView(purchase)}
      aria-label={`View purchase ${purchase.id}`}
      title="View purchase details"
    >
      <Eye className="size-4" />
    </Button>
  );
}

export default PurchaseOrderActions;
