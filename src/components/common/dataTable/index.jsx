import { useState } from "react";
import _ from "lodash";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { getVisibleColumns, renderCell } from "@/utils/dataTable.util";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DataTableToolbar from "@/components/common/dataTable/dataTableToolbar";
import DataTableMobileList from "@/components/common/dataTable/dataTableMobileList";
import DataTableSortHeader from "@/components/common/dataTable/dataTableSortHeader";
import DataTablePagination from "@/components/common/dataTable/dataTablePagination";
import DataTableMobileFilters from "@/components/common/dataTable/dataTableMobileFilters";
import {
  DataTableEmptyState,
  DataTableError,
  DataTableSkeleton,
} from "@/components/common/dataTable/dataTableStates";

/**
 * Keeps both scrollbars inside the table's own viewport instead of at the far
 * end of the rows. Without a ceiling, the horizontal scrollbar sits below the
 * last row, so on a long page you have to scroll to the bottom before you can
 * scroll sideways.
 */
const DEFAULT_MAX_BODY_HEIGHT = "70vh";

/**
 * The heading row stays put while the rows move under it.
 *
 * `border-collapse` paints a collapsed border on the table rather than the
 * cell, so a plain `border-b` on a sticky heading is left behind the moment
 * it detaches. An inset shadow belongs to the cell and travels with it.
 */
const STICKY_HEADER_CLASSES = cn(
  "[&_th]:sticky [&_th]:top-0 [&_th]:z-20 [&_th]:bg-card",
  "[&_th]:shadow-[inset_0_-1px_0_0_var(--border)]",
);

/**
 * The shared list surface: search, sortable headings, a per-column filter
 * behind an icon in each heading, a responsive body and server-driven
 * pagination.
 *
 * It is deliberately controlled - every piece of query state is a prop, and
 * every interaction is reported upwards. That is what lets a screen keep the
 * whole query in Redux (see useDataTable) while the component stays a pure
 * function of it, reusable by any list in the app.
 *
 * A screen describes itself entirely through `columns`:
 *
 *   {
 *     key,                 // unique, and the React key for the cell
 *     header,              // column heading
 *     type,                // COLUMN_TYPES - picks the filter control and
 *                          // the default cell formatting
 *     field,               // lodash path to the value on a row
 *     sortKey,             // sort_by value; omit to make it unsortable
 *     filterKey,           // filter parameter base; omit to drop the filter icon
 *     options,             // SELECT columns: [{ value, label }]
 *     showInTable,         // false = filterable from the mobile panel only
 *     render(row),         // custom cell; falls back to formatting by type
 *     mobile,              // MOBILE_SLOTS - where it lands on a phone card
 *   }
 */
