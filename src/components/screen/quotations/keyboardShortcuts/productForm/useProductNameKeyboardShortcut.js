import { useCallback } from "react";

import {
  focusNextFormField,
  selectFieldValueWithoutBackwardNavigation,
  shouldNavigateBackwardFromSelectedField,
} from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useProductNameKeyboardShortcut({
  productDirectoryRef,
  quantityInputRef,
  hasProductSummary,
  onNavigateToCompanyInformation,
  onOpenProductSummary,
}) {
  const handleProductNameFocus = useCallback((event) => {
    selectFieldValueWithoutBackwardNavigation(event.currentTarget);
  }, []);

  const handleProductNameKeyDown = useCallback(
    (event) => {
      const shouldNavigateBackward =
        (event.altKey && event.key === "ArrowUp") ||
        shouldNavigateBackwardFromSelectedField(event);

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
      focusNextFormField(event, quantityInputRef);
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
