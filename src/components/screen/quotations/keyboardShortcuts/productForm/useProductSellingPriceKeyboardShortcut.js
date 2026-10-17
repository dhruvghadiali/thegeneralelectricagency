import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useProductSellingPriceKeyboardShortcut({
  quantityInputRef,
  discountPercentageInputRef,
}) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, quantityInputRef)) return;

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
      discountPercentageInputRef.current?.focus();
    },
    [discountPercentageInputRef, quantityInputRef],
  );
}

export default useProductSellingPriceKeyboardShortcut;
