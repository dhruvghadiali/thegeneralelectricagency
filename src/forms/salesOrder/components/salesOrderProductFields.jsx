import { ChevronDown, Trash2 } from "lucide-react";

import PurchaseOrderFormField from "@Forms/purchaseOrder/components/purchaseOrderFormField";
import { SearchableApiSelect } from "@Forms/purchaseOrder/components/purchaseOrderSelectors";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";

function rangeHint(range, { prefix = "", suffix = "" } = {}) {
  if (range?.min == null && range?.max == null) return undefined;

  const minimum = range.min == null ? "—" : `${prefix}${range.min}${suffix}`;
  const maximum = range.max == null ? "—" : `${prefix}${range.max}${suffix}`;
  return `Product range: ${minimum} – ${maximum}`;
}

function formatCurrency(value) {
  const number = Number(value);
  if (value === "" || !Number.isFinite(number)) return "—";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(number);
}

function ProductSummaryMetric({ label, value, className }) {
  return (
    <span className={`rounded-md border px-2.5 py-1.5 ${className}`}>
      <span className="block text-[10px] font-semibold uppercase tracking-wide opacity-70">
        {label}
      </span>
      <span className="mt-0.5 block whitespace-nowrap text-xs font-semibold">
        {value}
      </span>
    </span>
  );
}

function NumericField({
  id,
  label,
  path,
  value,
  error,
  hint,
  prefix,
  suffix,
  step = "0.01",
  disabled,
  onChange,
  onBlur,
}) {
  return (
    <PurchaseOrderFormField
      id={id}
      label={label}
      required
      hint={hint}
      error={error}
    >
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
        <Input
          id={id}
          name={path}
          type="number"
          min="0"
          step={step}
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={
            [prefix ? "pl-7" : "", suffix ? "pr-8" : ""]
              .filter(Boolean)
              .join(" ") || undefined
          }
        />
      </div>
    </PurchaseOrderFormField>
  );
}

