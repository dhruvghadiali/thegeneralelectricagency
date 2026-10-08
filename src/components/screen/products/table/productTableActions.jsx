import { FileText } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function ProductTableActions({
  product,
  onPdf,
  canManage = false,
  showPdf = true,
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      {canManage && showPdf && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onPdf(product)}
          aria-label={`View quotation details for ${product.name}`}
          title="View quotation details"
        >
          <FileText className="size-4" />
        </Button>
      )}
    </div>
  );
}

export default ProductTableActions;
