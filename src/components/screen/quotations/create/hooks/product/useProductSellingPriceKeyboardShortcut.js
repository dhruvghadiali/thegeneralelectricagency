import { useCallback } from "react";

function useProductSellingPriceKeyboardShortcut({
  quantityInputRef,
  discountInputRef,
}) {
  return useCallback(
    (event) => {
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        quantityInputRef.current?.focus();
        return;
      }

      const shouldFocusDiscount =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusDiscount) return;

      event.preventDefault();
      discountInputRef.current?.focus();
    },
    [discountInputRef, quantityInputRef],
  );
}

export default useProductSellingPriceKeyboardShortcut;
