import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function ProductTableActions({ product, canManage = false, onEdit, onView }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onView(product)}
        aria-label={`View ${product.name}`}
        title="View product details"
      >
        <Eye className="size-4" aria-hidden="true" />
      </Button>
      {canManage && (
        <>
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
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled
            aria-label={`Delete ${product.name}`}
            title="Delete product (disabled)"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </Button>
        </>
      )}
    </div>
  );
}

export default ProductTableActions;
