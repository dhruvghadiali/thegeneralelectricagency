import { ChevronLeft, ChevronRight } from "lucide-react";
import _ from "lodash";

import { Button } from "@shadcnComponent/button";
import { TABLE_PAGE_SIZE_OPTIONS } from "@Enums";
import { PAGINATION_ELLIPSIS } from "@/utils/pagination.util";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

/**
 * Server-driven pager: `pageItems` arrives already collapsed with ellipses,
 * so this only renders it and reports the page the user picked.
 */
function DataTablePagination({
  pagination,
  pageItems,
  rowRange,
  isLoading,
  onPageChange,
  onLimitChange,
  rowNoun = "rows",
}) {
  const { page, limit, total, totalPages } = pagination;
  const hasRenderedRows = rowRange.to > 0;
  const displayedTotal = rowRange.total || total;

  const rangeMessage = isLoading && !hasRenderedRows
    ? `Loading ${rowNoun}…`
    : hasRenderedRows
      ? `Showing ${rowRange.from} to ${rowRange.to} of ${displayedTotal} ${rowNoun}`
      : `No ${rowNoun} to show`;

  return (
    <div className="flex shrink-0 flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
        <span aria-live="polite">{rangeMessage}</span>
        <span className="flex items-center gap-2">
          <span>Rows per page</span>
          <Select
            value={String(limit)}
            onValueChange={(value) => onLimitChange(Number(value))}
          >
            <SelectTrigger className="h-8 w-[72px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {_.map(TABLE_PAGE_SIZE_OPTIONS, (size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </span>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={page <= 1 || isLoading}
            onClick={() => onPageChange(page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="size-4" />
          </Button>

          {_.map(pageItems, (item, index) =>
            item === PAGINATION_ELLIPSIS ? (
              <span
                key={`${PAGINATION_ELLIPSIS}-${index}`}
                className="px-1.5 text-sm text-muted-foreground"
                aria-hidden="true"
              >
                &hellip;
              </span>
            ) : (
              <Button
                key={item}
                variant={item === page ? "default" : "outline"}
                size="icon"
                className="size-8 text-xs"
                disabled={isLoading}
                aria-current={item === page ? "page" : undefined}
                aria-label={`Page ${item}`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </Button>
            ),
          )}

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            disabled={page >= totalPages || isLoading}
            onClick={() => onPageChange(page + 1)}
            aria-label="Next page"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default DataTablePagination;
