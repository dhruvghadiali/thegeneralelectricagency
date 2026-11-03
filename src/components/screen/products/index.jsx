import ProductHeader from "@screenComponent/products/header/productHeader";
import ProductTable from "@screenComponent/products/table";

function Products() {
  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <ProductHeader />
      <ProductTable />
    </main>
  );
}

export default Products;
