import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useProductSaveKeyboardShortcut({
  productDeliveryNotesInputRef,
  productInputRef,
}) {
  return useCallback(
    (event) => {
      if (
        handlePreviousFieldKeyboardNavigation(
          event,
          productDeliveryNotesInputRef,
        )
      )
        return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        productDeliveryNotesInputRef.current?.focus();
        return;
      }

      const shouldFocusProduct =
        (event.altKey && event.key === "ArrowDown") ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusProduct) return;

      event.preventDefault();
      productInputRef.current?.focus();
    },
    [productDeliveryNotesInputRef, productInputRef],
  );
}

export default useProductSaveKeyboardShortcut;
