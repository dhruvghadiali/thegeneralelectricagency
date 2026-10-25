import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@shadcnComponent/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcnComponent/tabs";
import { PRODUCT_TAB_NAMES } from "@Tally/enum/productsTabs.enum";
import { TALLY_PRODUCTS_STATUS } from "@Tally/enum/tallyProductsStatus.enum";
import { UNMAPPED_PRODUCTS_STATUS } from "@Tally/enum/unmappedProductsStatus.enum";
import { selectSystemProductCount } from "@Tally/redux/systemProducts/systemProducts.selector";
import {
  selectTallyProductCount,
  selectTallyProducts,
} from "@Tally/redux/tallyProducts/tallyProducts.selector";
import { fetchUnmappedProducts } from "@Tally/redux/unmappedProducts/unmappedProducts.action";
import {
  selectUnmappedProductCount,
  selectUnmappedProducts,
} from "@Tally/redux/unmappedProducts/unmappedProducts.selector";
import ProductsErrorMessage from "@Tally/component/products/errorMessage";
import SyncTallyProductsButton from "@Tally/component/products/syncTallyProductsButton";

import SystemProducts from "@Tally/pages/products/tabs/systemProducts";
import TallyProducts from "@Tally/pages/products/tabs/tallyProducts";
import SyncProducts from "@Tally/pages/products/tabs/syncProducts";
import UnmappedProducts from "@Tally/pages/products/tabs/unmappedProducts";

function ProductsTabs() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(PRODUCT_TAB_NAMES.SYSTEM_PRODUCTS);
  const { status, error, errorTab, alertVisible } = useSelector(selectTallyProducts);
  const { status: unmappedProductsStatus } = useSelector(selectUnmappedProducts);
  const systemProductCount = useSelector(selectSystemProductCount);
  const tallyProductCount = useSelector(selectTallyProductCount);
  const unmappedProductCount = useSelector(selectUnmappedProductCount);

  useEffect(() => {
    if (unmappedProductsStatus === UNMAPPED_PRODUCTS_STATUS.IDLE) {
      dispatch(fetchUnmappedProducts());
    }
  }, [dispatch, unmappedProductsStatus]);

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex min-w-0 w-full flex-col gap-4 roomy:min-h-0 roomy:flex-1"
    >
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
        <div className="max-w-full overflow-x-auto">
          <TabsList aria-label="Product sections">
            <TabsTrigger value={PRODUCT_TAB_NAMES.SYSTEM_PRODUCTS}>
              {PRODUCT_TAB_NAMES.SYSTEM_PRODUCTS}
              <Badge variant="secondary" className="ml-2 tabular-nums">
                {systemProductCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value={PRODUCT_TAB_NAMES.TALLY_PRODUCTS}>
              {PRODUCT_TAB_NAMES.TALLY_PRODUCTS}
              <Badge variant="secondary" className="ml-2 tabular-nums">
                {tallyProductCount ?? 0}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value={PRODUCT_TAB_NAMES.SYNC_PRODUCTS}>
              {PRODUCT_TAB_NAMES.SYNC_PRODUCTS}
            </TabsTrigger>
            <TabsTrigger value={PRODUCT_TAB_NAMES.UNMAPPED_PRODUCTS}>
              {PRODUCT_TAB_NAMES.UNMAPPED_PRODUCTS}
              <Badge variant="secondary" className="ml-2 tabular-nums">
                {unmappedProductCount}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>
        <SyncTallyProductsButton
          errorTab={activeTab}
          onSuccess={() => setActiveTab(PRODUCT_TAB_NAMES.TALLY_PRODUCTS)}
        />
      </div>
      {alertVisible && status === TALLY_PRODUCTS_STATUS.FAILED && activeTab === errorTab && (
        <ProductsErrorMessage message={error} />
      )}

      <TabsContent
        value={PRODUCT_TAB_NAMES.SYSTEM_PRODUCTS}
        className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
      >
        <SystemProducts />
      </TabsContent>
      <TabsContent
        value={PRODUCT_TAB_NAMES.TALLY_PRODUCTS}
        className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
      >
        <TallyProducts />
      </TabsContent>
      <TabsContent
        value={PRODUCT_TAB_NAMES.SYNC_PRODUCTS}
        className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
      >
        <SyncProducts />
      </TabsContent>
      <TabsContent
        value={PRODUCT_TAB_NAMES.UNMAPPED_PRODUCTS}
        className="mt-0 min-w-0 roomy:min-h-0 roomy:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
      >
        <UnmappedProducts />
      </TabsContent>
    </Tabs>
  );
}

export default ProductsTabs;
