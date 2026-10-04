import { useDispatch, useSelector } from "react-redux";

import { Tabs, TabsList, TabsTrigger } from "@shadcnComponent/tabs";
import { PRODUCT_TABS } from "@Enums";
import { selectActiveProductTab } from "@Redux/product/product.selector";
import { productTabChanged } from "@Redux/product/product.slice";

function ProductTabs() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectActiveProductTab);

  return (
    <Tabs
      value={activeTab}
      onValueChange={(tab) => dispatch(productTabChanged(tab))}
      className="w-full sm:mr-auto sm:w-auto"
    >
      <TabsList
        aria-label="Product sections"
        className="grid w-full grid-cols-2 sm:w-auto"
      >
        <TabsTrigger value={PRODUCT_TABS.PRODUCTS}>
          {PRODUCT_TABS.PRODUCTS}
        </TabsTrigger>
        <TabsTrigger value={PRODUCT_TABS.SYNC_PENDING}>
          {PRODUCT_TABS.SYNC_PENDING}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default ProductTabs;
