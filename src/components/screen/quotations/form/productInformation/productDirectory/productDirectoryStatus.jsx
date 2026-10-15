import { Package } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import ProductDirectoryLoading from "@screenComponent/quotations/form/productInformation/productDirectory/productDirectoryLoading";

function ProductDirectoryStatus({ isLoading, error, isEmpty, onRetry }) {
  if (isLoading) return <ProductDirectoryLoading />;

  if (!isEmpty) return null;

  return (
    <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 px-6 text-center">
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : (
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Package className="size-8" aria-hidden="true" />
          <p className="text-sm">No products found.</p>
        </div>
      )}
      <Button type="button" variant="outline" size="sm" onClick={onRetry}>
        Try again
      </Button>
    </div>
  );
}

export default ProductDirectoryStatus;
