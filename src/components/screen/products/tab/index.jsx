import { useDispatch, useSelector } from "react-redux";

import { Tabs, TabsList, TabsTrigger } from "@shadcnComponent/tabs";
import { PRODUCT_TABS } from "@Enums";
import {
  selectActiveProductTab,
  selectCanManageProducts,
} from "@Redux/product/product.selector";
import { productTabChanged } from "@Redux/product/product.slice";

function ProductTabs() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveProductTab);
  const canAccessSyncPending = useSelector(selectCanManageProducts);
  const visibleTab = canAccessSyncPending
    ? activeTab
    : PRODUCT_TABS.PRODUCTS;

  return (
    <Tabs
      value={visibleTab}
      onValueChange={(tab) => dispatch(productTabChanged(tab))}
      className="w-full sm:mr-auto sm:w-auto"
    >
      <TabsList
        aria-label="Product sections"
        className={`grid w-full sm:w-auto ${
          canAccessSyncPending ? "grid-cols-2" : "grid-cols-1"
        }`}
      >
        <TabsTrigger value={PRODUCT_TABS.PRODUCTS}>
          {PRODUCT_TABS.PRODUCTS}
        </TabsTrigger>
        {canAccessSyncPending && (
          <TabsTrigger value={PRODUCT_TABS.SYNC_PENDING}>
            {PRODUCT_TABS.SYNC_PENDING}
          </TabsTrigger>
        )}
      </TabsList>
    </Tabs>
  );
}

export default ProductTabs;
