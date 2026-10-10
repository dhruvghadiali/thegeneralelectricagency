import { Pencil, Trash2 } from "lucide-react";
import _ from "lodash";

import { cn } from "@/lib/utils";
import { Button } from "@shadcnComponent/button";
import { CardContent, CardFooter } from "@shadcnComponent/card";
import useProductSummaryKeyboardShortcut from "@screenComponent/quotations/create/hooks/product/useProductSummaryKeyboardShortcut";
import CreateQuotationDownloadButton from "@screenComponent/quotations/create/productInformation/createQuotationDownloadButton";
import QuotationProductDeleteDialog from "@screenComponent/quotations/create/productInformation/quotationProductDeleteDialog";

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
  pendingDeleteProductIndex,
  onDeleteRequest,
  onDeleteCancel,
  onDeleteConfirm,
  onNavigateToCompanyInformation,
  onNavigateToProductInformation,
  onOpenQuotationSummary,
}) {
  const keyboard = useProductSummaryKeyboardShortcut({
    productCount: products.length,
    onDeleteProduct: onDeleteRequest,
    onEditProduct: (index) => onEdit(products[index], index),
    onNavigateToCompanyInformation,
    onNavigateToProductInformation,
    onOpenQuotationSummary,
  });

  const cancelDelete = () => {
    const productIndex = pendingDeleteProductIndex;

    onDeleteCancel();
    if (productIndex === null) return;

    window.requestAnimationFrame(() => {
      keyboard.focusProduct(productIndex);
    });
  };

  const confirmDelete = () => {
    const productIndex = pendingDeleteProductIndex;

    if (productIndex === null) return;

    onDeleteConfirm(productIndex);
    keyboard.handleProductDeleted(productIndex);
  };

  return (
    <>
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
              keyboard.focusedProductIndex === index ? "true" : undefined
            }
            onClick={() => keyboard.focusProduct(index)}
            onBlur={keyboard.handleProductBlur}
            onFocus={() => keyboard.handleProductFocus(index)}
            onKeyDown={(event) => keyboard.handleProductKeyDown(event, index)}
            className={cn(
              "grid gap-2 px-5 py-3 outline-none transition-colors",
              keyboard.focusedProductIndex === index &&
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
                    onDeleteRequest(index);
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
      <CardFooter className="justify-end border-t px-5 py-3">
        <CreateQuotationDownloadButton
          buttonRef={keyboard.downloadButtonRef}
          onClick={onOpenQuotationSummary}
          onKeyDown={keyboard.handleDownloadButtonKeyDown}
        />
      </CardFooter>
      <QuotationProductDeleteDialog
        product={products[pendingDeleteProductIndex] ?? null}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </>
  );
}

export default ExpandedProductSummary;
