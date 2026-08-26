import _ from "lodash";

import { cn } from "@/lib/utils";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import { COLUMN_TYPES, FILTER_ALL } from "@Enums";
import { emptyFilterValue, isDateColumn } from "@/utils/dataTable.util";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";
import DataTableDatePicker from "@commonComponent/dataTable/dataTableDatePicker";

/**
 * Number ranges remain plain inputs. Date and datetime ranges use the
 * shadcn calendar picker below.
 */
const RANGE_INPUT_TYPE = {
  [COLUMN_TYPES.NUMBER]: "number",
};

const RANGE_BOUNDS = {
  [COLUMN_TYPES.NUMBER]: { start: "min", end: "max", startLabel: "Min", endLabel: "Max" },
};

/**
 * Renders the one control that suits a column's type. Selects and completed
 * date or date-time boundary selections apply straight away. Text and number
 * inputs are debounced by the controller.
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

  if (isDateColumn(column.type)) {
    const range = _.isPlainObject(value) ? value : emptyFilterValue(column.type);
    const updateBound = (bound) => (next) => {
      const nextRange = { ...range, [bound]: next };

      // Each boundary is independently valid on the API. This supports both
      // closed ranges (`from` + `to`) and open-ended requests with only one.
      onChange(nextRange, { immediate: true });
    };

    return withLabel(
      <div className="flex min-w-0 items-center gap-1.5">
        <DataTableDatePicker
          value={range.from}
          type={column.type}
          bound="from"
          label={filterLabel}
          controlHeight={controlHeight}
          compact={compact}
          maximum={range.to}
          onChange={updateBound("from")}
        />
        <span className="shrink-0 text-xs text-muted-foreground">–</span>
        <DataTableDatePicker
          value={range.to}
          type={column.type}
          bound="to"
          label={filterLabel}
          controlHeight={controlHeight}
          compact={compact}
          minimum={range.from}
          onChange={updateBound("to")}
        />
      </div>,
    );
  }

  if (column.type === COLUMN_TYPES.NUMBER) {
    const bounds = RANGE_BOUNDS[COLUMN_TYPES.NUMBER];
    const range = _.isPlainObject(value) ? value : emptyFilterValue(column.type);
    const inputType = RANGE_INPUT_TYPE[column.type];

    const updateBound = (bound) => (event) =>
      onChange({ ...range, [bound]: event.target.value });

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
