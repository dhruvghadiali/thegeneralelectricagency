import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useProductDeliveryNotesKeyboardShortcut({
  descriptionInputRef,
  saveButtonRef,
}) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, descriptionInputRef))
        return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        descriptionInputRef.current?.focus();
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
    [descriptionInputRef, saveButtonRef],
  );
}

export default useProductDeliveryNotesKeyboardShortcut;
