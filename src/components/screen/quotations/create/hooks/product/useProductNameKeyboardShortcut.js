import { useCallback } from "react";

function useProductNameKeyboardShortcut({
  productDirectoryRef,
  quantityInputRef,
  hasProductSummary,
  onNavigateToCompanyInformation,
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
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();

        if (!hasProductSummary) onNavigateToCompanyInformation();
        return;
      }

      if (event.altKey && event.key === "ArrowRight") {
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
      productDirectoryRef,
      quantityInputRef,
    ],
  );

  return { handleProductNameFocus, handleProductNameKeyDown };
}

export default useProductNameKeyboardShortcut;
