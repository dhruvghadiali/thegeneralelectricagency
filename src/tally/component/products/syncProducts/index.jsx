import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcnComponent/tabs";
import { SYNC_PRODUCT_TABS } from "@Tally/enum/syncProductsTabs.enum";
import NewProducts from "@Tally/component/products/syncProducts/newProducts";

function SyncProducts() {
  return (
    <Tabs defaultValue={SYNC_PRODUCT_TABS.NEW_PRODUCTS} className="flex min-w-0 flex-col gap-4 roomy:min-h-0 roomy:flex-1">
      <div className="max-w-full shrink-0 overflow-x-auto">
        <TabsList aria-label="Sync product sections">
          <TabsTrigger value={SYNC_PRODUCT_TABS.NEW_PRODUCTS}>
            {SYNC_PRODUCT_TABS.NEW_PRODUCTS}
          </TabsTrigger>
          <TabsTrigger value={SYNC_PRODUCT_TABS.DELETED_PRODUCTS}>
            {SYNC_PRODUCT_TABS.DELETED_PRODUCTS}
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent
        value={SYNC_PRODUCT_TABS.NEW_PRODUCTS}
        className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
      >
        <NewProducts />
      </TabsContent>
      <TabsContent value={SYNC_PRODUCT_TABS.DELETED_PRODUCTS}>
        {SYNC_PRODUCT_TABS.DELETED_PRODUCTS}
      </TabsContent>
    </Tabs>
  );
}

export default SyncProducts;
