import { Badge } from "@shadcnComponent/badge";
import {
  displayValue,
  formatMoney,
  formatPercentage,
  getProductChangeKey,
} from "@screenComponent/quotations/viewQuotationInformation/viewQuotationInformation.utils";
import ProductValue from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/productValue";

function QuotationProductCards({ products, changes }) {
  return (
    <div className="grid gap-3 lg:hidden">
      {products.map((product, index) => {
        const quantity = Number(product.quantity) || 0;
        const price = Number(product.sellingPrice) || 0;
        const discount = Number(product.discount) || 0;
        const productChange = changes?.productChanges?.get(
          getProductChangeKey(product, index),
        );

        return (
          <article
            key={product.lineId ?? `${product.product}-${index}`}
            className={
              productChange
                ? "rounded-lg border border-amber-200 bg-amber-50/70 p-3"
                : "rounded-lg border bg-background p-3"
            }
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h4 className="min-w-0 flex-1 break-words text-sm font-semibold capitalize">
                {displayValue(product.product)}
              </h4>
              {productChange && (
                <Badge variant="warning">{productChange.type}</Badge>
              )}
            </div>

            {product.description && (
              <p className="mt-1 break-words text-xs leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
              {product.productCode && <span>Code: {product.productCode}</span>}
              {product.modelNumber && <span>Model: {product.modelNumber}</span>}
              {product.category && <span>Category: {product.category}</span>}
              {product.agency && <span>Agency: {product.agency}</span>}
              {product.hsnCode && <span>HSN: {product.hsnCode}</span>}
              {product.productDeliveryNotes && (
                <span className="basis-full break-words whitespace-pre-line">
                  Delivery notes: {product.productDeliveryNotes}
                </span>
              )}
            </div>

            {productChange?.fields.length > 0 && (
              <p className="mt-2 text-xs font-medium text-amber-800">
                Changed: {productChange.fields.join(", ")}
              </p>
            )}

            <dl className="mt-3 grid grid-cols-2 gap-1 border-t pt-2 sm:grid-cols-4">
              <ProductValue label="Quantity">
                {displayValue(product.quantity)}
              </ProductValue>
              <ProductValue label="Unit price">{formatMoney(price)}</ProductValue>
              <ProductValue label="Discount (Rupees / %)">
                <span className="flex flex-wrap gap-x-1.5">
                  <span>{formatMoney(discount)}</span>
                  <span className="text-muted-foreground">
                    ({formatPercentage(product.discountPercentage)})
                  </span>
                </span>
              </ProductValue>
              <ProductValue label="Line total" emphasized>
                {formatMoney(
                  product.finalPrice ||
                    Math.max(price - discount, 0) * quantity,
                )}
              </ProductValue>
            </dl>
          </article>
        );
      })}
    </div>
  );
}

export default QuotationProductCards;

