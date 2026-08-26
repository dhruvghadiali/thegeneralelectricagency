import { Package } from "lucide-react";

import { formatNumber } from "@Tables/product/productTable.utils";

import PurchaseCreditEmptyState from "@screenComponent/purchaseCredits/sheet/purchaseCreditEmptyState";

function PurchaseCreditProductsSection({ products = [] }) {
  if (!products.length) {
    return (
      <PurchaseCreditEmptyState>
        No products are available for this purchase credit.
      </PurchaseCreditEmptyState>
    );
  }

  return (
    <div className="grid gap-3">
      {products.map((product, index) => (
        <article
          key={product.id ?? product.productId ?? index}
          className="flex items-center gap-3 rounded-xl border bg-card p-4"
        >
          <span className="rounded-lg bg-primary/10 p-2.5 text-primary">
            <Package className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{product.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {product.productCode || "No product code"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">
              {formatNumber(product.stock)}
            </p>
            <p className="text-xs text-muted-foreground">Stock</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default PurchaseCreditProductsSection;
