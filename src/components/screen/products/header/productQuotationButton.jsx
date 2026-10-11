import { FileText } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function ProductQuotationButton({ selectedCount = 0, onViewQuotation }) {
  if (selectedCount <= 0) return null;

  return (
    <Button
      type="button"
      variant="outline"
      onClick={onViewQuotation}
      className="w-full sm:w-auto"
    >
      <FileText className="size-4" />
      View quotation details
      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
        {selectedCount}
      </span>
    </Button>
  );
}

export default ProductQuotationButton;
