import _ from "lodash";

import { getFilterableColumns } from "@/utils/dataTable.util";

import DataTableColumnFilter from "@/components/common/dataTable/dataTableColumnFilter";

/**
 * The phone's stand-in for the filter row. There is no table below md, so
 * there are no header cells to hang the filters off - they get a labelled
 * panel instead, collapsed until asked for so the cards stay in view.
 */
function DataTableMobileFilters({ columns, columnFilters, onColumnFilterChange }) {
  const filterableColumns = getFilterableColumns(columns);

  if (filterableColumns.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 border-b bg-muted/30 p-4 sm:grid-cols-2 md:hidden">
      {_.map(filterableColumns, (column) => (
        <DataTableColumnFilter
          key={column.filterKey}
          column={column}
          value={_.get(columnFilters, column.filterKey)}
          onChange={(value, options) =>
            onColumnFilterChange(column.filterKey, value, options)
          }
        />
      ))}
    </div>
  );
}

export default DataTableMobileFilters;
