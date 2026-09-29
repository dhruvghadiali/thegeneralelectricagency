import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcnComponent/tabs";
import { Button } from "@shadcnComponent/button";
import { PRODUCT_TAB_NAMES } from "@Tally/enum/productsTabs.enum";

import SystemProducts from "@Tally/pages/products/tabs/systemProducts";
import TallyProducts from "@Tally/pages/products/tabs/tallyProducts";
import SyncProducts from "@Tally/pages/products/tabs/syncProducts";

function ProductsTabs() {
  return (
    <Tabs defaultValue={PRODUCT_TAB_NAMES.SYSTEM_PRODUCTS} className="w-full">
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
        <Button type="button" className="ml-auto shrink-0">
          Sync Tally Products
        </Button>
      </div>

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
