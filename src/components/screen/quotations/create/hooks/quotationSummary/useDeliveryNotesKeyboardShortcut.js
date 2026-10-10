import { useCallback } from "react";

function useDeliveryNotesKeyboardShortcut({
  gstPercentageRef,
  paymentNotesRef,
}) {
  return useCallback(
    (event) => {
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
