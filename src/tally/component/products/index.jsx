import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@shadcnComponent/button";
import { Card, CardContent, CardHeader, CardTitle } from "@shadcnComponent/card";
import { syncTallyProducts } from "@Tally/redux/tally.action";
import { selectTallyProducts, selectTallyProductCount } from "@Tally/redux/tally.selector";

function Products() {
  const dispatch = useDispatch();
  const { status, error } = useSelector(selectTallyProducts);
  const productCount = useSelector(selectTallyProductCount);
  const isSyncing = status === "loading";

  return (
    <Card className="min-h-0 w-full flex-1">
      <CardHeader className="grid-cols-[1fr_auto] grid-rows-1 items-center border-b">
        <CardTitle>Products</CardTitle>
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
      <CardContent className="min-h-0 flex-1 space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Total products</p>
          <p className="text-3xl font-semibold tabular-nums" aria-live="polite">
            {productCount ?? "—"}
          </p>
        </div>
        {status === "succeeded" && (
          <p role="status">Product data received from Tally.</p>
        )}
        {status === "failed" && (
          <p role="alert" className="text-destructive">{error}</p>
        )}
      </CardContent>
    </Card>
  );
}

export default Products;
