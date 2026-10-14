import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/hooks/handlePreviousFieldKeyboardNavigation";

function useFinalBillDetailsKeyboardShortcut({ backButtonRef, productsRef }) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, productsRef)) return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        productsRef.current?.focus();
        return;
      }

      const shouldFocusBack =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusBack) return;

      event.preventDefault();
      backButtonRef.current?.focus();
    },
    [backButtonRef, productsRef],
  );
}

export default useFinalBillDetailsKeyboardShortcut;
