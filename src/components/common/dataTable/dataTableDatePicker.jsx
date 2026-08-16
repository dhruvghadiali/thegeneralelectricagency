import { useState } from "react";
import {
  format,
  isValid,
  parseISO,
  setHours,
  setMinutes,
} from "date-fns";
import { CalendarIcon, X } from "lucide-react";

import { COLUMN_TYPES } from "@Enums";
import { cn } from "@/lib/utils";
import { Button } from "@shadcnComponent/button";
import { Calendar } from "@shadcnComponent/calendar";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";

const DATE_VALUE_FORMAT = "yyyy-MM-dd";
const DATE_TIME_VALUE_FORMAT = "yyyy-MM-dd'T'HH:mm";

function parseValue(value) {
  if (!value) return undefined;

  const date = parseISO(value);
  return isValid(date) ? date : undefined;
}

function DataTableDatePicker({
  value,
  type,
  bound,
  label,
  controlHeight,
  compact,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const selected = parseValue(value);
  const isDateTime = type === COLUMN_TYPES.DATE_TIME;
  const defaultTime = bound === "to" ? "23:59" : "00:00";
  const time = selected ? format(selected, "HH:mm") : defaultTime;
  const [draftTime, setDraftTime] = useState(() => {
    const [hours, minutes] = time.split(":");
    return { hours, minutes };
  });
  const parsedDraftHours = Number(draftTime.hours);
  const parsedDraftMinutes = Number(draftTime.minutes);
  const isDraftTimeValid =
    draftTime.hours !== "" &&
    draftTime.minutes !== "" &&
    parsedDraftHours >= 0 &&
    parsedDraftHours <= 23 &&
    parsedDraftMinutes >= 0 &&
    parsedDraftMinutes <= 59;

  const changeOpen = (nextOpen) => {
    if (nextOpen) {
      const [hours, minutes] = time.split(":");
      setDraftTime({ hours, minutes });
    }

    setOpen(nextOpen);
  };

  const changeDate = (date) => {
    if (!date) {
      onChange("");
      return;
    }

    if (!isDateTime) {
      onChange(format(date, DATE_VALUE_FORMAT));
      setOpen(false);
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);
    const dateTime = setMinutes(setHours(date, hours), minutes);
    onChange(format(dateTime, DATE_TIME_VALUE_FORMAT));
  };

  const changeTimePart = (part) => (event) => {
    const nextValue = event.target.value.replace(/\D/g, "").slice(0, 2);
    setDraftTime((current) => ({ ...current, [part]: nextValue }));
  };

  const applyTime = () => {
    if (!selected || !isDraftTimeValid) return;

    const dateTime = setMinutes(
      setHours(selected, parsedDraftHours),
      parsedDraftMinutes,
    );
    onChange(format(dateTime, DATE_TIME_VALUE_FORMAT));
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={changeOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          aria-label={`${label} ${bound}`}
          className={cn(
            controlHeight,
            "min-w-0 flex-1 justify-start overflow-hidden px-2 font-normal",
            !selected && "text-muted-foreground",
            compact && "text-xs",
          )}
        >
          <CalendarIcon className="size-3.5 shrink-0" />
          <span className="truncate">
            {selected
              ? format(selected, isDateTime ? "MMM d, HH:mm" : "MMM d, yyyy")
              : bound === "from"
                ? "From"
                : "To"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected}
          onSelect={changeDate}
          captionLayout="label"
        />
        {(isDateTime || selected) && (
          <div className="flex items-end gap-2 border-t p-3">
            {isDateTime && (
              <div className="grid flex-1 gap-1.5">
                <Label className="text-xs">Time</Label>
                <div className="flex items-center gap-1">
                  <Input
                    value={draftTime.hours}
                    onChange={changeTimePart("hours")}
                    disabled={!selected}
                    inputMode="numeric"
                    maxLength={2}
                    aria-label={`${label} ${bound} hour`}
                    aria-invalid={
                      draftTime.hours !== "" &&
                      (parsedDraftHours < 0 || parsedDraftHours > 23)
                    }
                    placeholder="HH"
                    className="h-8 w-12 px-2 text-center"
                  />
                  <span className="font-medium text-muted-foreground">:</span>
                  <Input
                    value={draftTime.minutes}
                    onChange={changeTimePart("minutes")}
                    disabled={!selected}
                    inputMode="numeric"
                    maxLength={2}
                    aria-label={`${label} ${bound} minute`}
                    aria-invalid={
                      draftTime.minutes !== "" &&
                      (parsedDraftMinutes < 0 || parsedDraftMinutes > 59)
                    }
                    placeholder="MM"
                    className="h-8 w-12 px-2 text-center"
                  />
                </div>
              </div>
            )}
            {isDateTime && (
              <Button
                type="button"
                size="sm"
                disabled={!selected || !isDraftTimeValid}
                onClick={applyTime}
              >
                Apply
              </Button>
            )}
            {selected && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  onChange("");
                  setOpen(false);
                }}
                className={cn(!isDateTime && "w-full")}
              >
                <X className="size-3.5" /> Clear
              </Button>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default DataTableDatePicker;
