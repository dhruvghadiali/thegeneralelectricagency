import { useCallback } from "react";

function useProductDirectoryKeyboardShortcut({
  productInputRef,
  productDirectoryRef,
}) {
  return useCallback(
    (event, currentIndex) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        productInputRef.current?.focus();
        return;
      }

      const direction =
        event.key === "ArrowDown" ? 1 : event.key === "ArrowUp" ? -1 : 0;
      if (direction === 0) return;

      event.preventDefault();
      const productOptions = Array.from(
        productDirectoryRef.current?.querySelectorAll(
          "[data-product-option]",
        ) ?? [],
      );
      if (productOptions.length === 0) return;

      const nextIndex =
        (currentIndex + direction + productOptions.length) %
        productOptions.length;
      productOptions[nextIndex]?.focus();
    },
    [productDirectoryRef, productInputRef],
  );
}

export default useProductDirectoryKeyboardShortcut;
