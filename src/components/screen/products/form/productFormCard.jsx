import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

import ProductFormTabs from "@screenComponent/products/form/tab";

function ProductFormCard() {
  return (
    <Card className="shadow-none">
      <CardHeader className="border-b">
        <CardTitle>Product details</CardTitle>
        <CardDescription>Review the product information below.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductFormTabs />
      </CardContent>
    </Card>
  );
}

export default ProductFormCard;
