import _ from "lodash";
import { FileText, Upload, X } from "lucide-react";

import { Button } from "@shadcnComponent/button";

const billName = (bill) => bill?.name ?? "Attached bill";

function PurchaseOrderBillUploader({
  id,
  value = [],
  disabled = false,
  onChange,
  onBlur,
  error,
}) {
  const addFiles = (event) => {
    if (disabled) return;

    const nextFiles = _.toArray(event.target.files);
    if (nextFiles.length === 0) return;

    onChange(_.concat(value, nextFiles));
    event.target.value = "";
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        className={`flex items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-6 text-sm font-medium transition-colors ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-muted/50"
        }`}
      >
        <Upload className="size-4" aria-hidden="true" />
        Choose PDF bills
      </label>
      <input
        id={id}
        name="bills"
        type="file"
        disabled={disabled}
        multiple
        accept="application/pdf,.pdf"
        onChange={addFiles}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="hidden"
      />
      {value.length > 0 && (
        <ul
          className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Selected bills"
        >
          {_.map(value, (bill, index) => (
            <li
              key={`${billName(bill)}-${index}`}
              className="flex min-w-0 items-center gap-2 rounded-md border bg-muted/20 px-3 py-2 text-sm"
            >
              <FileText
                className="size-4 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate">{billName(bill)}</span>
              {!disabled && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${billName(bill)}`}
                  onClick={() =>
                    onChange(
                      _.filter(value, (_, itemIndex) => itemIndex !== index),
                    )
                  }
                  className="size-7"
                >
                  <X className="size-3.5" aria-hidden="true" />
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PurchaseOrderBillUploader;
