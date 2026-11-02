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
    <Card className="min-h-0 w-full flex-1 gap-0 overflow-hidden py-0 shadow-none">
      <CardHeader className="border-b px-4 py-5 sm:px-6 sm:py-6">
        <CardTitle>Product details</CardTitle>
        <CardDescription>Review the product information below.</CardDescription>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
        <ProductFormTabs />
      </CardContent>
    </Card>
  );
}

export default ProductFormCard;
