import { FileText, Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function ProductHeader({
  canManage,
  selectedCount = 0,
  onViewQuotation,
  onAddProduct,
}) {
  const actions = canManage ? (
    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:justify-end">
      {selectedCount > 0 && (
        <Button
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
      )}
      <Button onClick={onAddProduct} className="w-full sm:w-auto">
        <Plus className="size-4" />
        Add product
      </Button>
    </div>
  ) : null;

  return (
    <header className="flex justify-end">
      <h1 className="sr-only">Products</h1>
      {actions}
    </header>
  );
}

export default ProductHeader;
