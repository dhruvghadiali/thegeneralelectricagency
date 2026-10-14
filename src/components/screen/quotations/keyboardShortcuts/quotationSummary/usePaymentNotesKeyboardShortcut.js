import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function usePaymentNotesKeyboardShortcut({ billToRef, deliveryNotesRef }) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, deliveryNotesRef))
        return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        deliveryNotesRef.current?.focus();
        return;
      }

      const shouldFocusBillTo =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusBillTo) return;

      event.preventDefault();
      billToRef.current?.focus();
    },
    [billToRef, deliveryNotesRef],
  );
}

export default usePaymentNotesKeyboardShortcut;
