import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcnComponent/tabs";
import { PRODUCT_TAB_NAMES } from "@Tally/enum/productsTabs.enum";
import { selectTallyProducts } from "@Tally/redux/tallyProducts/tallyProducts.selector";
import ProductsErrorMessage from "@Tally/component/products/errorMessage";
import SyncTallyProductsButton from "@Tally/component/products/syncTallyProductsButton";

import SystemProducts from "@Tally/pages/products/tabs/systemProducts";
import TallyProducts from "@Tally/pages/products/tabs/tallyProducts";
import SyncProducts from "@Tally/pages/products/tabs/syncProducts";

function ProductsTabs() {
  const [activeTab, setActiveTab] = useState(PRODUCT_TAB_NAMES.SYSTEM_PRODUCTS);
  const { error } = useSelector(selectTallyProducts);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="max-w-full overflow-x-auto">
          <TabsList aria-label="Product sections">
            <TabsTrigger value={PRODUCT_TAB_NAMES.SYSTEM_PRODUCTS}>
              {PRODUCT_TAB_NAMES.SYSTEM_PRODUCTS}
            </TabsTrigger>
            <TabsTrigger value={PRODUCT_TAB_NAMES.TALLY_PRODUCTS}>
              {PRODUCT_TAB_NAMES.TALLY_PRODUCTS}
            </TabsTrigger>
            <TabsTrigger value={PRODUCT_TAB_NAMES.SYNC_PRODUCTS}>
              {PRODUCT_TAB_NAMES.SYNC_PRODUCTS}
            </TabsTrigger>
          </TabsList>
        </div>
        <SyncTallyProductsButton
          onSuccess={() => setActiveTab(PRODUCT_TAB_NAMES.TALLY_PRODUCTS)}
        />
      </div>
      <ProductsErrorMessage message={error} />

      <TabsContent value={PRODUCT_TAB_NAMES.SYSTEM_PRODUCTS}>
        <SystemProducts />
      </TabsContent>
      <TabsContent value={PRODUCT_TAB_NAMES.TALLY_PRODUCTS}>
        <TallyProducts />
      </TabsContent>
      <TabsContent value={PRODUCT_TAB_NAMES.SYNC_PRODUCTS}>
        <SyncProducts />
      </TabsContent>
    </Tabs>
  );
}

export default ProductsTabs;
