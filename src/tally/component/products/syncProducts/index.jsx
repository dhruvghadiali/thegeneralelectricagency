import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcnComponent/tabs";
import { SYNC_PRODUCT_TABS } from "@Tally/enum/syncProductsTabs.enum";

function SyncProducts() {
  return (
    <Tabs defaultValue={SYNC_PRODUCT_TABS.NEW_PRODUCTS} className="min-w-0">
      <div className="max-w-full overflow-x-auto">
        <TabsList aria-label="Sync product sections">
          <TabsTrigger value={SYNC_PRODUCT_TABS.NEW_PRODUCTS}>
            {SYNC_PRODUCT_TABS.NEW_PRODUCTS}
          </TabsTrigger>
          <TabsTrigger value={SYNC_PRODUCT_TABS.DELETED_PRODUCTS}>
            {SYNC_PRODUCT_TABS.DELETED_PRODUCTS}
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value={SYNC_PRODUCT_TABS.NEW_PRODUCTS}>
        {SYNC_PRODUCT_TABS.NEW_PRODUCTS}
      </TabsContent>
      <TabsContent value={SYNC_PRODUCT_TABS.DELETED_PRODUCTS}>
        {SYNC_PRODUCT_TABS.DELETED_PRODUCTS}
      </TabsContent>
    </Tabs>
  );
}

export default SyncProducts;
