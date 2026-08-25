import { useState } from "react";
import { format, isValid, parseISO, startOfDay } from "date-fns";
import { CalendarIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@shadcnComponent/button";
import { Calendar } from "@shadcnComponent/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";

const parseDate = (value) => {
  if (!value) return undefined;
  const parsed = parseISO(value);
  return isValid(parsed) ? parsed : undefined;
};

function PurchaseCreditDatePicker({
  id,
  label,
  value,
  min,
  max,
  disabled = false,
  required = false,
  error,
  onChange,
  onBlur,
}) {
  const [open, setOpen] = useState(false);
  const selected = parseDate(value);
  const minimum = parseDate(min);
  const maximum = parseDate(max);
  const disabledDates = [
    ...(minimum ? [{ before: startOfDay(minimum) }] : []),
    ...(maximum ? [{ after: startOfDay(maximum) }] : []),
  ];

  return (
    <Popover
      open={disabled ? false : open}
      onOpenChange={(nextOpen) => {
        if (disabled) return;

        setOpen(nextOpen);
        if (!nextOpen) onBlur?.();
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={disabled}
          aria-label={label}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "w-full justify-start bg-transparent font-normal",
            !selected && "text-muted-foreground",
            disabled && "pointer-events-none",
          )}
        >
          <CalendarIcon className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">
            {selected ? format(selected, "dd MMM yyyy") : "Select a date"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          defaultMonth={selected ?? minimum ?? maximum}
          disabled={disabledDates.length ? disabledDates : undefined}
          onSelect={(date) => {
            if (disabled || !date) return;
            onChange(format(date, "yyyy-MM-dd"));
            setOpen(false);
          }}
          captionLayout="dropdown"
        />
        {selected && !disabled && (
          <div className="border-t p-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="w-full"
            >
              <X className="size-3.5" aria-hidden="true" />
              Clear date
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default PurchaseCreditDatePicker;
