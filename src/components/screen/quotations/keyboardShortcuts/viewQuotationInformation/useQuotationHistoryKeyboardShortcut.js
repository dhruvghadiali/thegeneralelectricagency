import { useCallback } from "react";

import { isDesktopKeyboardEnabled } from "@keyboard/keyboard.utils";

function useQuotationHistoryKeyboardShortcut({
  historyEntryCount,
  triggerRefs,
  onMoveBeforeHistory,
  onMoveAfterHistory,
}) {
  return useCallback(
    (event, index) => {
      if (!isDesktopKeyboardEnabled()) return;

      const isPreviousKey =
        event.key === "Backspace" || event.key === "Delete";

      if (event.key !== "Tab" && !isPreviousKey) return;

      event.preventDefault();

      if (isPreviousKey || event.shiftKey) {
        if (index > 0) {
          triggerRefs.current[index - 1]?.focus();
        } else {
          onMoveBeforeHistory?.();
        }
        return;
      }

      if (index < historyEntryCount - 1) {
        triggerRefs.current[index + 1]?.focus();
      } else {
        onMoveAfterHistory?.();
      }
    },
    [
      historyEntryCount,
      onMoveAfterHistory,
      onMoveBeforeHistory,
      triggerRefs,
    ],
  );
}

export default useQuotationHistoryKeyboardShortcut;
