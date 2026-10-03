import { useState } from "react";
import { useSelector } from "react-redux";

import {
  selectCanManageProducts,
  selectSelectedProducts,
} from "@Redux/product/product.selector";

import ProductHeader from "@screenComponent/products/header/productHeader";
import ProductQuotationSheet from "@screenComponent/products/quotation/productQuotationSheet";
import ProductTable from "@screenComponent/products/table";

function Products() {
  const canManage = useSelector(selectCanManageProducts);
  const selectedProducts = useSelector(selectSelectedProducts);

  const [quotationProducts, setQuotationProducts] = useState([]);

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <ProductHeader
        onViewQuotation={() => setQuotationProducts(selectedProducts)}
      />

      <ProductTable onCreateQuotation={setQuotationProducts} />

      {canManage && (
        <>
          <ProductQuotationSheet
            products={quotationProducts}
            onClose={() => setQuotationProducts([])}
          />
        </>
      )}
    </main>
  );
}

export default Products;
