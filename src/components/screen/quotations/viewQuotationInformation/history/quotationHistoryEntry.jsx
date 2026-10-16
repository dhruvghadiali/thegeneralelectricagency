import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@shadcnComponent/badge";
import { formatQuotationDate } from "@screenComponent/quotations/viewQuotationInformation/viewQuotationInformation.utils";

import QuotationHistoryDetails from "@screenComponent/quotations/viewQuotationInformation/history/quotationHistoryDetails";
import QuotationHistoryChangeBadges from "@screenComponent/quotations/viewQuotationInformation/history/quotationHistoryChangeBadges";
import QuotationPdfDownloadButton from "@screenComponent/quotations/viewQuotationInformation/quotationDetails/quotationPdfDownloadButton";

function QuotationHistoryEntry({
  entry,
  quotation,
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
        "scroll-mt-4 overflow-hidden rounded-lg border bg-background shadow-sm outline-none transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring sm:rounded-xl",
        isOpen && "border-primary/40 shadow-md",
      )}
    >
      <h3
        className="flex cursor-pointer items-center transition-colors hover:bg-muted/40"
        style={{ cursor: "pointer" }}
      >
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
          style={{ cursor: "pointer" }}
          className="flex min-w-0 flex-1 cursor-pointer items-start gap-2.5 px-3 py-3 text-left outline-none focus-visible:outline-none sm:gap-3 sm:px-4 sm:py-4"
        >
          <span
            className="mt-1 size-2.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/10"
            aria-hidden="true"
          />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              <span className="break-words text-sm font-semibold capitalize sm:text-base">
                {entry.quotationNumber}
              </span>
              <Badge variant="outline">{entry.quotationVersion}</Badge>
            </span>
            <span className="mt-1 block text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Recorded by {entry.changedBy} ·{" "}
              {formatQuotationDate(entry.changedAt)}
            </span>
            <QuotationHistoryChangeBadges labels={entry.changes.labels} />
          </span>
        </button>
        <span className="shrink-0" style={{ cursor: "pointer" }}>
          <QuotationPdfDownloadButton
            quotation={entry}
            baseQuotation={quotation}
          />
        </span>
        <button
          type="button"
          tabIndex={-1}
          aria-label={`${isOpen ? "Close" : "Open"} ${entry.quotationVersion} details`}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={onToggle}
          style={{ cursor: "pointer" }}
          className="flex size-10 shrink-0 cursor-pointer items-center justify-center text-muted-foreground outline-none transition-colors hover:text-foreground sm:size-12"
        >
          <ChevronDown
            className={cn(
              "size-5 transition-transform",
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
