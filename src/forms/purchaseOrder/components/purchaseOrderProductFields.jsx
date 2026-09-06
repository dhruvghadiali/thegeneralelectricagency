import { LoaderCircle, Trash2 } from "lucide-react";

import PurchaseOrderFormField from "@Forms/purchaseOrder/components/purchaseOrderFormField";
import { SearchableApiSelect } from "@Forms/purchaseOrder/components/purchaseOrderSelectors";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";

function PurchaseOrderProductFields({
  products,
  supplierSelected,
  productOptions,
  productState,
  productQuery,
  selectedLabels,
  getStandaloneStockState,
  errorFor,
  inputProps,
  onProductQueryChange,
  onProductBlur,
  onSelect,
  onRemove,
}) {
  const selectedProductValues = new Set(
    products.map((item) => String(item.product || "")).filter(Boolean),
  );

  return (
    <div className="space-y-4">
      {products.map((item, index) => {
        const productPath = `products[${index}].product`;
        const standaloneStockPath = `products[${index}].standaloneStock`;
        const quantityPath = `products[${index}].quantityPurchased`;
        const standaloneStockState = getStandaloneStockState(item.product);
        const availableOptions = productOptions.filter(
          (option) =>
            option.value === String(item.product) ||
            !selectedProductValues.has(option.value),
        );

        return (
          <div key={index} className="rounded-xl border bg-muted/10 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="font-medium">Product {index + 1}</p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={products.length === 1}
                aria-label={`Remove product ${index + 1}`}
                onClick={() => onRemove(index)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <PurchaseOrderFormField
                id={`purchase-product-${index}`}
                label="Product"
                required
                hint={!supplierSelected ? "Select a supplier first." : undefined}
                error={errorFor(productPath)}
              >
                <SearchableApiSelect
                  id={`purchase-product-${index}`}
                  label={`Product ${index + 1}`}
                  value={String(item.product ?? "")}
                  selectedLabel={selectedLabels[`product-${index}`]}
                  placeholder="Search and select a product"
                  searchPlaceholder="Search active products"
                  query={productQuery}
                  disabled={!supplierSelected}
                  onQueryChange={onProductQueryChange}
                  options={availableOptions}
                  isLoading={productState.isLoading}
                  error={productState.error}
                  fieldError={errorFor(productPath)}
                  onSelect={(option) => onSelect(index, option)}
                  onBlur={() => onProductBlur(productPath)}
                />
              </PurchaseOrderFormField>
              <PurchaseOrderFormField
                id={`standalone-stock-${index}`}
                label="Standalone stock"
                error={
                  standaloneStockState.error || errorFor(standaloneStockPath)
                }
              >
                <div className="relative">
                  <Input
                    id={`standalone-stock-${index}`}
                    type="text"
                    value={
                      standaloneStockState.isLoading
                        ? "Loading..."
                        : standaloneStockState.count
                    }
                    placeholder={
                      item.product
                        ? "Stock count unavailable"
                        : "Select a product first"
                    }
                    disabled
                    aria-busy={standaloneStockState.isLoading}
                    className={standaloneStockState.isLoading ? "pr-9" : undefined}
                  />
                  {standaloneStockState.isLoading && (
                    <LoaderCircle
                      className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </PurchaseOrderFormField>
              <PurchaseOrderFormField
                id={`quantity-purchased-${index}`}
                label="Quantity purchased"
                required
                error={errorFor(quantityPath)}
              >
                <Input
                  id={`quantity-purchased-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="e.g. 10"
                  {...inputProps(quantityPath, `quantity-purchased-${index}`)}
                />
              </PurchaseOrderFormField>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PurchaseOrderProductFields;
