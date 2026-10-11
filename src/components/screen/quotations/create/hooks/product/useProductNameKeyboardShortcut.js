import { useCallback } from "react";

function useProductNameKeyboardShortcut({
  productDirectoryRef,
  quantityInputRef,
  hasProductSummary,
  onNavigateToCompanyInformation,
  onOpenProductSummary,
}) {
  const handleProductNameFocus = useCallback((event) => {
    const input = event.currentTarget;

    window.requestAnimationFrame(() => {
      if (document.activeElement !== input) return;

      const lastCharacterPosition = input.value.length;
      input.setSelectionRange(lastCharacterPosition, lastCharacterPosition);
    });
  }, []);

  const handleProductNameKeyDown = useCallback(
    (event) => {
      const shouldNavigateBackward =
        (event.altKey && event.key === "ArrowUp") ||
        (!event.altKey &&
          !event.ctrlKey &&
          !event.metaKey &&
          (event.key === "Backspace" || event.key === "Delete"));

      if (shouldNavigateBackward) {
        event.preventDefault();

        if (hasProductSummary) {
          onOpenProductSummary();
        } else {
          onNavigateToCompanyInformation();
        }
        return;
      }

      const shouldFocusProductDirectory =
        (event.altKey && event.key === "ArrowRight") ||
        (!event.altKey &&
          (event.key === "ArrowDown" || event.key === "ArrowUp"));

      if (shouldFocusProductDirectory) {
        event.preventDefault();
        const selectedProduct = productDirectoryRef.current?.querySelector(
          '[data-product-option][aria-selected="true"]',
        );
        const firstProduct = productDirectoryRef.current?.querySelector(
          "[data-product-option]",
        );

        (selectedProduct ?? firstProduct)?.focus();
        return;
      }

      const shouldFocusQuantity =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusQuantity) return;

      event.preventDefault();
      quantityInputRef.current?.focus();
    },
    [
      hasProductSummary,
      onNavigateToCompanyInformation,
      onOpenProductSummary,
      productDirectoryRef,
      quantityInputRef,
    ],
  );

  return { handleProductNameFocus, handleProductNameKeyDown };
}

export default useProductNameKeyboardShortcut;
