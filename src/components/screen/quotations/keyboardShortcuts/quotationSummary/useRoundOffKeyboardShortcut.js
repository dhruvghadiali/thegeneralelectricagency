import { useCallback } from "react";

function useRoundOffKeyboardShortcut({ billToRef, paymentNotesRef }) {
  return useCallback(
    (event) => {
      const shouldFocusPaymentNotes =
        (event.altKey && event.key === "ArrowUp") ||
        (!event.altKey &&
          !event.ctrlKey &&
          !event.metaKey &&
          (event.key === "Backspace" || event.key === "Delete"));

      if (shouldFocusPaymentNotes) {
        event.preventDefault();
        paymentNotesRef.current?.focus();
        paymentNotesRef.current?.select?.();
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
    [billToRef, paymentNotesRef],
  );
}

export default useRoundOffKeyboardShortcut;
