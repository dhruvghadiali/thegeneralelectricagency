import { useCallback } from "react";

function useFinalBillDetailsKeyboardShortcut({ backButtonRef, productsRef }) {
  return useCallback(
    (event) => {
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
