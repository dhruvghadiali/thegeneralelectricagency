import { Card, CardContent, CardHeader, CardTitle } from "@shadcnComponent/card";

function QuotationProductInformationCard() {
  return (
    <Card className="min-h-64 w-full flex-1">
      <CardHeader className="border-b">
        <CardTitle>Product information</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Product info</p>
      </CardContent>
    </Card>
  );
}

export default QuotationProductInformationCard;
