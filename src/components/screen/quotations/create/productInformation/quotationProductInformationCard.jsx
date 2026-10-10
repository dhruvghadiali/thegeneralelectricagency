import { Card, CardContent, CardHeader, CardTitle } from "@shadcnComponent/card";
import QuotationProductForm from "@screenComponent/quotations/create/productInformation/quotationProductForm";

function QuotationProductInformationCard() {
  return (
    <Card className="min-h-64 w-full flex-1">
      <CardHeader className="border-b">
        <CardTitle>Product information</CardTitle>
      </CardHeader>
      <CardContent>
        <QuotationProductForm />
      </CardContent>
    </Card>
  );
}

export default QuotationProductInformationCard;
