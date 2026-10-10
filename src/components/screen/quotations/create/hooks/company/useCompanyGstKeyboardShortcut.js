import { useCallback } from "react";

function useCompanyGstKeyboardShortcut({ phoneInputRef, saveButtonRef }) {
  return useCallback(
    (event) => {
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        phoneInputRef.current?.focus();
        return;
      }

      const shouldFocusSave =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusSave) return;

      event.preventDefault();
      saveButtonRef.current?.focus();
    },
    [phoneInputRef, saveButtonRef],
  );
}

export default useCompanyGstKeyboardShortcut;
