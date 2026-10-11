import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/create/hooks/handlePreviousFieldKeyboardNavigation";

function useBillToKeyboardShortcut({ paymentNotesRef, productsRef }) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, paymentNotesRef)) return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        paymentNotesRef.current?.focus();
        return;
      }

      const shouldFocusProducts =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusProducts) return;

      event.preventDefault();
      productsRef.current?.focus();
    },
    [paymentNotesRef, productsRef],
  );
}

export default useBillToKeyboardShortcut;
