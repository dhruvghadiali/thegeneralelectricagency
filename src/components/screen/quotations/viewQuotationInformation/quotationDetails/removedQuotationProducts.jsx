import { displayValue } from "@screenComponent/quotations/viewQuotationInformation/viewQuotationInformation.utils";

function RemovedQuotationProducts({ products = [] }) {
  if (!products.length) return null;

  return (
    <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3">
      <p className="text-xs font-semibold text-red-800">
        Removed in this version
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-900">
        {products.map((product, index) => (
          <li
            key={product.lineId ?? `${product.product}-${index}`}
            className="capitalize"
          >
            {displayValue(product.product)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RemovedQuotationProducts;
