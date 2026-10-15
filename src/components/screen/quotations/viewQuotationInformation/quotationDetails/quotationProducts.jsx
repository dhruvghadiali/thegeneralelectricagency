import UpdatedMark from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/updatedMark";
import QuotationProductsTable from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/quotationProductsTable";
import RemovedQuotationProducts from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/removedQuotationProducts";

function QuotationProducts({ products, changes }) {
  const productsChanged = changes?.fields?.has("products");

  return (
    <section>
      <h3 className="mb-3 flex items-center text-sm font-semibold">
        Products ({products.length}){productsChanged && <UpdatedMark />}
      </h3>

      <QuotationProductsTable products={products} changes={changes} />

      <RemovedQuotationProducts products={changes?.removedProducts} />
    </section>
  );
}

export default QuotationProducts;
