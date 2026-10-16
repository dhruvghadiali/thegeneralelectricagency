import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";
import ProductDirectoryFooter from "@screenComponent/quotations/form/productInformation/productDirectory/productDirectoryFooter";
import ProductDirectoryList from "@screenComponent/quotations/form/productInformation/productDirectory/productDirectoryList";
import ProductDirectoryStatus from "@screenComponent/quotations/form/productInformation/productDirectory/productDirectoryStatus";
import useQuotationProductDirectory from "@screenComponent/quotations/form/productInformation/productDirectory/useQuotationProductDirectory";

function QuotationProductDirectory({
  directoryRef,
  onProductSelect,
  onProductOptionKeyDown,
}) {
  const directory = useQuotationProductDirectory();
  const isEmpty = directory.products.length === 0;

  return (
    <Card
      ref={directoryRef}
      className="hidden min-h-[32rem] w-full gap-0 overflow-hidden pb-0 lg:flex lg:h-full lg:min-h-0"
    >
      <CardHeader className="shrink-0 border-b">
        <CardTitle>Product directory</CardTitle>
        <CardDescription>{directory.productCountLabel}</CardDescription>
      </CardHeader>

      <CardContent
        className="min-h-0 flex-1 overflow-y-auto px-0"
        aria-live="polite"
      >
        <ProductDirectoryStatus
          isLoading={directory.isLoading}
          error={directory.error}
          isEmpty={isEmpty}
          onRetry={() => directory.loadProducts()}
        />

        {!directory.isLoading && !isEmpty && (
          <>
            <ProductDirectoryList
              products={directory.products}
              productSearch={directory.productSearch}
              selectedProduct={directory.selectedProduct}
              onProductSelect={onProductSelect}
              onProductOptionKeyDown={onProductOptionKeyDown}
            />
            <ProductDirectoryFooter
              pagination={directory.pagination}
              error={directory.error}
              hasMoreProducts={directory.hasMoreProducts}
              isLoadingMore={directory.isLoadingMore}
              onLoadMore={() =>
                directory.loadProducts(directory.pagination.page + 1)
              }
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default QuotationProductDirectory;
