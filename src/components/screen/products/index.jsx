import { useState } from "react";
import { useSelector } from "react-redux";

import { PRODUCT_TABS } from "@Enums";
import {
  selectActiveProductTab,
  selectCanManageProducts,
  selectSelectedProducts,
} from "@Redux/product/product.selector";

import ProductHeader from "@screenComponent/products/header/productHeader";
import ProductQuotationDialog from "@screenComponent/products/dialogs/quotation";
import ProductQuotationSheet from "@screenComponent/products/quotation/productQuotationSheet";
import ProductTable from "@screenComponent/products/table";
import SyncPending from "@screenComponent/products/table/syncPending";

const QUOTATION_STAGES = Object.freeze({
  DETAILS: "details",
  SHEET: "sheet",
});

function Products() {
  const activeTab = useSelector(selectActiveProductTab);
  const canManage = useSelector(selectCanManageProducts);
  const selectedProducts = useSelector(selectSelectedProducts);

  const [quotationProducts, setQuotationProducts] = useState([]);
  const [quotationStage, setQuotationStage] = useState(
    QUOTATION_STAGES.DETAILS,
  );
  const showProducts =
    activeTab === PRODUCT_TABS.PRODUCTS || !canManage;

  const openQuotation = (products) => {
    setQuotationProducts(products);
    setQuotationStage(QUOTATION_STAGES.DETAILS);
  };

  const closeQuotation = () => {
    setQuotationProducts([]);
    setQuotationStage(QUOTATION_STAGES.DETAILS);
  };

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <ProductHeader
        onViewQuotation={() => openQuotation(selectedProducts)}
      />

      {showProducts && (
        <ProductTable onCreateQuotation={openQuotation} />
      )}

      {canManage && activeTab === PRODUCT_TABS.SYNC_PENDING && <SyncPending />}

      {canManage && (
        <>
          {quotationStage === QUOTATION_STAGES.DETAILS && (
            <ProductQuotationDialog
              products={quotationProducts}
              onClose={closeQuotation}
              onNext={() => setQuotationStage(QUOTATION_STAGES.SHEET)}
            />
          )}
          {quotationStage === QUOTATION_STAGES.SHEET && (
            <ProductQuotationSheet
              products={quotationProducts}
              onClose={closeQuotation}
            />
          )}
        </>
      )}
    </main>
  );
}

export default Products;
