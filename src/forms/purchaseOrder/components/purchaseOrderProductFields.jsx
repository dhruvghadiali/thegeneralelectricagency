import { ChevronDown, LoaderCircle, Trash2 } from "lucide-react";

import { INDIAN_GST_OPTIONS } from "@Enums";
import { PURCHASE_PRODUCT_NOTES_MAX_LENGTH } from "@Forms/purchaseOrder/purchaseOrder.validation.constants";
import PurchaseOrderFormField from "@Forms/purchaseOrder/components/purchaseOrderFormField";
import { SearchableApiSelect } from "@Forms/purchaseOrder/components/purchaseOrderSelectors";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";
import { Textarea } from "@shadcnComponent/textarea";

function PurchaseOrderProductFields({
  openProductIndex,
  onOpenProductChange,
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
  onPricingChange,
}) {
  const selectedProductValues = new Set(
    products.map((item) => String(item.product || "")).filter(Boolean),
  );

  return (
    <div className="space-y-4">
      {products.map((item, index) => {
        const isOpen = openProductIndex === index;
        const hasErrors = Object.keys(item).some((field) =>
          errorFor(`products[${index}].${field}`),
        );
        const productPath = `products[${index}].product`;
        const standaloneStockPath = `products[${index}].standaloneStock`;
        const quantityPath = `products[${index}].quantityPurchased`;
        const unitPricePath = `products[${index}].unitPrice`;
        const unitDiscountPath = `products[${index}].unitDiscount`;
        const unitGstPath = `products[${index}].unitGst`;
        const unitGstAmountPath = `products[${index}].unitGstAmount`;
        const finalPricePath = `products[${index}].finalPrice`;
        const notesPath = `products[${index}].notes`;
        const standaloneStockState = getStandaloneStockState(item.product);
        const availableOptions = productOptions.filter(
          (option) =>
            option.value === String(item.product) ||
            !selectedProductValues.has(option.value),
        );

        return (
          <div key={index} className="rounded-xl border bg-muted/10 p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="min-w-0 flex-1">
                <Button
                  type="button"
                  variant="ghost"
                  id={`product-heading-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`product-panel-${index}`}
                  onClick={() => onOpenProductChange(isOpen ? null : index)}
                  className="h-auto w-full justify-between gap-3 whitespace-normal px-0 text-left hover:bg-transparent"
                >
                  <span className="min-w-0">
                    <span className="block font-medium">Product {index + 1}</span>
                    <span className="block truncate text-xs font-normal text-muted-foreground">
                      {selectedLabels[`product-${index}`] || "Select a product"}
                    </span>
                    {hasErrors && <span className="block text-xs text-destructive">Review required fields</span>}
                  </span>
                  <ChevronDown aria-hidden="true" className={`size-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </Button>
              </h3>
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
            <div
              id={`product-panel-${index}`}
              role="region"
              aria-labelledby={`product-heading-${index}`}
              hidden={!isOpen}
              className="mt-4 border-t pt-4"
            >
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
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <PurchaseOrderFormField
                id={`unit-price-${index}`}
                label="Unit price"
                required
                error={errorFor(unitPricePath)}
              >
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    id={`unit-price-${index}`}
                    name={unitPricePath}
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={item.unitPrice}
                    onChange={(event) =>
                      onPricingChange(index, "unitPrice", event.target.value)
                    }
                    onBlur={inputProps(unitPricePath, `unit-price-${index}`).onBlur}
                    aria-invalid={Boolean(errorFor(unitPricePath))}
                    aria-describedby={
                      errorFor(unitPricePath)
                        ? `unit-price-${index}-error`
                        : undefined
                    }
                    className="pl-7"
                  />
                </div>
              </PurchaseOrderFormField>
              <PurchaseOrderFormField
                id={`unit-discount-${index}`}
                label="Unit discount"
                required
                error={errorFor(unitDiscountPath)}
              >
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    ₹
                  </span>
                  <Input
                    id={`unit-discount-${index}`}
                    name={unitDiscountPath}
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={item.unitDiscount}
                    onChange={(event) =>
                      onPricingChange(index, "unitDiscount", event.target.value)
                    }
                    onBlur={
                      inputProps(unitDiscountPath, `unit-discount-${index}`).onBlur
                    }
                    aria-invalid={Boolean(errorFor(unitDiscountPath))}
                    aria-describedby={
                      errorFor(unitDiscountPath)
                        ? `unit-discount-${index}-error`
                        : undefined
                    }
                    className="pl-7"
                  />
                </div>
              </PurchaseOrderFormField>
              <PurchaseOrderFormField
                id={`unit-gst-${index}`}
                label="Unit GST"
                required
                error={errorFor(unitGstPath)}
              >
                <Select
                  value={String(item.unitGst ?? "")}
                  onValueChange={(value) =>
                    onPricingChange(index, "unitGst", value)
                  }
                  onOpenChange={(open) => !open && onProductBlur(unitGstPath)}
                >
                  <SelectTrigger
                    id={`unit-gst-${index}`}
                    aria-invalid={Boolean(errorFor(unitGstPath))}
                    aria-describedby={
                      errorFor(unitGstPath)
                        ? `unit-gst-${index}-error`
                        : undefined
                    }
                  >
                    <SelectValue placeholder="Select GST rate" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_GST_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </PurchaseOrderFormField>
              <PurchaseOrderFormField
                id={`unit-gst-amount-${index}`}
                label="Unit GST amount"
                required
                error={errorFor(unitGstAmountPath)}
              >
                <Input
                  id={`unit-gst-amount-${index}`}
                  type="text"
                  value={item.unitGstAmount}
                  placeholder="Calculated automatically"
                  disabled
                />
              </PurchaseOrderFormField>
              <PurchaseOrderFormField
                id={`final-price-${index}`}
                label="Final price"
                required
                error={errorFor(finalPricePath)}
              >
                <Input
                  id={`final-price-${index}`}
                  type="text"
                  value={item.finalPrice}
                  placeholder="Calculated automatically"
                  disabled
                />
              </PurchaseOrderFormField>
            </div>
            <div className="mt-5">
              <PurchaseOrderFormField
                id={`product-notes-${index}`}
                label="Notes"
                error={errorFor(notesPath)}
              >
                <Textarea
                  id={`product-notes-${index}`}
                  maxLength={PURCHASE_PRODUCT_NOTES_MAX_LENGTH}
                  placeholder="Add notes for this product"
                  {...inputProps(notesPath, `product-notes-${index}`)}
                />
              </PurchaseOrderFormField>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PurchaseOrderProductFields;
