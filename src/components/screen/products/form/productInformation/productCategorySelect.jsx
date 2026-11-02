import { PRODUCT_CATEGORY_OPTIONS } from "@Enums";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

function ProductCategorySelect({ formik, error }) {
  return (
    <Select
      value={formik.values.category || ""}
      onValueChange={(value) => formik.setFieldValue("category", value, true)}
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
