import { useCallback } from "react";

function useBillToKeyboardShortcut({ productsRef, roundOffRef }) {
  return useCallback(
    (event) => {
      const shouldFocusRoundOff =
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        (event.key === "Backspace" || event.key === "Delete");

      if (shouldFocusRoundOff) {
        event.preventDefault();
        roundOffRef.current?.focus();
        return;
      }

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        roundOffRef.current?.focus();
        return;
      }

      const shouldFocusProducts =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusProducts) return;

      event.preventDefault();
      productsRef.current?.focus();
    },
    [productsRef, roundOffRef],
  );
}

export default useBillToKeyboardShortcut;
