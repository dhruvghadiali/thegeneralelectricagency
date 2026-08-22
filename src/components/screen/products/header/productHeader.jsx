import { FileText, Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";

import ProductSummary from "@screenComponent/products/header/productSummary";

function ProductHeader({
  canManage,
  selectedCount = 0,
  onViewQuotation,
  onAddProduct,
}) {
  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:justify-end">
      <h1 className="sr-only">Products</h1>
      <ProductSummary />
      {canManage && (
        <>
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
        </>
      )}
    </header>
  );
}

export default ProductHeader;
