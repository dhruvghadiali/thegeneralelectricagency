import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation, {
  focusNextFormField,
} from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useProductQuantityKeyboardShortcut({
  productInputRef,
  sellingPriceInputRef,
}) {
  return useCallback(
    (event) => {
      if (
        handlePreviousFieldKeyboardNavigation(event, productInputRef, {
          requireTabNavigation: true,
        })
      )
        return;

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
      focusNextFormField(event, sellingPriceInputRef);
    },
    [productInputRef, sellingPriceInputRef],
  );
}

export default useProductQuantityKeyboardShortcut;
