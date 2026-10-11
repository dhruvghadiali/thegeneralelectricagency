import { Trash2 } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function ProductTableActions({ product }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled
        aria-label={`Delete ${product.name}`}
        title="Delete product (disabled)"
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
}

export default ProductTableActions;
