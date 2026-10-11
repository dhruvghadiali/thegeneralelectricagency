import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/create/hooks/handlePreviousFieldKeyboardNavigation";

function useTaxTreatmentKeyboardShortcut({
  gstPercentageRef,
  submitButtonRef,
}) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, submitButtonRef)) return;

      const shouldFocusGst =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusGst) return;

      event.preventDefault();
      gstPercentageRef.current?.focus();
    },
    [gstPercentageRef, submitButtonRef],
  );
}

export default useTaxTreatmentKeyboardShortcut;
