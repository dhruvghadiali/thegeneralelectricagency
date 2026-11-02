import { X } from "lucide-react";

import { PRODUCT_CATEGORY_OPTIONS } from "@Enums";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

const CLEAR_CATEGORY_VALUE = "clear-category-selection";

function ProductCategorySelect({ formik, error }) {
  return (
    <Select
      value={formik.values.category || ""}
      onValueChange={(value) =>
        formik.setFieldValue(
          "category",
          value === CLEAR_CATEGORY_VALUE ? "" : value,
          true,
        )
      }
      onOpenChange={(open) =>
        !open && formik.setFieldTouched("category", true, true)
      }
    >
      <SelectTrigger
        id="product-category"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "product-category-error" : undefined}
        className="w-full aria-invalid:border-destructive aria-invalid:ring-destructive/20"
      >
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {formik.values.category && (
          <SelectItem value={CLEAR_CATEGORY_VALUE}>
            <span className="flex items-center gap-2 text-muted-foreground">
              <X className="size-3.5" aria-hidden="true" />
              Clear selection
            </span>
          </SelectItem>
        )}
        {PRODUCT_CATEGORY_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ProductCategorySelect;
