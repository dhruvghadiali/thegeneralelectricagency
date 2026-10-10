import { useCallback } from "react";

function useTaxTreatmentKeyboardShortcut({ gstPercentageRef }) {
  return useCallback(
    (event) => {
      const shouldFocusGst =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusGst) return;

      event.preventDefault();
      gstPercentageRef.current?.focus();
    },
    [gstPercentageRef],
  );
}

export default useTaxTreatmentKeyboardShortcut;
