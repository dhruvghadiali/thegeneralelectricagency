import ProductsTabs from "@Tally/pages/products/tabs";

function ProductsScreen() {
  return (
    <main className="flex min-w-0 w-full flex-col gap-4 roomy:h-full roomy:min-h-0">
      <ProductsTabs />
    </main>
  );
}

export default ProductsScreen;
