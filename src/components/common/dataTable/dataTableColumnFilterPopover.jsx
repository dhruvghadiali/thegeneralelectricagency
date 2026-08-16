import _ from "lodash";
import { Filter, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@shadcnComponent/button";
import { COLUMN_TYPES } from "@Enums";
import { emptyFilterValue, isFilterActive, isRangeColumn } from "@/utils/dataTable.util";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcnComponent/popover";

import DataTableColumnFilter from "@commonComponent/dataTable/dataTableColumnFilter";

/**
 * A range filter is two controls and a separator, so it needs more room than
 * the popover's default width; a select needs less than a date picker.
 */
const POPOVER_WIDTH = {
  RANGE: "w-[320px]",
  DEFAULT: "w-64",
};

/**
 * The filter affordance that sits at the right edge of a column heading: an
 * icon that opens this column's control.
 *
 * Keeping the control behind an icon is what lets ten columns each have a
 * filter without the header turning into a wall of inputs - the heading row
 * stays readable, and the filter is still exactly where you would look for
 * it. An icon that is filled rather than outlined means that column is
 * currently narrowing the results.
 */
function DataTableColumnFilterPopover({ column, value, onChange }) {
  const filterLabel = column.filterLabel ?? column.header;
  const isActive = isFilterActive(value);
  const isRange = isRangeColumn(column.type);

  const clearColumn = () =>
    onChange(emptyFilterValue(column.type), { immediate: true });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={
            isActive
              ? `Filter by ${_.toLower(filterLabel)} (active)`
              : `Filter by ${_.toLower(filterLabel)}`
          }
          title={`Filter by ${_.toLower(filterLabel)}`}
          className={cn(
            "relative inline-flex size-6 shrink-0 items-center justify-center rounded",
            "text-muted-foreground/60 transition-colors outline-none",
            "hover:bg-muted hover:text-foreground",
            "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "data-[state=open]:bg-muted data-[state=open]:text-foreground",
            isActive && "text-primary hover:text-primary",
          )}
        >
          <Filter
            className="size-3.5"
            // A filled glyph reads as "on" at this size far better than a
            // colour change alone.
            fill={isActive ? "currentColor" : "none"}
            aria-hidden="true"
          />
          {isActive && (
            <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-primary" />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className={cn("p-3", isRange ? POPOVER_WIDTH.RANGE : POPOVER_WIDTH.DEFAULT)}
      >
        <div className="mb-2 flex items-center justify-between gap-2">
          <p className="text-xs font-medium">
            {column.type === COLUMN_TYPES.SELECT ? filterLabel : `Filter by ${filterLabel}`}
          </p>
          {isActive && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearColumn}
              className="-mr-1.5 h-6 px-1.5 text-xs text-muted-foreground"
            >
              <X className="size-3" />
              Clear
            </Button>
          )}
        </div>

        <DataTableColumnFilter
          compact
          column={column}
          value={value}
          onChange={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DataTableColumnFilterPopover;
