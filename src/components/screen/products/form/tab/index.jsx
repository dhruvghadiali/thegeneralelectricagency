import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shadcnComponent/tabs";

const PRODUCT_FORM_TABS = Object.freeze({
  INFORMATION: "product-information",
  COMMERCIAL: "commercial-values",
});

function ProductFormTabs() {
  return (
    <Tabs defaultValue={PRODUCT_FORM_TABS.INFORMATION} className="w-full">
      <TabsList className="grid w-full grid-cols-2 sm:w-fit">
        <TabsTrigger value={PRODUCT_FORM_TABS.INFORMATION}>
          Product information
        </TabsTrigger>
        <TabsTrigger value={PRODUCT_FORM_TABS.COMMERCIAL}>
          Commercial values
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value={PRODUCT_FORM_TABS.INFORMATION}
        className="pt-4 text-sm text-muted-foreground"
      >
        Product information
      </TabsContent>
      <TabsContent
        value={PRODUCT_FORM_TABS.COMMERCIAL}
        className="pt-4 text-sm text-muted-foreground"
      >
        Commercial values
      </TabsContent>
    </Tabs>
  );
}

export default ProductFormTabs;
