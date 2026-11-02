import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

import ProductDetailsForm from "@Forms/product/productDetails/productDetailsForm";

function ProductFormCard({ product }) {
  return (
    <Card className="shadow-none">
      <CardHeader className="border-b">
        <CardTitle>Product details</CardTitle>
        <CardDescription>Review the product information below.</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductDetailsForm key={product.id} product={product} />
      </CardContent>
    </Card>
  );
}

export default ProductFormCard;
