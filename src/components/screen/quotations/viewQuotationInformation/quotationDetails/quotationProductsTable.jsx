import QuotationProductRows from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/quotationProductRows";
import QuotationProductCards from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/quotationProductCards";
import QuotationProductsEmptyState from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/quotationProductsEmptyState";

function QuotationProductsTable({ products, changes }) {
  if (!products.length) {
    return <QuotationProductsEmptyState />;
  }

  return (
    <>
      <QuotationProductCards products={products} changes={changes} />
      <div className="hidden overflow-x-auto rounded-lg border lg:block">
        <table className="w-full min-w-[680px] text-sm">
          <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 text-right font-medium">Quantity</th>
              <th className="px-4 py-3 text-right font-medium">Unit price</th>
              <th className="px-4 py-3 text-right font-medium">
                Discount (Rupees / %)
              </th>
              <th className="px-4 py-3 text-right font-medium">Line total</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <QuotationProductRows products={products} changes={changes} />
          </tbody>
        </table>
      </div>
    </>
  );
}

export default QuotationProductsTable;
