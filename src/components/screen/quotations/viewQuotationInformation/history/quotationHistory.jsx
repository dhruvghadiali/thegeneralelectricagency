import { useMemo, useState } from "react";

import { buildQuotationHistory } from "@screenComponent/quotations/viewQuotationInformation/viewQuotationInformation.utils";

import QuotationHistoryEntry from "@screenComponent/quotations/viewQuotationInformation/history/quotationHistoryEntry";
import QuotationHistoryEmptyState from "@screenComponent/quotations/viewQuotationInformation/history/quotationHistoryEmptyState";
import useQuotationHistoryKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/viewQuotationInformation/useQuotationHistoryKeyboardShortcut";

function QuotationHistory({
  history = [],
  triggerRefs,
  onMoveBeforeHistory,
  onMoveAfterHistory,
}) {
  const entries = useMemo(() => buildQuotationHistory(history), [history]);
  const [openId, setOpenId] = useState(null);
  const handleHistoryEntryKeyDown = useQuotationHistoryKeyboardShortcut({
    historyEntryCount: entries.length,
    triggerRefs,
    onMoveBeforeHistory,
    onMoveAfterHistory,
  });

  if (!entries.length) {
    return <QuotationHistoryEmptyState />;
  }

  return (
    <ol className="grid gap-3">
      {entries.map((entry, index) => {
        const isOpen = openId === entry.id;
        const toggleEntry = () => {
          const willOpen = openId !== entry.id;
          setOpenId(willOpen ? entry.id : null);

          if (willOpen) {
            window.requestAnimationFrame(() => {
              triggerRefs.current[index]?.closest("li")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "center",
              });
            });
          }
        };

        return (
          <QuotationHistoryEntry
            key={entry.id}
            entry={entry}
            index={index}
            isOpen={isOpen}
            triggerRefs={triggerRefs}
            onKeyDown={handleHistoryEntryKeyDown}
            onToggle={toggleEntry}
          />
        );
      })}
    </ol>
  );
}

export default QuotationHistory;
