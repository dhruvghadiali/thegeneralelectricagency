import { TabsContent } from "@shadcnComponent/tabs";
import { PRODUCT_FORM_TABS } from "@Enums";

import ProductCommercialInformation from "@screenComponent/products/form/commercialInformation";
import ProductInformation from "@screenComponent/products/form/productInformation";

function ProductFormTabs({ product }) {
  return (
    <>
      <TabsContent
        value={PRODUCT_FORM_TABS.PRODUCT_INFORMATION}
        className="mt-0 min-h-0 flex-1 overflow-hidden data-[state=active]:flex data-[state=active]:flex-col"
      >
        <ProductInformation product={product} />
      </TabsContent>
      <TabsContent
        value={PRODUCT_FORM_TABS.COMMERCIAL_INFORMATION}
        className="mt-0 min-h-0 flex-1 data-[state=active]:flex data-[state=active]:flex-col"
      >
        <ProductCommercialInformation />
      </TabsContent>
    </>
  );
}

export default ProductFormTabs;
