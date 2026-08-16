import _ from "lodash";
import { Inbox, RotateCw, TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@shadcnComponent/button";

/**
 * Placeholder rows sized to the real table, shown only on the first load -
 * once rows exist, refetches dim the table instead so the layout does not
 * jump on every keystroke.
 */
export function DataTableSkeleton({ rows = 5 }) {
  return (
    <div className="divide-y" aria-hidden="true">
      {_.map(_.range(rows), (row) => (
        <div key={row} className="flex items-center gap-4 p-4">
          <span className="size-9 shrink-0 animate-pulse rounded-full bg-muted" />
          <span className="h-3 w-1/4 animate-pulse rounded bg-muted" />
          <span className="hidden h-3 w-1/5 animate-pulse rounded bg-muted md:block" />
          <span className="hidden h-3 w-1/6 animate-pulse rounded bg-muted md:block" />
          <span className="ml-auto h-3 w-16 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

/**
 * "Nothing here yet" and "nothing matched" are different problems, so they get
 * different copy - one asks you to add something, the other to loosen a filter.
 */
export function DataTableEmptyState({
  icon,
  isFiltered,
  title,
  description,
  filteredDescription,
  onClearFilters,
  fillHeight = false,
}) {
  const Icon = icon ?? Inbox;

  return (
    <div
      className={cn(
        "px-4 py-14 text-center",
        fillHeight &&
          "roomy:flex roomy:min-h-[240px] roomy:flex-1 roomy:flex-col roomy:items-center roomy:justify-center",
      )}
    >
      <Icon className="mx-auto size-8 text-muted-foreground/50" />
      <p className="mt-3 font-medium">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">
        {isFiltered ? filteredDescription : description}
      </p>
      {isFiltered && onClearFilters && (
        <Button variant="outline" onClick={onClearFilters} className="mt-4">
          Clear filters
        </Button>
      )}
    </div>
  );
}

/**
 * A failed request is recoverable, so this offers the retry rather than
 * leaving the user to reload the page.
 */
export function DataTableError({ message, onRetry, fillHeight = false }) {
  return (
    <div
      className={cn(
        "px-4 py-14 text-center",
        fillHeight &&
          "roomy:flex roomy:min-h-[240px] roomy:flex-1 roomy:flex-col roomy:items-center roomy:justify-center",
      )}
    >
      <TriangleAlert className="mx-auto size-8 text-destructive/70" />
      <p className="mt-3 font-medium">Could not load this list</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry} className="mt-4">
          <RotateCw className="size-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
