import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { SORT_ORDERS } from "@Enums";
import { TableHead } from "@commonComponent/appTable";
import {
  isFilterableColumn,
  isSortableColumn,
  nextSortState,
  normalizeSort,
} from "@/utils/dataTable.util";

import DataTableColumnFilterPopover from "@commonComponent/dataTable/dataTableColumnFilterPopover";

const SORT_ICONS = {
  [SORT_ORDERS.ASC]: ArrowUp,
  [SORT_ORDERS.DESC]: ArrowDown,
};

/**
 * One column heading: the label (a sort button where the column allows it) on
 * the left, and the filter icon pinned to the right edge.
 *
 * The label is only a button when the column can actually be sorted, so an
 * unsortable heading does not invite a click that does nothing.
 */
function DataTableSortHeader({ column, sort, columnFilters, onSortChange, onColumnFilterChange }) {
  const isSortable = isSortableColumn(column);
  const sorts = normalizeSort(sort);
  const sortIndex = isSortable ? sorts.findIndex(({ field }) => field === column.sortKey) : -1;
  const activeSort = sortIndex >= 0 ? sorts[sortIndex] : null;
  const isSorted = Boolean(activeSort);
  const Icon = (activeSort && SORT_ICONS[activeSort.order]) || ChevronsUpDown;

  const label = isSortable ? (
    <button
      type="button"
      onClick={(event) =>
        onSortChange(
          nextSortState(sort, column.sortKey, { multi: event.shiftKey }),
        )
      }
      title={`Sort by ${column.header}. Shift-click to add a secondary sort.`}
      className={cn(
        "-mx-1.5 inline-flex min-w-0 items-center gap-1.5 rounded px-1.5 py-1 transition-colors",
        "hover:text-foreground focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none",
        isSorted && "text-foreground",
      )}
    >
      <span className="truncate">{column.header}</span>
      <Icon
        className={cn("size-3.5 shrink-0", !isSorted && "opacity-40")}
        aria-hidden="true"
      />
      {isSorted && sorts.length > 1 && (
        <span className="bg-primary/10 text-primary inline-flex size-4 items-center justify-center rounded-full text-[10px] font-semibold">
          {sortIndex + 1}
        </span>
      )}
    </button>
  ) : (
    <span className="truncate">{column.header}</span>
  );

  return (
    <TableHead
      className={cn("whitespace-nowrap", column.headerClassName)}
      style={
        column.width == null
          ? undefined
          : { width: column.width, minWidth: column.width }
      }
      aria-sort={
        isSorted
          ? activeSort.order === SORT_ORDERS.ASC
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      <div className="inline-flex max-w-full items-center gap-1">
        {label}
        {isFilterableColumn(column) && (
          <DataTableColumnFilterPopover
            column={column}
            value={columnFilters?.[column.filterKey]}
            onChange={(value, options) =>
              onColumnFilterChange(column.filterKey, value, options)
            }
          />
        )}
      </div>
    </TableHead>
  );
}

export default DataTableSortHeader;
