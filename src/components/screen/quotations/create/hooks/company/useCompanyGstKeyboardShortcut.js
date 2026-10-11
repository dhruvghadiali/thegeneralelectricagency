import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/create/hooks/handlePreviousFieldKeyboardNavigation";

function useCompanyGstKeyboardShortcut({ phoneInputRef, saveButtonRef }) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, phoneInputRef)) return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        phoneInputRef.current?.focus();
        return;
      }

      if (event.altKey && event.key === "ArrowDown") {
        event.preventDefault();
        saveButtonRef.current?.focus();
        return;
      }

      const shouldFocusSave =
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
