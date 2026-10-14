import { useCallback } from "react";

import { selectFieldValueForReplacement } from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useBillToKeyboardShortcut({ paymentNotesRef, productsRef }) {
  return useCallback(
    (event) => {
      const shouldFocusPaymentNotes =
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        (event.key === "Backspace" || event.key === "Delete");

      if (shouldFocusPaymentNotes) {
        const paymentNotes = paymentNotesRef.current;
        if (!paymentNotes) return;

        event.preventDefault();
        selectFieldValueForReplacement(paymentNotes);
        return;
      }

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
