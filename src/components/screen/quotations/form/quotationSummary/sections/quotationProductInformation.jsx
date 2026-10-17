import _ from "lodash";
import { Label } from "@shadcnComponent/label";
import {
  calculateProductFinalPrice,
  quotationCurrencyFormatter,
} from "@screenComponent/quotations/form/quotationSummary/quotationSummary.utils";

function QuotationProductInformation({ products, sectionRef, onKeyDown }) {
  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      aria-labelledby="quotation-products"
      onKeyDown={onKeyDown}
      className="grid gap-2 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
    >
      <Label  id="quotation-products" className="font-semibold">
        Products
      </Label>
      <div className="divide-y overflow-hidden rounded-md border">
        {products.map((product, index) => (
          <article
            key={`${product.productId ?? product.product}-${index}`}
            className="grid gap-2 px-3 py-2.5"
          >
            <p className="truncate text-xs font-semibold">
              {_.toUpper(product.product)}
            </p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-4">
              <div>
                <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Sale price
                </dt>
                <dd className="text-xs font-medium">
                  {quotationCurrencyFormatter.format(product.sellingPrice)}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Qty
                </dt>
                <dd className="text-xs font-medium">{product.quantity}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Discount
                </dt>
                <dd className="text-xs font-medium">
                  {quotationCurrencyFormatter.format(
                    Number(product.discount) || 0,
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Final price
                </dt>
                <dd className="text-xs font-semibold">
                  {quotationCurrencyFormatter.format(
                    calculateProductFinalPrice(product),
                  )}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

export default QuotationProductInformation;
