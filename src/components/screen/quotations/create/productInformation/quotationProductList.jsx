import { Card, CardContent, CardHeader, CardTitle } from "@shadcnComponent/card";

function QuotationProductList() {
  return (
    <Card className="min-h-[32rem] w-full overflow-hidden lg:h-full lg:min-h-0">
      <CardHeader className="border-b">
        <CardTitle>Product list</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Product list</p>
      </CardContent>
    </Card>
  );
}

export default QuotationProductList;
