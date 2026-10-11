import { Check, ChevronsUpDown, Search } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";
import { COMPANY_DETAILS_STATE_OPTIONS } from "@Forms/company/companyDetails/companyDetails.options";

const capitalizeFirstCharacter = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;

function CompanyStateSelect({
  id,
  value,
  error,
  disabled,
  open,
  search,
  onOpenChange,
  onSearchChange,
  onValueChange,
}) {
  const normalizedSearch = search.trim().toLowerCase();
  const options = normalizedSearch
    ? COMPANY_DETAILS_STATE_OPTIONS.filter((option) =>
        option.label.toLowerCase().includes(normalizedSearch),
      )
    : COMPANY_DETAILS_STATE_OPTIONS;

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          disabled={disabled}
          className="w-full min-w-0 justify-between bg-background font-normal aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
        >
          <span className={value ? "truncate" : "truncate text-muted-foreground"}>
            {value || "Select state or union territory"}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <div className="flex items-center gap-2 border-b px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) =>
              onSearchChange(capitalizeFirstCharacter(event.target.value))
            }
            onKeyDown={(event) => event.stopPropagation()}
            placeholder="Search state or union territory..."
            aria-label="Search state or union territory"
            className="border-0 px-0 shadow-none focus-visible:ring-0"
            autoFocus
          />
        </div>
        <div className="max-h-64 overflow-y-auto p-1">
          {options.length > 0 ? (
            options.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant="ghost"
                role="option"
                aria-selected={value === option.value}
                onClick={() => onValueChange(option.value)}
                className="h-auto w-full justify-start gap-2 px-3 py-2 text-left font-normal"
              >
                <Check
                  className={`size-4 shrink-0 ${value === option.value ? "opacity-100" : "opacity-0"}`}
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
