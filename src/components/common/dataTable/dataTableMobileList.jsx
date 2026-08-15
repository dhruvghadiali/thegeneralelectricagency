import _ from "lodash";

import { MOBILE_SLOTS } from "@Enums";
import { renderCell } from "@/utils/dataTable.util";

/**
 * A table cannot be a table on a phone, so each row becomes a card. Columns
 * opt into a slot with `mobile`, and anything that opts out is simply left
 * off the card - on a narrow screen, showing every column is worse than
 * showing the few that identify the row.
 */
function DataTableMobileList({ columns, rows, rowKey, rowActions }) {
  const bySlot = _.groupBy(_.filter(columns, "mobile"), "mobile");
  const [primaryColumn] = bySlot[MOBILE_SLOTS.PRIMARY] ?? [];
  const [secondaryColumn] = bySlot[MOBILE_SLOTS.SECONDARY] ?? [];
  const metaColumns = bySlot[MOBILE_SLOTS.META] ?? [];
  const badgeColumns = bySlot[MOBILE_SLOTS.BADGE] ?? [];

  return (
    <div className="divide-y md:hidden">
      {_.map(rows, (row) => (
        <article key={rowKey(row)} className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              {primaryColumn && (
                <div className="font-medium">{renderCell(row, primaryColumn)}</div>
              )}
              {secondaryColumn && (
                <div className="text-sm text-muted-foreground">
                  {renderCell(row, secondaryColumn)}
                </div>
              )}
            </div>
            {rowActions?.(row)}
          </div>

          {metaColumns.length > 0 && (
            <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
              {_.map(metaColumns, (column) => {
                const Icon = column.mobileIcon;

                return (
                  <span key={column.key} className="flex items-center gap-2 truncate">
                    {Icon && <Icon className="size-3.5 shrink-0" />}
                    {column.mobileLabel && (
                      <span className="shrink-0">{column.mobileLabel}</span>
                    )}
                    {renderCell(row, column)}
                  </span>
                );
              })}
            </div>
          )}

          {badgeColumns.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {_.map(badgeColumns, (column) => (
                <span key={column.key}>{renderCell(row, column)}</span>
              ))}
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export default DataTableMobileList;
