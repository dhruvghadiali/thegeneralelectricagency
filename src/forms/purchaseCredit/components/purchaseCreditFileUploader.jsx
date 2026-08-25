import { FileText, Upload, X } from "lucide-react";

import { Button } from "@shadcnComponent/button";

const receiptName = (receipt) => {
  if (typeof receipt === "string") {
    return receipt.split("/").at(-1) || receipt;
  }

  return receipt?.name ?? "Attached receipt";
};

function PurchaseCreditFileUploader({ id, value = [], onChange, onBlur, error }) {
  const addFiles = (event) => {
    const nextFiles = Array.from(event.target.files ?? []);
    if (nextFiles.length === 0) return;

    onChange([...value, ...nextFiles]);
    event.target.value = "";
  };

  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-6 text-sm font-medium transition-colors hover:bg-muted/50"
      >
        <Upload className="size-4" aria-hidden="true" />
        Choose receipt files
      </label>
      <input
        id={id}
        type="file"
        multiple
        accept="application/pdf,image/*"
        onChange={addFiles}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="hidden"
      />
      {value.length > 0 && (
        <ul
          className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Selected receipts"
        >
          {value.map((receipt, index) => (
            <li
              key={`${receiptName(receipt)}-${index}`}
              className="flex min-w-0 items-center gap-2 rounded-md border bg-muted/20 px-3 py-2 text-sm"
            >
              <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">{receiptName(receipt)}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove ${receiptName(receipt)}`}
                onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}
                className="size-7"
              >
                <X className="size-3.5" aria-hidden="true" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PurchaseCreditFileUploader;
