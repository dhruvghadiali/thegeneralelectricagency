import { useCallback } from "react";
import _ from "lodash";
import { Loader2, Package } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { fetchQuotationProducts } from "@Redux/quotation/quotation.action";
import {
  selectQuotationProductPagination,
  selectQuotationProductRequest,
  selectQuotationProducts,
} from "@Redux/quotation/quotation.selector";
import { QUOTATION_PRODUCT_PAGE } from "@Redux/quotation/quotation.state";
import { Button } from "@shadcnComponent/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

function QuotationProductList({
  directoryRef,
  selectedProduct,
  onProductSelect,
  onProductOptionKeyDown,
}) {
  const dispatch = useDispatch();
  const items = useSelector(selectQuotationProducts);
  const pagination = useSelector(selectQuotationProductPagination);
  const { isLoading, isLoadingMore, error } = useSelector(
    selectQuotationProductRequest,
  );
  const hasMoreProducts = pagination.page < pagination.totalPages;
  const productCountLabel = pagination.total
    ? `${items.length} of ${pagination.total} products`
    : `${items.length} products`;

  const loadProducts = useCallback(
    (page = QUOTATION_PRODUCT_PAGE) =>
      dispatch(fetchQuotationProducts({ page })),
    [dispatch],
  );

  return (
    <Card
      ref={directoryRef}
      className="min-h-[32rem] w-full gap-0 overflow-hidden pb-0 lg:h-full lg:min-h-0"
    >
      <CardHeader className="shrink-0 border-b">
        <CardTitle>Product directory</CardTitle>
        <CardDescription>{productCountLabel}</CardDescription>
      </CardHeader>

      <CardContent
        className="min-h-0 flex-1 overflow-y-auto px-0"
        aria-live="polite"
      >
        {isLoading ? (
          <div className="flex h-full min-h-48 items-center justify-center gap-2 px-6 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Loading products...
          </div>
        ) : error && items.length === 0 ? (
          <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadProducts()}
            >
              Try again
            </Button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Package className="size-8" aria-hidden="true" />
              <p className="text-sm">No products found.</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => loadProducts()}
            >
              Try again
            </Button>
          </div>
        ) : (
          <>
            <div className="divide-y" role="listbox" aria-label="Products">
              {items.map((product, index) => (
                <Button
                  key={product.id ?? `${product.name}-${index}`}
                  type="button"
                  variant="ghost"
                  role="option"
                  data-product-option
                  aria-selected={
                    Boolean(selectedProduct) &&
                    selectedProduct?.id === product.id
                  }
                  onClick={() => onProductSelect(product)}
                  onKeyDown={(event) =>
                    onProductOptionKeyDown(event, index)
                  }
                  className="h-auto w-full justify-start rounded-none px-6 py-3 text-left font-medium aria-selected:bg-accent aria-selected:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
                >
                  <span className="min-w-0 truncate">
                    {_.toUpper(product.name || "Unnamed product")}
                  </span>
                </Button>
              ))}
            </div>

            {(pagination.totalPages > 1 || error) && (
              <div className="sticky bottom-0 space-y-2 border-t bg-card p-3">
                {error && (
                  <p className="text-center text-sm text-destructive">
                    {error}
                  </p>
                )}
                {(hasMoreProducts || error) && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={isLoadingMore}
                    onClick={() => loadProducts(pagination.page + 1)}
                    className="w-full"
                  >
                    {isLoadingMore && (
                      <Loader2
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    {isLoadingMore ? "Loading..." : "Load more products"}
                  </Button>
                )}
                {pagination.totalPages > 0 && (
                  <p className="text-center text-xs text-muted-foreground">
                    Page {pagination.page} of {pagination.totalPages}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default QuotationProductList;
