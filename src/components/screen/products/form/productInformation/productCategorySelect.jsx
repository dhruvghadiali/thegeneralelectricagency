import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import _ from "lodash";

import { Button } from "@shadcnComponent/button";
import { PRODUCT_CATEGORY_OPTIONS } from "@Enums";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";

function ProductCategorySelect({ formik, error }) {
  const [open, setOpen] = useState(false);
  const selectedCategory = _.find(PRODUCT_CATEGORY_OPTIONS, {
    value: formik.values.category,
  });

  const toggleCategory = (category) => {
    const isSelected = formik.values.category === category.value;

    formik.setFieldValue("category", isSelected ? "" : category.value, true);
    formik.setFieldTouched("category", true, false);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) formik.setFieldTouched("category", true, true);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id="product-category"
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "product-category-error" : undefined}
          className="w-full justify-between font-normal aria-invalid:border-destructive aria-invalid:ring-destructive/20"
        >
          <span
            className={
              selectedCategory ? "truncate" : "truncate text-muted-foreground"
            }
          >
            {selectedCategory?.label ?? "Select a category"}
          </span>
          <ChevronsUpDown
            className="size-4 shrink-0 opacity-50"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-1"
      >
        {PRODUCT_CATEGORY_OPTIONS.map((option) => (
          <Button
            key={option.value}
            type="button"
            variant="ghost"
            role="option"
            aria-selected={formik.values.category === option.value}
            onClick={() => toggleCategory(option)}
            className="h-auto w-full justify-start gap-2 px-3 py-2.5 text-left font-normal"
          >
            <Check
              className={`size-4 shrink-0 ${
                formik.values.category === option.value
                  ? "opacity-100"
                  : "opacity-0"
              }`}
              aria-hidden="true"
            />
            <span className="truncate">{option.label}</span>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default ProductCategorySelect;
