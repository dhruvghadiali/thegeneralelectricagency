import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@shadcnComponent/button";
import { Card, CardContent, CardHeader, CardTitle } from "@shadcnComponent/card";
import { syncTallyProducts } from "@Tally/redux/tally.action";
import { selectTallyProducts, selectTallyProductCount, selectTallyProductRows } from "@Tally/redux/tally.selector";
import ProductsTable from "@Tally/component/products/table";

function Products() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectTallyProducts);
  const productCount = useSelector(selectTallyProductCount);
  const products = useSelector(selectTallyProductRows);
  const isSyncing = status === "loading";

  return (
    <Card className="min-w-0 w-full">
      <CardHeader className="grid-cols-[1fr_auto] grid-rows-1 items-center border-b">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <CardTitle>Products</CardTitle>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium tabular-nums" aria-live="polite">
            Total: {productCount ?? "—"}
          </span>
        </div>
        <Button
          type="button"
          onClick={() => dispatch(syncTallyProducts())}
          disabled={isSyncing}
          aria-busy={isSyncing}
        >
          {isSyncing && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
          {isSyncing ? "Syncing..." : "Sync"}
        </Button>
      </CardHeader>
      <CardContent className="min-w-0 space-y-4 pb-6">
        <ProductsTable
          products={products}
          status={status}
          error={error}
          onRetry={() => dispatch(syncTallyProducts())}
        />
      </CardContent>
    </Card>
  );
}

export default Products;
