import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { SORT_ORDERS } from "@Enums";
import { TableHead } from "@/components/ui/table";
import {
  isFilterableColumn,
  isSortableColumn,
  nextSortState,
} from "@/utils/dataTable.util";

import DataTableColumnFilterPopover from "@/components/common/dataTable/dataTableColumnFilterPopover";

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
  const isSorted = isSortable && sort?.field === column.sortKey;
  const Icon = (isSorted && SORT_ICONS[sort.order]) || ChevronsUpDown;

  const label = isSortable ? (
    <button
      type="button"
      onClick={() => onSortChange(nextSortState(sort, column.sortKey))}
      title={`Sort by ${column.header}`}
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
    </button>
  ) : (
    <span className="truncate">{column.header}</span>
  );

  return (
    <TableHead
      className={cn("whitespace-nowrap", column.headerClassName)}
      aria-sort={
        isSorted
          ? sort.order === SORT_ORDERS.ASC
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      <div className="flex items-center justify-between gap-1">
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
