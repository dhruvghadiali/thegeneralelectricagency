import { useDispatch, useSelector } from "react-redux";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcnComponent/tabs";
import { SYNC_PRODUCT_TABS } from "@Tally/enum/syncProductsTabs.enum";
import { activeTabChanged } from "@Tally/redux/syncProducts/syncProducts.slice";
import { selectSyncProductsActiveTab } from "@Tally/redux/syncProducts/syncProducts.selector";
import NewProducts from "@Tally/component/products/syncProducts/newProducts";
import SaveSyncProductsButton from "@Tally/component/products/saveSyncProductsButton";

function SyncProducts() {
  const dispatch = useDispatch();
  const activeTab = useSelector(selectSyncProductsActiveTab);

  return (
    <Tabs value={activeTab} onValueChange={(value) => dispatch(activeTabChanged(value))} className="flex min-w-0 flex-col gap-4 roomy:min-h-0 roomy:flex-1">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
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
        <SaveSyncProductsButton />
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
