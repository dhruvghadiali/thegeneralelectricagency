import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@shadcnComponent/badge";
import { formatQuotationDate } from "@screenComponent/quotations/viewQuotationInformation/viewQuotationInformation.utils";

import QuotationHistoryDetails from "@screenComponent/quotations/viewQuotationInformation/history/quotationHistoryDetails";
import QuotationHistoryChangeBadges from "@screenComponent/quotations/viewQuotationInformation/history/quotationHistoryChangeBadges";

function QuotationHistoryEntry({
  entry,
  index,
  isOpen,
  triggerRefs,
  onKeyDown,
  onToggle,
}) {
  const contentId = `history-version-${String(entry.id).replace(/[^a-zA-Z0-9_-]/g, "-")}`;

  return (
    <li
      className={cn(
        "scroll-mt-4 overflow-hidden rounded-xl border bg-background shadow-sm outline-none transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring",
        isOpen && "border-primary/40 shadow-md",
      )}
    >
      <h3>
        <button
          ref={(element) => {
            triggerRefs.current[index] = element;
          }}
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          aria-keyshortcuts="Enter Tab Backspace Delete"
          onKeyDown={(event) => onKeyDown(event, index)}
          onClick={onToggle}
          className="flex w-full items-start gap-3 px-4 py-4 text-left outline-none transition-colors hover:bg-muted/40 focus-visible:outline-none"
        >
          <span
            className="mt-1 size-2.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/10"
            aria-hidden="true"
          />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{entry.quotationNumber}</span>
              <Badge variant="outline">{entry.quotationVersion}</Badge>
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">
              Recorded by {entry.changedBy} ·{" "}
              {formatQuotationDate(entry.changedAt)}
            </span>
            <QuotationHistoryChangeBadges labels={entry.changes.labels} />
          </span>
          <ChevronDown
            className={cn(
              "mt-1 size-5 shrink-0 text-muted-foreground transition-transform",
              isOpen && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
      </h3>

      {isOpen && (
        <QuotationHistoryDetails contentId={contentId} entry={entry} />
      )}
    </li>
  );
}

export default QuotationHistoryEntry;
