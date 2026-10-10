import { useCallback } from "react";

function useSubmitButtonKeyboardShortcut({ backButtonRef, taxTreatmentRef }) {
  return useCallback(
    (event) => {
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        backButtonRef.current?.focus();
        return;
      }

      const shouldFocusTaxTreatment =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusTaxTreatment) return;

      event.preventDefault();
      taxTreatmentRef.current?.focus();
    },
    [backButtonRef, taxTreatmentRef],
  );
}

export default useSubmitButtonKeyboardShortcut;
