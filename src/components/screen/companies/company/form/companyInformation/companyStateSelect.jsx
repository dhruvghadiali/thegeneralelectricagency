import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";

import { INDIAN_STATE_AND_UNION_TERRITORY_OPTIONS } from "@Enums";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";

function CompanyStateSelect({ formik, error }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();
  const value = formik.values.state;
  const normalizedValue = value.trim().toLowerCase();
  const options = useMemo(
    () => {
      const matchingOptions = normalizedSearch
        ? INDIAN_STATE_AND_UNION_TERRITORY_OPTIONS.filter((option) =>
            option.label.toLowerCase().includes(normalizedSearch),
          )
        : INDIAN_STATE_AND_UNION_TERRITORY_OPTIONS;
      const selectedOption = INDIAN_STATE_AND_UNION_TERRITORY_OPTIONS.find(
        (option) => option.value.toLowerCase() === normalizedValue,
      );

      return selectedOption
        ? [
            selectedOption,
            ...matchingOptions.filter(
              (option) => option.value !== selectedOption.value,
            ),
          ]
        : matchingOptions;
    },
    [normalizedSearch, normalizedValue],
  );

  const toggleState = (option) => {
    formik.setFieldValue(
      "state",
      option.value.toLowerCase() === normalizedValue ? "" : option.value,
      true,
    );
    formik.setFieldTouched("state", true, false);
    setSearch("");
    setOpen(false);
  };

  return (
      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) {
            setSearch("");
            formik.setFieldTouched("state", true, true);
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id="company-state"
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "company-state-error" : undefined}
            className="w-full min-w-0 justify-between font-normal aria-invalid:border-destructive aria-invalid:ring-destructive/20"
          >
            <span className={value ? "truncate" : "truncate text-muted-foreground"}>
              {value || "Select state or union territory"}
            </span>
            <ChevronsUpDown
              className="size-4 shrink-0 opacity-50"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="flex max-h-[min(24rem,var(--radix-popover-content-available-height))] w-[var(--radix-popover-trigger-width)] flex-col overflow-hidden p-0"
        >
          <div className="shrink-0 border-b p-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => event.stopPropagation()}
                placeholder="Search state or union territory..."
                aria-label="Search state or union territory"
                className="pl-9"
                autoComplete="off"
                autoFocus
              />
            </div>
          </div>

          <div
            role="listbox"
            className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain p-1 [scrollbar-gutter:stable]"
            onWheelCapture={(event) => event.stopPropagation()}
          >
            {options.length > 0 ? (
              options.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant="ghost"
                  role="option"
                  aria-selected={
                    option.value.toLowerCase() === normalizedValue
                  }
                  onClick={() => toggleState(option)}
                  className="h-auto w-full justify-start gap-2 px-3 py-2 text-left font-normal"
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
              ))
            ) : (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                No state or union territory found.
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
  );
}

export default CompanyStateSelect;
