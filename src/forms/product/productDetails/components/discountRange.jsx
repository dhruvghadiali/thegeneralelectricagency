import { Input } from "@shadcnComponent/input";
import {
  PRODUCT_DISCOUNT_AMOUNT_MAX,
  PRODUCT_DISCOUNT_PERCENTAGE_MAX,
} from "@Forms/product/productDetails/productDetails.validation.constants";

import MoneyInput from "@Forms/product/productDetails/components/moneyInput";
import ProductFormField from "@Forms/product/productDetails/components/productFormField";

const DISCOUNT_BOUNDARIES = [
  ["Min", "Minimum"],
  ["Max", "Maximum"],
];

function DiscountRange({
  type,
  title,
  fieldError,
  inputProps,
  updateCommercialValues,
}) {
  const isAmount = type === "amount";
  const fieldPrefix = isAmount ? "discountAmount" : "discountPercentage";
  const idPrefix = isAmount
    ? "product-discount-amount"
    : "product-discount-percentage";

  return (
    <div className="rounded-lg border p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {DISCOUNT_BOUNDARIES.map(([boundary, label]) => {
          const field = `${fieldPrefix}${boundary}`;
          const id = `${idPrefix}-${boundary.toLowerCase()}`;
          const handleChange = (event) =>
            updateCommercialValues(field, event.target.value);

          return (
            <ProductFormField
              key={field}
              id={id}
              label={label}
              error={fieldError(field)}
            >
              {isAmount ? (
                <MoneyInput
                  id={id}
                  field={field}
                  max={PRODUCT_DISCOUNT_AMOUNT_MAX}
                  inputProps={inputProps}
                  onChange={handleChange}
                />
              ) : (
                <div className="relative">
                  <Input
                    id={id}
                    type="number"
                    min="0"
                    max={PRODUCT_DISCOUNT_PERCENTAGE_MAX}
                    step="0.01"
                    inputMode="decimal"
                    {...inputProps(field, id)}
                    onChange={handleChange}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    %
                  </span>
                </div>
              )}
            </ProductFormField>
          );
        })}
      </div>
    </div>
  );
}

export default DiscountRange;
