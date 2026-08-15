import _ from "lodash";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COLUMN_TYPES, FILTER_ALL } from "@Enums";
import { emptyFilterValue, isDateColumn } from "@/utils/dataTable.util";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * A date column filters on a calendar day, a datetime column filters on an
 * instant - which is exactly the difference between the two native inputs.
 */
const RANGE_INPUT_TYPE = {
  [COLUMN_TYPES.NUMBER]: "number",
  [COLUMN_TYPES.DATE]: "date",
  [COLUMN_TYPES.DATE_TIME]: "datetime-local",
};

const RANGE_BOUNDS = {
  [COLUMN_TYPES.NUMBER]: { start: "min", end: "max", startLabel: "Min", endLabel: "Max" },
  RANGE: { start: "from", end: "to", startLabel: "From", endLabel: "To" },
};

/**
 * Renders the one control that suits a column's type. Selects and date
 * pickers apply straight away because there is no more typing to wait for;
 * text and number inputs are debounced by the controller.
 *
 * `compact` is the version that sits in the table's filter row: the column
 * heading directly above is already the label, so it is dropped and the
 * control shrinks to match a header cell.
 */
function DataTableColumnFilter({ column, value, onChange, compact = false }) {
  const filterLabel = column.filterLabel ?? column.header;
  const inputId = `filter-${column.filterKey}`;
  const controlHeight = compact ? "h-8" : "h-9";

  const withLabel = (control) =>
    compact ? (
      control
    ) : (
      <div className="grid gap-1.5">
        <Label htmlFor={inputId} className="text-xs text-muted-foreground">
          {filterLabel}
        </Label>
        {control}
      </div>
    );

  if (column.type === COLUMN_TYPES.SELECT) {
    const allLabel = column.allOptionLabel ?? `All ${_.toLower(filterLabel)}`;

    return withLabel(
      <Select
        value={value || FILTER_ALL}
        onValueChange={(next) => onChange(next, { immediate: true })}
      >
        <SelectTrigger
          id={inputId}
          className={cn(controlHeight, compact && "text-xs font-normal")}
          aria-label={`Filter by ${_.toLower(filterLabel)}`}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={FILTER_ALL}>{compact ? "All" : allLabel}</SelectItem>
          {_.map(column.options, (option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>,
    );
  }

  if (column.type === COLUMN_TYPES.NUMBER || isDateColumn(column.type)) {
    const bounds =
      column.type === COLUMN_TYPES.NUMBER
        ? RANGE_BOUNDS[COLUMN_TYPES.NUMBER]
        : RANGE_BOUNDS.RANGE;
    const range = _.isPlainObject(value) ? value : emptyFilterValue(column.type);
    const inputType = RANGE_INPUT_TYPE[column.type];
    // Dates apply on pick; a number range is typed, so it waits.
    const immediate = isDateColumn(column.type);

    const updateBound = (bound) => (event) =>
      onChange({ ...range, [bound]: event.target.value }, { immediate });

    return withLabel(
      <div className="flex items-center gap-1.5">
        <Input
          id={inputId}
          type={inputType}
          value={range[bounds.start] ?? ""}
          onChange={updateBound(bounds.start)}
          placeholder={bounds.startLabel}
          aria-label={`${filterLabel} ${_.toLower(bounds.startLabel)}`}
          className={cn(controlHeight, compact && "px-2 text-xs md:text-xs")}
        />
        <span className="text-xs text-muted-foreground">–</span>
        <Input
          type={inputType}
          value={range[bounds.end] ?? ""}
          onChange={updateBound(bounds.end)}
          placeholder={bounds.endLabel}
          aria-label={`${filterLabel} ${_.toLower(bounds.endLabel)}`}
          className={cn(controlHeight, compact && "px-2 text-xs md:text-xs")}
        />
      </div>,
    );
  }

  return withLabel(
    <Input
      id={inputId}
      value={_.isString(value) ? value : ""}
      onChange={(event) => onChange(event.target.value)}
      placeholder={
        compact
          ? (column.filterPlaceholder ?? "Filter")
          : (column.filterPlaceholder ?? `Filter by ${_.toLower(filterLabel)}`)
      }
      aria-label={`Filter by ${_.toLower(filterLabel)}`}
      className={cn(controlHeight, compact && "px-2 text-xs md:text-xs")}
    />,
  );
}

export default DataTableColumnFilter;
