import { PRODUCT_FORM_TABS } from "@Enums";
import { TabsList, TabsTrigger } from "@shadcnComponent/tabs";

function ProductFormTabList() {
  return (
    <TabsList className="grid h-auto w-full grid-cols-2 sm:w-fit">
      <TabsTrigger
        value={PRODUCT_FORM_TABS.PRODUCT_INFORMATION}
        className="h-full whitespace-normal px-2 py-2 text-center sm:px-3"
      >
        Product information
      </TabsTrigger>
      <TabsTrigger
        value={PRODUCT_FORM_TABS.COMMERCIAL_INFORMATION}
        className="h-full whitespace-normal px-2 py-2 text-center sm:px-3"
      >
        Commercial information
      </TabsTrigger>
    </TabsList>
  );
}

export default ProductFormTabList;
