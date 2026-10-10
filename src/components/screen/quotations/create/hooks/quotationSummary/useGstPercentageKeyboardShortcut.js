import { useCallback } from "react";

function useGstPercentageKeyboardShortcut({
  deliveryNotesRef,
  taxTreatmentRef,
}) {
  return useCallback(
    (event) => {
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        taxTreatmentRef.current?.focus();
        return;
      }

      const shouldFocusDeliveryNotes =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusDeliveryNotes) return;

      event.preventDefault();
      deliveryNotesRef.current?.focus();
    },
    [deliveryNotesRef, taxTreatmentRef],
  );
}

export default useGstPercentageKeyboardShortcut;