function DataTable({
  columns,
  rows,
  rowKey,
  // Query state
  search,
  sort,
  columnFilters,
  pagination,
  pageItems,
  rowRange,
  activeFilterCount,
  isFiltered,
  // Handlers
  onSearchChange,
  onSearchSubmit,
  onSortChange,
  onColumnFilterChange,
  onClearFilters,
  onPageChange,
  onLimitChange,
  onRetry,
  // Status
  isLoading,
  error,
  // Presentation
  rowActions,
  toolbarActions,
  searchPlaceholder = "Search...",
  rowNoun = "rows",
  emptyIcon,
  emptyTitle = "Nothing found",
  emptyDescription = "There is nothing here yet.",
  filteredEmptyDescription = "Try changing your search or filters.",
  skeletonRows = 5,
  maxBodyHeight = DEFAULT_MAX_BODY_HEIGHT,
  fillHeight = false,
  // Optional: hoist the mobile panel's open state if a screen wants it in the
  // store. Left alone, it stays internal - a disclosure toggle is
  // presentation, and making every screen add a reducer for it would be noise.
  isMobileFilterOpen: controlledMobileFilterOpen,
  onToggleMobileFilters,
}) {
  const [internalMobileFilterOpen, setInternalMobileFilterOpen] =
    useState(false);
  const isMobileFilterOpen =
    controlledMobileFilterOpen ?? internalMobileFilterOpen;
  const toggleMobileFilters =
    onToggleMobileFilters ??
    (() => setInternalMobileFilterOpen((open) => !open));

  const visibleColumns = getVisibleColumns(columns);
  const hasRows = rows.length > 0;
  const isFirstLoad = isLoading && !hasRows;
  // The head carries every filter control, so it stays even when the body
  // cannot - otherwise a filter that matched nothing would take away the only
  // control that could undo it.
  const showTableHead = !isFirstLoad && !error;

  return (
    <Card
      className={cn(
        "gap-0 overflow-hidden py-0 shadow-none",
        // Fill the space the parent gives instead of a fixed ceiling, so the
        // rows are the only thing that scrolls.
        fillHeight && "roomy:h-full roomy:min-h-0",
      )}
    >
      <DataTableToolbar
        columns={columns}
        search={search}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        isMobileFilterOpen={isMobileFilterOpen}
        onToggleMobileFilters={toggleMobileFilters}
        activeFilterCount={activeFilterCount}
        isFiltered={isFiltered}
        onClearFilters={onClearFilters}
        isLoading={isLoading}
        searchPlaceholder={searchPlaceholder}
        actions={toolbarActions}
      />

      {isMobileFilterOpen && (
        <DataTableMobileFilters
          columns={columns}
          columnFilters={columnFilters}
          onColumnFilterChange={onColumnFilterChange}
        />
      )}

      {showTableHead && (
        <div
          // Lenis smooth-scrolls the window and calls preventDefault on wheel,
          // so without this it swallows the gesture before this container ever
          // sees it - the scrollbar is there, but the wheel does nothing. The
          // attribute tells Lenis to leave this subtree alone.
          data-lenis-prevent
          className={cn(
            "hidden overflow-auto md:block",
            // Only pin the body on a window tall enough to hold it. Anywhere
            // smaller it keeps its natural height and the content area
            // scrolls instead, which is what a phone wants anyway.
            fillHeight && "roomy:min-h-[240px] roomy:flex-1",
          )}
          style={fillHeight ? undefined : { maxHeight: maxBodyHeight }}
        >
          <Table>
            <TableHeader className={STICKY_HEADER_CLASSES}>
              <TableRow className="hover:bg-transparent">
                {rowActions && (
                  <th className="h-11 w-14 px-4">
                    <span className="sr-only">Actions</span>
                  </th>
                )}
                {_.map(visibleColumns, (column) => (
                  <DataTableSortHeader
                    key={column.key}
                    column={column}
                    sort={sort}
                    columnFilters={columnFilters}
                    onSortChange={onSortChange}
                    onColumnFilterChange={onColumnFilterChange}
                  />
                ))}
              </TableRow>
            </TableHeader>
            {hasRows && (
              // A refetch dims the rows instead of replacing them with a
              // skeleton, so paging, sorting and typing do not make the table
              // flicker - and the heading row never moves.
              <TableBody
                className={cn(
                  "transition-opacity",
                  isLoading && "pointer-events-none opacity-60",
                )}
              >
                {_.map(rows, (row) => (
                  <TableRow key={rowKey(row)}>
                    {rowActions && (
                      <TableCell className="py-1">{rowActions(row)}</TableCell>
                    )}
                    {_.map(visibleColumns, (column) => (
                      <TableCell
                        key={column.key}
                        className={cn("py-1", column.className)}
                      >
                        {renderCell(row, column)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </div>
      )}

      {isFirstLoad && <DataTableSkeleton rows={skeletonRows} />}

      {!isFirstLoad && error && (
        <DataTableError message={error} onRetry={onRetry} />
      )}

      {!isFirstLoad && !error && hasRows && (
        <div
          data-lenis-prevent
          className={cn(
            "overflow-auto transition-opacity md:hidden",
            fillHeight && "roomy:min-h-[240px] roomy:flex-1",
            isLoading && "pointer-events-none opacity-60",
          )}
          style={fillHeight ? undefined : { maxHeight: maxBodyHeight }}
        >
          <DataTableMobileList
            columns={columns}
            rows={rows}
            rowKey={rowKey}
            rowActions={rowActions}
          />
        </div>
      )}

      {!isFirstLoad && !error && !hasRows && (
        <DataTableEmptyState
          icon={emptyIcon}
          isFiltered={isFiltered}
          title={emptyTitle}
          description={emptyDescription}
          filteredDescription={filteredEmptyDescription}
          onClearFilters={onClearFilters}
        />
      )}

      <DataTablePagination
        pagination={pagination}
        pageItems={pageItems}
        rowRange={rowRange}
        isLoading={isLoading}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        rowNoun={rowNoun}
      />
    </Card>
  );
}

export default DataTable;
