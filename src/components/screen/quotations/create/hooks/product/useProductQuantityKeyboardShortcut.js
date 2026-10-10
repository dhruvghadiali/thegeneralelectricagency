import { useCallback } from "react";

function useProductQuantityKeyboardShortcut({
  productInputRef,
  sellingPriceInputRef,
}) {
  return useCallback(
    (event) => {
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        productInputRef.current?.focus();
        return;
      }

      const shouldFocusSellingPrice =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusSellingPrice) return;

      event.preventDefault();
      sellingPriceInputRef.current?.focus();
    },
    [productInputRef, sellingPriceInputRef],
  );
}

export default useProductQuantityKeyboardShortcut;
