import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useProductDiscountKeyboardShortcut({
  previousInputRef,
  nextInputRef,
}) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, previousInputRef))
        return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        previousInputRef.current?.focus();
        return;
      }

      const shouldFocusNext =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusNext) return;

      event.preventDefault();
      nextInputRef.current?.focus();
    },
    [nextInputRef, previousInputRef],
  );
}

export default useProductDiscountKeyboardShortcut;
