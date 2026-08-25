import { Trash2 } from "lucide-react";

import {
  PURCHASE_CREDIT_STOCK_MAX,
  PURCHASE_CREDIT_STOCK_MIN,
} from "@Forms/purchaseCredit/purchaseCredit.validation.constants";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import PurchaseCreditFormField from "@Forms/purchaseCredit/components/purchaseCreditFormField";
import PurchaseCreditRemoteSelect from "@Forms/purchaseCredit/components/purchaseCreditRemoteSelect";

function PurchaseCreditProductFields({
  products,
  supplierSelected,
  productOptions,
  productState,
  availableProductCount,
  productQuery,
  onProductQueryChange,
  formik,
  errorFor,
  inputProps,
  onRemove,
}) {
  const selectedProductValues = new Set(
    products.map((item) => String(item.product || "")).filter(Boolean),
  );

  return (
    <div className="space-y-4">
      {products.map((item, index) => {
        const prefix = `products[${index}]`;
        const productPath = `${prefix}.product`;
        const stockPath = `${prefix}.stock`;
        const selected = productOptions.find(
          (option) => option.value === String(item.product),
        );
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
            <div className="grid gap-5 sm:grid-cols-2">
              <PurchaseCreditFormField
                id={`purchase-credit-product-${index}`}
                label="Product"
                required
                hint={!supplierSelected ? "Select a supplier first." : undefined}
                error={errorFor(productPath)}
              >
                <PurchaseCreditRemoteSelect
                  id={`purchase-credit-product-${index}`}
                  label={`Product ${index + 1}`}
                  value={String(item.product ?? "")}
                  selectedLabel={
                    selected?.label || (item.product ? "Selected product" : "")
                  }
                  placeholder="Search and select a product"
                  searchPlaceholder="Search active products"
                  query={productQuery}
                  disabled={!supplierSelected || availableProductCount === 0}
                  onQueryChange={onProductQueryChange}
                  options={availableOptions}
                  isLoading={productState.isLoading}
                  error={productState.error}
                  fieldError={errorFor(productPath)}
                  onSelect={(option) => {
                    formik.setFieldValue(productPath, option.value, true);
                    onProductQueryChange("");
                  }}
                  onBlur={() => formik.setFieldTouched(productPath, true, true)}
                />
              </PurchaseCreditFormField>
              <PurchaseCreditFormField
                id={`purchase-credit-stock-${index}`}
                label="Stock"
                required
                error={errorFor(stockPath)}
              >
                <Input
                  id={`purchase-credit-stock-${index}`}
                  type="number"
                  min={PURCHASE_CREDIT_STOCK_MIN}
                  max={PURCHASE_CREDIT_STOCK_MAX}
                  step="1"
                  inputMode="numeric"
                  placeholder="e.g. 12"
                  {...inputProps(stockPath, `purchase-credit-stock-${index}`)}
                />
              </PurchaseCreditFormField>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PurchaseCreditProductFields;
