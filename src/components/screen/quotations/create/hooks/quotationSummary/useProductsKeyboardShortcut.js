import { useCallback } from "react";

function useProductsKeyboardShortcut({ billToRef, finalBillDetailsRef }) {
  return useCallback(
    (event) => {
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        billToRef.current?.focus();
        return;
      }

      const shouldFocusFinalBillDetails =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusFinalBillDetails) return;

      event.preventDefault();
      finalBillDetailsRef.current?.focus();
    },
    [billToRef, finalBillDetailsRef],
  );
}

export default useProductsKeyboardShortcut;
