import { useState } from "react";
import { useSelector } from "react-redux";

import { PRODUCT_TABS } from "@Enums";
import {
  selectActiveProductTab,
  selectCanManageProducts,
  selectSelectedProducts,
} from "@Redux/product/product.selector";

import ProductHeader from "@screenComponent/products/header/productHeader";
import ProductQuotationSheet from "@screenComponent/products/quotation/productQuotationSheet";
import ProductTable from "@screenComponent/products/table";
import SyncPending from "@screenComponent/products/table/syncPending";

function Products() {
  const activeTab = useSelector(selectActiveProductTab);
  const canManage = useSelector(selectCanManageProducts);
  const selectedProducts = useSelector(selectSelectedProducts);

  const [quotationProducts, setQuotationProducts] = useState([]);
  const showProducts =
    activeTab === PRODUCT_TABS.PRODUCTS || !canManage;

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <ProductHeader
        onViewQuotation={() => setQuotationProducts(selectedProducts)}
      />

      {showProducts && (
        <ProductTable onCreateQuotation={setQuotationProducts} />
      )}

      {canManage && activeTab === PRODUCT_TABS.SYNC_PENDING && <SyncPending />}

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
