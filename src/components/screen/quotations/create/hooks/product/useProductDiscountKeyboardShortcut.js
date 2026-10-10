import { useCallback } from "react";

function useProductDiscountKeyboardShortcut({
  sellingPriceInputRef,
  descriptionInputRef,
}) {
  return useCallback(
    (event) => {
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        sellingPriceInputRef.current?.focus();
        return;
      }

      const shouldFocusDescription =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusDescription) return;

      event.preventDefault();
      descriptionInputRef.current?.focus();
    },
    [descriptionInputRef, sellingPriceInputRef],
  );
}

export default useProductDiscountKeyboardShortcut;
