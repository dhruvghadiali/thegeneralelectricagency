import { useRef, useState } from "react";
import { Check, ChevronsUpDown, LoaderCircle, Search } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";

function PurchaseCreditRemoteSelect({
  id,
  label,
  value,
  selectedLabel,
  placeholder,
  searchPlaceholder,
  query,
  disabled = false,
  onQueryChange,
  options,
  isLoading,
  error,
  fieldError,
  allowClear = false,
  onSelect,
  onBlur,
}) {
  const [open, setOpen] = useState(false);
  const searchInputRef = useRef(null);

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen && allowClear && value && selectedLabel) {
          onQueryChange(selectedLabel);
        }

        setOpen(nextOpen);
        if (!nextOpen) onBlur?.();
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          role="combobox"
          aria-label={label}
          aria-expanded={open}
          aria-invalid={Boolean(fieldError)}
          aria-describedby={fieldError ? `${id}-error` : undefined}
          className="w-full justify-between bg-transparent font-normal"
        >
          <span className={selectedLabel ? "truncate" : "truncate text-muted-foreground"}>
            {selectedLabel || placeholder}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
        onOpenAutoFocus={(event) => {
          event.preventDefault();

          const searchInput = searchInputRef.current;
          const caretPosition = searchInput?.value.length ?? 0;

          searchInput?.focus();
          searchInput?.setSelectionRange(caretPosition, caretPosition);
        }}
      >
        <div className="flex items-center gap-2 border-b px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <Input
            ref={searchInputRef}
            value={query}
            onChange={(event) => {
              const nextQuery = event.target.value;
              onQueryChange(nextQuery);

              if (allowClear && value && nextQuery === "") {
                onSelect(null);
              }
            }}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="border-0 px-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="max-h-64 overflow-y-auto p-1">
          {isLoading && (
            <div className="flex items-center justify-center gap-2 px-3 py-6 text-sm text-muted-foreground">
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Loading options…
            </div>
          )}
          {!isLoading && error && (
            <p className="px-3 py-4 text-sm text-destructive">{error}</p>
          )}
          {!isLoading && !error && options.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              No matching results.
            </p>
          )}
          {!isLoading &&
            !error &&
            options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={value === option.value}
                aria-label={
                  allowClear && value === option.value
                    ? `Clear ${option.label}`
                    : option.label
                }
                onClick={() => {
                  onSelect(
                    allowClear && value === option.value ? null : option,
                  );
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm hover:bg-accent focus-visible:bg-accent focus-visible:outline-none aria-selected:bg-accent"
              >
                <Check
                  className={`size-4 shrink-0 ${value === option.value ? "opacity-100" : "opacity-0"}`}
                  aria-hidden="true"
                />
                <span className="truncate">{option.label}</span>
              </button>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PurchaseCreditRemoteSelect;
