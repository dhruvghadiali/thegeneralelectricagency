import { Badge } from "@shadcnComponent/badge";
import {
  displayValue,
  formatMoney,
  getProductChangeKey,
} from "@screenComponent/quotations/viewQuotationInformation/viewQuotationInformation.utils";

function QuotationProductRows({ products, changes }) {
  return products.map((product, index) => {
    const quantity = Number(product.quantity) || 0;
    const price = Number(product.sellingPrice) || 0;
    const discount = Number(product.discount) || 0;
    const productChange = changes?.productChanges?.get(
      getProductChangeKey(product, index),
    );

    return (
      <tr
        key={product.lineId ?? `${product.product}-${index}`}
        className={productChange ? "bg-amber-50/70" : undefined}
      >
        <td className="px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium">{displayValue(product.product)}</p>
            {productChange && (
              <Badge variant="warning">{productChange.type}</Badge>
            )}
          </div>
          {product.description && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {product.description}
            </p>
          )}
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
            {product.productCode && <span>Code: {product.productCode}</span>}
            {product.modelNumber && <span>Model: {product.modelNumber}</span>}
            {product.category && <span>Category: {product.category}</span>}
            {product.agency && <span>Agency: {product.agency}</span>}
            {product.hsnCode && <span>HSN: {product.hsnCode}</span>}
          </div>
          {productChange?.fields.length > 0 && (
            <p className="mt-1 text-xs font-medium text-amber-800">
              Changed: {productChange.fields.join(", ")}
            </p>
          )}
        </td>
        <td className="px-4 py-3 text-right">
          {displayValue(product.quantity)}
        </td>
        <td className="px-4 py-3 text-right">{formatMoney(price)}</td>
        <td className="px-4 py-3 text-right">{formatMoney(discount)}</td>
        <td className="px-4 py-3 text-right font-semibold">
          {formatMoney(
            product.finalPrice || Math.max(price - discount, 0) * quantity,
          )}
        </td>
      </tr>
    );
  });
}

export default QuotationProductRows;
