import { Pencil, Trash2 } from "lucide-react";
import _ from "lodash";

import { cn } from "@/lib/utils";
import { Button } from "@shadcnComponent/button";
import { CardContent } from "@shadcnComponent/card";
import useProductSummaryKeyboardShortcut from "@screenComponent/quotations/create/hooks/product/useProductSummaryKeyboardShortcut";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const calculateFinalPrice = ({ quantity, sellingPrice, discount }) =>
  Math.max(Number(sellingPrice) - Number(discount || 0), 0) * Number(quantity);

function ExpandedProductSummary({
  products,
  onEdit,
  onDelete,
  onNavigateToCompanyInformation,
  onNavigateToProductInformation,
}) {
  const keyboard = useProductSummaryKeyboardShortcut({
    productCount: products.length,
    onNavigateToCompanyInformation,
    onNavigateToProductInformation,
  });

  const deleteProduct = (index) => {
    onDelete(index);
    keyboard.handleProductDeleted(index);
  };

  return (
    <CardContent
      role="list"
      aria-label="Added quotation products"
      className="max-h-72 divide-y overflow-y-auto overscroll-contain px-0"
    >
      {products.map((product, index) => (
        <article
          ref={(element) => {
            keyboard.setProductRef(index, element);
          }}
          key={`${product.productId ?? product.product}-${index}`}
          role="listitem"
          tabIndex={keyboard.activeProductIndex === index ? 0 : -1}
          aria-current={
            keyboard.activeProductIndex === index ? "true" : undefined
          }
          onClick={() => keyboard.focusProduct(index)}
          onFocus={() => keyboard.handleProductFocus(index)}
          onKeyDown={(event) => keyboard.handleProductKeyDown(event, index)}
          className={cn(
            "grid gap-2 px-5 py-3 outline-none transition-colors last:rounded-b-xl",
            keyboard.activeProductIndex === index &&
              "bg-accent text-accent-foreground ring-1 ring-inset ring-ring",
          )}
        >
          <div className="flex min-w-0 items-center justify-between gap-3">
            <p className="truncate font-semibold">
              {_.toUpper(product.product)}
            </p>
            <div className="flex shrink-0 items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(event) => {
                  event.stopPropagation();
                  onEdit(product, index);
                }}
                aria-label={`Edit ${product.product}`}
                className="size-8"
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(event) => {
                  event.stopPropagation();
                  deleteProduct(index);
                }}
                aria-label={`Delete ${product.product}`}
                className="size-8 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-xs text-muted-foreground">Qty</dt>
              <dd className="font-medium">{product.quantity}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Sale price</dt>
              <dd className="font-medium">
                {currencyFormatter.format(product.sellingPrice)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Discount</dt>
              <dd className="font-medium">
                {currencyFormatter.format(product.discount)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Final price</dt>
              <dd className="font-semibold">
                {currencyFormatter.format(calculateFinalPrice(product))}
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </CardContent>
  );
}

export default ExpandedProductSummary;
