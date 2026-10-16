import { useState } from "react";
import _ from "lodash";
import { Check, ChevronsUpDown, Loader2, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";

function HighlightedOptionLabel({ label, search }) {
  const normalizedSearch = _.trim(search);

  if (!normalizedSearch) return _.toUpper(label);

  const expression = new RegExp(`(${_.escapeRegExp(normalizedSearch)})`, "ig");

  return _.toUpper(label)
    .split(expression)
    .map((part, index) =>
      _.toLower(part) === _.toLower(normalizedSearch) ? (
        <mark
          key={`${part}-${index}`}
          className="rounded-sm bg-primary/15 px-0.5 text-inherit"
        >
          {part}
        </mark>
      ) : (
        part
      ),
    );
}

function QuotationSearchableSelect({
  id,
  value,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  options,
  selectedId,
  search,
  isLoading,
  isLoadingMore,
  error,
  hasMore,
  onOpenChange,
  onSearchChange,
  onSelect,
  onClear,
  onRetry,
  onLoadMore,
}) {
  const [open, setOpen] = useState(false);
  const changeOpen = (nextOpen) => {
    setOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <div className="lg:hidden">
      <Popover open={open} onOpenChange={changeOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
          >
            <span
              className={cn(
                "truncate",
                value ? "uppercase" : "text-muted-foreground",
              )}
            >
              {value || placeholder}
            </span>
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) p-0 lg:hidden"
        >
          <div className="border-b p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="pl-9"
                autoComplete="off"
                autoFocus
              />
            </div>
          </div>

          {value && (
            <div className="border-b p-1">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  onClear();
                  changeOpen(false);
                }}
                className="w-full justify-start gap-2 text-muted-foreground"
              >
                <X className="size-4" />
                Clear selection
              </Button>
            </div>
          )}

          <div
            role="listbox"
            className="max-h-64 overscroll-contain overflow-y-auto p-1"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Searching...
              </div>
            ) : error && options.length === 0 ? (
              <div className="grid justify-items-center gap-2 px-3 py-6 text-center">
                <p className="text-sm text-destructive">{error}</p>
                <Button type="button" variant="outline" size="sm" onClick={onRetry}>
                  Try again
                </Button>
              </div>
            ) : options.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </p>
            ) : (
              options.map((option, index) => {
                const optionId = option.id ?? `${option.name}-${index}`;
                const isSelected =
                  selectedId !== null &&
                  selectedId !== undefined &&
                  option.id !== null &&
                  option.id !== undefined &&
                  String(selectedId) === String(option.id);

                return (
                  <Button
                    key={optionId}
                    type="button"
                    variant="ghost"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      onSelect(option, isSelected);
                      changeOpen(false);
                    }}
                    className="h-auto w-full justify-start gap-2 px-3 py-2.5 text-left font-normal aria-selected:bg-accent"
                  >
                    <Check
                      className={cn(
                        "size-4 shrink-0",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="min-w-0 truncate font-medium">
                      <HighlightedOptionLabel
                        label={option.name || "Unnamed option"}
                        search={search}
                      />
                    </span>
                  </Button>
                );
              })
            )}
          </div>

          {hasMore && (
            <div className="border-t p-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isLoadingMore}
                onClick={onLoadMore}
                className="w-full"
              >
                {isLoadingMore && <Loader2 className="size-4 animate-spin" />}
                {isLoadingMore ? "Loading..." : "Load more"}
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default QuotationSearchableSelect;
