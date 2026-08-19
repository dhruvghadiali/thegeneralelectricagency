import { useRef } from "react";
import { Loader2, Search, SlidersHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@shadcnComponent/badge";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { getFilterableColumns } from "@/utils/dataTable.util";

/**
 * Global search, and the controls that go with it.
 *
 * The per-column filters are not here any more - on desktop they live in the
 * table's filter row, directly under the heading each one belongs to. What is
 * left is the search box, the count of filters currently applied, and the
 * toggle for the mobile filter panel, which only appears where there is no
 * table to put a filter row in.
 */
function DataTableToolbar({
  columns,
  search,
  onSearchChange,
  onSearchSubmit,
  isMobileFilterOpen,
  onToggleMobileFilters,
  activeFilterCount,
  isFiltered,
  onClearFilters,
  isLoading,
  searchPlaceholder,
  actions,
}) {
  const hasFilters = getFilterableColumns(columns).length > 0;
  const searchInputRef = useRef(null);

  const focusSearchInput = () => {
    const input = searchInputRef.current;
    if (!input) return;

    const cursorPosition = input.value.length;
    input.setSelectionRange(cursorPosition, cursorPosition);
  };

  return (
    <div className="flex shrink-0 flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={searchInputRef}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          onFocus={focusSearchInput}
          onKeyDown={(event) => event.key === "Enter" && onSearchSubmit()}
          placeholder={searchPlaceholder}
          className="pl-9 pr-9"
          aria-label={searchPlaceholder}
        />
        {isLoading && Boolean(search) && (
          <Loader2 className="absolute right-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
      </div>

      <div className="flex items-center gap-2">
        {hasFilters && (
          <Button
            variant="outline"
            onClick={onToggleMobileFilters}
            aria-expanded={isMobileFilterOpen}
            className={cn("md:hidden", isMobileFilterOpen && "border-primary")}
          >
            <SlidersHorizontal className="size-4" />
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-0.5 px-1.5">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        )}

        {activeFilterCount > 0 && (
          <span className="hidden text-xs text-muted-foreground md:inline">
            {activeFilterCount} filter{activeFilterCount === 1 ? "" : "s"} applied
          </span>
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="text-muted-foreground"
          >
            <X className="size-4" />
            Clear
          </Button>
        )}

        {actions}
      </div>
    </div>
  );
}

export default DataTableToolbar;
