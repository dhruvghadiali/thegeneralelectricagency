import { Pencil } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function SyncPendingTableActions({ product, onEdit }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => onEdit(product)}
      disabled={!product.id}
      aria-label={`Edit ${product.name}`}
      title="Edit product"
    >
      <Pencil className="size-4" aria-hidden="true" />
    </Button>
  );
}

export default SyncPendingTableActions;
