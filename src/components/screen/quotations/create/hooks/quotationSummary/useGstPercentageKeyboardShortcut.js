import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/create/hooks/handlePreviousFieldKeyboardNavigation";

function useGstPercentageKeyboardShortcut({
  deliveryNotesRef,
  taxTreatmentRef,
}) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, taxTreatmentRef)) return;

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
