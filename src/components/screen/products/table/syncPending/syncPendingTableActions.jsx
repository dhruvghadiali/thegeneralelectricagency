import { Eye, Pencil } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function SyncPendingTableActions({ product, onEdit, onView }) {
  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onView(product)}
        disabled={!product.id}
        aria-label={`View ${product.name}`}
        title="View product details"
      >
        <Eye className="size-4" aria-hidden="true" />
      </Button>
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
    </div>
  );
}

export default SyncPendingTableActions;
