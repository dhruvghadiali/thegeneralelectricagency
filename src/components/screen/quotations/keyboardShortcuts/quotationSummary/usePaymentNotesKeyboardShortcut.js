import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function usePaymentNotesKeyboardShortcut({ deliveryNotesRef, roundOffRef }) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, deliveryNotesRef))
        return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        deliveryNotesRef.current?.focus();
        return;
      }

      const shouldFocusRoundOff =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusRoundOff) return;

      event.preventDefault();
      roundOffRef.current?.focus();
    },
    [deliveryNotesRef, roundOffRef],
  );
}

export default usePaymentNotesKeyboardShortcut;
