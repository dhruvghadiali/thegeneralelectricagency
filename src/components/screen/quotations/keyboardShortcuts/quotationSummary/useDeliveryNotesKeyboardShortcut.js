import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useDeliveryNotesKeyboardShortcut({
  gstPercentageRef,
  paymentNotesRef,
}) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, gstPercentageRef))
        return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        gstPercentageRef.current?.focus();
        return;
      }

      const shouldFocusPaymentNotes =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusPaymentNotes) return;

      event.preventDefault();
      paymentNotesRef.current?.focus();
    },
    [gstPercentageRef, paymentNotesRef],
  );
}

export default useDeliveryNotesKeyboardShortcut;
