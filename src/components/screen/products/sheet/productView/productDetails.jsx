import ProductDetail from "@screenComponent/products/sheet/productView/productDetail";

import { displayProductValue } from "@screenComponent/products/sheet/productView/productView.utils";

function ProductDetails({ product }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      <ProductDetail
        label="Category"
        value={displayProductValue(product.category)}
      />
      <ProductDetail
        label="HSN code"
        value={displayProductValue(product.hsnCode)}
      />
      <ProductDetail
        label="Product code"
        value={displayProductValue(product.productCode)}
      />
      <ProductDetail
        label="Model number"
        value={displayProductValue(product.modelNumber)}
      />
      <ProductDetail
        label="Description"
        value={displayProductValue(product.description)}
        className="sm:col-span-2"
      />
    </dl>
  );
}

export default ProductDetails;
