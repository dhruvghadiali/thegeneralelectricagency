import { useSelector } from "react-redux";

import { PRODUCT_TABS } from "@Enums";
import {
  selectActiveProductTab,
  selectCanManageProducts,
} from "@Redux/product/product.selector";

import ProductHeader from "@screenComponent/products/header/productHeader";
import ProductTable from "@screenComponent/products/table";
import SyncPending from "@screenComponent/products/table/syncPending";

function Products() {
  const activeTab = useSelector(selectActiveProductTab);
  const canManage = useSelector(selectCanManageProducts);
  const showProducts = activeTab === PRODUCT_TABS.PRODUCTS || !canManage;

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <ProductHeader />

      {showProducts && <ProductTable />}

      {canManage && activeTab === PRODUCT_TABS.SYNC_PENDING && <SyncPending />}
    </main>
  );
}

export default Products;
