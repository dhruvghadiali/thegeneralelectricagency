import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/create/hooks/handlePreviousFieldKeyboardNavigation";

function useProductDescriptionKeyboardShortcut({
  discountInputRef,
  saveButtonRef,
}) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, discountInputRef)) return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        discountInputRef.current?.focus();
        return;
      }

      const shouldFocusSave =
        (event.altKey && event.key === "ArrowDown") ||
        (event.altKey && event.key === "Enter") ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusSave) return;

      event.preventDefault();
      saveButtonRef.current?.focus();
    },
    [discountInputRef, saveButtonRef],
  );
}

export default useProductDescriptionKeyboardShortcut;