function SalesOrderProductFields({
  activeIndex,
  products,
  supplierSelected,
  productOptions,
  productState,
  productQuery,
  selectedLabels,
  errorFor,
  onActiveIndexChange,
  onProductQueryChange,
  onProductBlur,
  onSelect,
  onRemove,
  onFieldChange,
  onFieldBlur,
}) {
  const selectedProductValues = new Set(
    products.map((item) => String(item.product || "")).filter(Boolean),
  );

  return (
    <div className="space-y-4">
      {products.map((item, index) => {
        const isOpen = activeIndex === index;
        const hasErrors = Object.keys(item).some((field) =>
          errorFor(`products[${index}].${field}`),
        );
        const productPath = `products[${index}].product`;
        const purchasePricePath = `products[${index}].purchasePrice`;
        const salePricePath = `products[${index}].salePrice`;
        const gstPercentagePath = `products[${index}].gstPercentage`;
        const discountAmountPath = `products[${index}].discountAmount`;
        const discountPercentagePath = `products[${index}].discountPercentage`;
        const stocksPath = `products[${index}].stocks`;
        const selectedProduct = productState.items.find(
          (product) => String(product.id) === String(item.product),
        );
        const availableOptions = productOptions.filter(
          (option) =>
            option.value === String(item.product) ||
            !selectedProductValues.has(option.value),
        );

        return (
          <div
            key={index}
            className="rounded-xl border bg-muted/10 p-4 sm:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="min-w-0 flex-1">
                <Button
                  type="button"
                  variant="ghost"
                  id={`sales-product-heading-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`sales-product-panel-${index}`}
                  onClick={() => onActiveIndexChange(isOpen ? null : index)}
                  className="h-auto w-full justify-between gap-3 whitespace-normal px-0 text-left hover:bg-transparent"
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <span className="min-w-0">
                      <span className="block font-medium">
                        Product {index + 1}
                      </span>
                      <span className="block truncate text-xs font-normal text-muted-foreground">
                        {selectedLabels[index] || "Select a product"}
                      </span>
                      {hasErrors && (
                        <span className="block text-xs text-destructive">
                          Review required fields
                        </span>
                      )}
                    </span>

                    {item.product && (
                      <span className="flex flex-wrap gap-2 pr-1">
                        <ProductSummaryMetric
                          label="Purchase price"
                          value={formatCurrency(item.purchasePrice)}
                          className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100"
                        />
                        <ProductSummaryMetric
                          label="Sales price"
                          value={formatCurrency(item.salePrice)}
                          className="border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
                        />
                        <ProductSummaryMetric
                          label="Discount"
                          value={`${formatCurrency(item.discountAmount)} · ${
                            item.discountPercentage || "—"
                          }%`}
                          className="border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-100"
                        />
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-4 shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
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
              id={`sales-product-panel-${index}`}
              role="region"
              aria-labelledby={`sales-product-heading-${index}`}
              hidden={!isOpen}
              className="mt-4 border-t pt-4"
            >
              <PurchaseOrderFormField
                id={`sales-product-${index}`}
                label="Product"
                required
                hint={!supplierSelected ? "Select a supplier first." : undefined}
                error={errorFor(productPath)}
              >
                <SearchableApiSelect
                  id={`sales-product-${index}`}
                  label={`Product ${index + 1}`}
                  value={String(item.product ?? "")}
                  selectedLabel={selectedLabels[index]}
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

              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <NumericField
                  id={`sales-purchase-price-${index}`}
                  label="Purchase price"
                  path={purchasePricePath}
                  value={item.purchasePrice}
                  error={errorFor(purchasePricePath)}
                  prefix="₹"
                  disabled={!item.product}
                  onChange={(value) =>
                    onFieldChange(index, "purchasePrice", value)
                  }
                  onBlur={() => onFieldBlur(purchasePricePath)}
                />
                <NumericField
                  id={`sales-sale-price-${index}`}
                  label="Sales price"
                  path={salePricePath}
                  value={item.salePrice}
                  error={errorFor(salePricePath)}
                  prefix="₹"
                  disabled={!item.product}
                  onChange={(value) => onFieldChange(index, "salePrice", value)}
                  onBlur={() => onFieldBlur(salePricePath)}
                />
                <NumericField
                  id={`sales-stocks-${index}`}
                  label="Stocks"
                  path={stocksPath}
                  value={item.stocks}
                  error={errorFor(stocksPath)}
                  step="1"
                  disabled={!item.product}
                  onChange={(value) => onFieldChange(index, "stocks", value)}
                  onBlur={() => onFieldBlur(stocksPath)}
                />
                <NumericField
                  id={`sales-discount-amount-${index}`}
                  label="Discount amount"
                  path={discountAmountPath}
                  value={item.discountAmount}
                  error={errorFor(discountAmountPath)}
                  hint={rangeHint(selectedProduct?.discountAmount, {
                    prefix: "₹",
                  })}
                  prefix="₹"
                  disabled={!item.product}
                  onChange={(value) =>
                    onFieldChange(index, "discountAmount", value)
                  }
                  onBlur={() => onFieldBlur(discountAmountPath)}
                />
                <NumericField
                  id={`sales-discount-percentage-${index}`}
                  label="Discount percentage"
                  path={discountPercentagePath}
                  value={item.discountPercentage}
                  error={errorFor(discountPercentagePath)}
                  hint={rangeHint(selectedProduct?.discountPercentage, {
                    suffix: "%",
                  })}
                  suffix="%"
                  disabled={!item.product}
                  onChange={(value) =>
                    onFieldChange(index, "discountPercentage", value)
                  }
                  onBlur={() => onFieldBlur(discountPercentagePath)}
                />
                <NumericField
                  id={`sales-gst-percentage-${index}`}
                  label="GST percentage"
                  path={gstPercentagePath}
                  value={item.gstPercentage}
                  error={errorFor(gstPercentagePath)}
                  suffix="%"
                  disabled={!item.product}
                  onChange={(value) =>
                    onFieldChange(index, "gstPercentage", value)
                  }
                  onBlur={() => onFieldBlur(gstPercentagePath)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SalesOrderProductFields;
