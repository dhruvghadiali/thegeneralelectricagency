import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { COMPANY_TYPE_OPTIONS } from "@Enums";
import { Button } from "@shadcnComponent/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";

function CompanyTypeSelect({ formik, error }) {
  const [open, setOpen] = useState(false);
  const normalizedValue = formik.values.companyType.trim().toLowerCase();
  const selectedType = COMPANY_TYPE_OPTIONS.find(
    (option) => option.value.toLowerCase() === normalizedValue,
  );

  const toggleType = (option) => {
    const isSelected = option.value.toLowerCase() === normalizedValue;

    formik.setFieldValue("companyType", isSelected ? "" : option.value, true);
    formik.setFieldTouched("companyType", true, false);
    setOpen(false);
  };

  return (
      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) formik.setFieldTouched("companyType", true, true);
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id="company-type"
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "company-type-error" : undefined}
            className="w-full justify-between font-normal aria-invalid:border-destructive aria-invalid:ring-destructive/20"
          >
            <span
              className={
                selectedType ? "truncate" : "truncate text-muted-foreground"
              }
            >
              {selectedType?.label ?? "Select company type"}
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
          {COMPANY_TYPE_OPTIONS.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant="ghost"
              role="option"
              aria-selected={option.value.toLowerCase() === normalizedValue}
              onClick={() => toggleType(option)}
              className="h-auto w-full justify-start gap-2 px-3 py-2.5 text-left font-normal"
            >
              <Check
                className={`size-4 shrink-0 ${
                  option.value.toLowerCase() === normalizedValue
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

export default CompanyTypeSelect;
