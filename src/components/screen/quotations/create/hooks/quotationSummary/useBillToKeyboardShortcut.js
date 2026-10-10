import { useCallback } from "react";

function useBillToKeyboardShortcut({ paymentNotesRef, productsRef }) {
  return useCallback(
    (event) => {
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
