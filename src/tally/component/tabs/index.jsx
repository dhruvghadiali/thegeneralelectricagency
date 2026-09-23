import ConnectorDownload from "@Tally/component/connectorDownload";
import Companies from "@Tally/component/comapnies";
import Products from "@Tally/component/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcnComponent/tabs";

function TallyTabs() {
  return (
    <Tabs defaultValue="companies" className="flex min-h-0 min-w-0 w-full flex-1 flex-col">
      <div className="flex items-center justify-between gap-2">
        <TabsList aria-label="Tally sections">
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <div className="ml-auto shrink-0">
          <ConnectorDownload />
        </div>
      </div>
      <TabsContent value="companies" className="min-h-0 min-w-0 flex-1 data-[state=active]:flex data-[state=active]:flex-col">
        <Companies />
      </TabsContent>
      <TabsContent value="products" className="min-h-0 min-w-0 flex-1 data-[state=active]:flex data-[state=active]:flex-col">
        <Products />
      </TabsContent>
    </Tabs>
  );
}

export default TallyTabs;
