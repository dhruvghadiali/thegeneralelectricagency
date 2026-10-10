import _ from "lodash";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const calculateFinalPrice = ({ quantity, sellingPrice, discount }) =>
  Math.max(Number(sellingPrice) - Number(discount || 0), 0) * Number(quantity);

function QuotationProductSummaryCard({ products }) {
  const [product] = products;
  const showProductDetails = products.length === 1;

  return (
    <Card className="w-full shrink-0 gap-0 overflow-hidden py-0">
      <CardHeader className={showProductDetails ? "border-b py-3" : "py-3"}>
        <CardTitle>Product summary</CardTitle>
        <CardDescription>
          {products.length} {products.length === 1 ? "product" : "products"} added
        </CardDescription>
      </CardHeader>
      {showProductDetails && (
        <CardContent className="px-0">
          <article className="grid gap-2 px-6 py-3">
            <p className="truncate font-semibold">
              {_.toUpper(product.product)}
            </p>
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
        </CardContent>
      )}
    </Card>
  );
}

export default QuotationProductSummaryCard;
