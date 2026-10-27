import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation, {
  focusNextFormField,
} from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useProductSellingPriceKeyboardShortcut({
  quantityInputRef,
  discountPercentageInputRef,
}) {
  return useCallback(
    (event) => {
      if (
        handlePreviousFieldKeyboardNavigation(event, quantityInputRef, {
          requireTabNavigation: true,
        })
      )
        return;

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
      focusNextFormField(event, discountPercentageInputRef);
    },
    [discountPercentageInputRef, quantityInputRef],
  );
}

export default useProductSellingPriceKeyboardShortcut;
