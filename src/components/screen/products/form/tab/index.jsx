import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcnComponent/tabs";

import ProductCommercialInformation from "@screenComponent/products/form/commercialInformation";

const PRODUCT_FORM_TABS = Object.freeze({
  INFORMATION: "product-information",
  COMMERCIAL: "commercial-values",
});

function ProductFormTabs() {
  return (
    <Tabs
      defaultValue={PRODUCT_FORM_TABS.INFORMATION}
      className="flex min-h-0 w-full flex-1 flex-col"
    >
      <TabsList className="grid h-auto w-full grid-cols-2 sm:w-fit">
        <TabsTrigger
          value={PRODUCT_FORM_TABS.INFORMATION}
          className="h-full whitespace-normal px-2 py-2 text-center sm:px-3"
        >
          Product information
        </TabsTrigger>
        <TabsTrigger
          value={PRODUCT_FORM_TABS.COMMERCIAL}
          className="h-full whitespace-normal px-2 py-2 text-center sm:px-3"
        >
          Commercial information
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value={PRODUCT_FORM_TABS.INFORMATION}
        className="min-h-0 flex-1 pt-4 text-sm text-muted-foreground"
      >
        Product information
      </TabsContent>
      <TabsContent
        value={PRODUCT_FORM_TABS.COMMERCIAL}
        className="min-h-0 flex-1 pt-4 data-[state=active]:flex data-[state=active]:flex-col"
      >
        <ProductCommercialInformation />
      </TabsContent>
    </Tabs>
  );
}

export default ProductFormTabs;
