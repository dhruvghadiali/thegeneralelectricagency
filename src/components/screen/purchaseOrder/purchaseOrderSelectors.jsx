import { useMemo, useState } from "react";
import {
  Check,
  ChevronsUpDown,
  LoaderCircle,
  Search,
} from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";

export function SearchableApiSelect({
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
  onSelect,
  onBlur,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) onBlur();
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
          <span
            className={
              selectedLabel ? "truncate" : "truncate text-muted-foreground"
            }
          >
            {selectedLabel || placeholder}
          </span>
          <ChevronsUpDown
            className="size-4 shrink-0 opacity-50"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <div className="flex items-center gap-2 border-b px-3">
          <Search
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className="border-0 px-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="max-h-64 overflow-y-auto p-1">
          {isLoading && (
            <div className="flex items-center justify-center gap-2 px-3 py-6 text-sm text-muted-foreground">
              <LoaderCircle
                className="size-4 animate-spin"
                aria-hidden="true"
              />
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
                onClick={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-left text-sm hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
              >
                <Check
                  className={`size-4 shrink-0 ${
                    value === option.value ? "opacity-100" : "opacity-0"
                  }`}
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

export function StockMultiSelect({
  stocks,
  selected,
  query,
  disabled = false,
  onQueryChange,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const matchingStocks = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return stocks;

    return stocks.filter((stock) =>
      [stock.productName, stock.sku, stock.model]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(needle)),
    );
  }, [query, stocks]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="purchase-stocks"
          type="button"
          variant="outline"
          disabled={disabled}
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-transparent font-normal"
        >
          <span
            className={
              selected.length ? "truncate" : "truncate text-muted-foreground"
            }
          >
            {selected.length
              ? `${selected.length} stock ${
                  selected.length === 1 ? "record" : "records"
                } selected`
              : "Select stock records"}
          </span>
          <ChevronsUpDown
            className="size-4 shrink-0 opacity-50"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <div className="flex items-center gap-2 border-b px-3">
          <Search
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search stock by product, SKU, or model"
            aria-label="Search stock"
            className="border-0 px-0 shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="max-h-64 overflow-y-auto p-1">
          {matchingStocks.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              No matching stock records.
            </p>
          )}
          {matchingStocks.map((stock) => {
            const stockId = String(stock.id);
            const isSelected = selected.includes(stockId);

            return (
              <button
                key={stockId}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() =>
                  onChange(
                    isSelected
                      ? selected.filter((id) => id !== stockId)
                      : [...selected, stockId],
                  )
                }
                className="flex w-full items-start gap-2 rounded-sm px-2 py-2 text-left hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
              >
                <Check
                  className={`mt-0.5 size-4 shrink-0 ${
                    isSelected ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {stock.productName}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {stock.sku} · {stock.availableQuantity} {stock.unit} available
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
