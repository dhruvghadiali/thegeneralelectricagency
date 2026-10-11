import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/create/hooks/handlePreviousFieldKeyboardNavigation";

function useProductQuantityKeyboardShortcut({
  productInputRef,
  sellingPriceInputRef,
}) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, productInputRef)) return;

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
