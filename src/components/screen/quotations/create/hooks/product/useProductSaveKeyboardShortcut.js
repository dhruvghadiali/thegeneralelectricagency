import { useCallback } from "react";

function useProductSaveKeyboardShortcut({
  descriptionInputRef,
  productInputRef,
}) {
  return useCallback(
    (event) => {
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        descriptionInputRef.current?.focus();
        return;
      }

      const shouldFocusProduct =
        (event.altKey && event.key === "ArrowDown") ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusProduct) return;

      event.preventDefault();
      productInputRef.current?.focus();
    },
    [descriptionInputRef, productInputRef],
  );
}

export default useProductSaveKeyboardShortcut;
