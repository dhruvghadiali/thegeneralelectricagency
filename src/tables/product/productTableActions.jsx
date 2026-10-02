import { FileText, Pencil } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function ProductTableActions({
  product,
  onEdit,
  onPdf,
  canManage = false,
  showPdf = true,
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      {canManage && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(product)}
          aria-label={`Edit ${product.name}`}
        >
          <Pencil className="size-4" />
        </Button>
      )}
      {canManage && showPdf && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onPdf(product)}
          aria-label={`Product PDF for ${product.name}`}
          title="Product PDF"
        >
          <FileText className="size-4" />
        </Button>
      )}
    </div>
  );
}

export default ProductTableActions;
