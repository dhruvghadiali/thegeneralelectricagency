import { useCallback, useEffect, useRef, useState } from "react";

import { isAltShortcut } from "@keyboard/keyboard.utils";
import { addQuotationKeyboardListener } from "@screenComponent/quotations/keyboardShortcuts/shared/quotationKeyboardListener";

function useProductSummaryKeyboardShortcut({
  productCount,
  onDeleteProduct,
  onEditProduct,
  onNavigateToCompanyInformation,
  onNavigateToProductInformation,
}) {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [focusedProductIndex, setFocusedProductIndex] = useState(null);
  const productRefs = useRef([]);
  const downloadButtonRef = useRef(null);

  useEffect(() => {
    productRefs.current[0]?.focus();
  }, []);

  const setProductRef = useCallback((index, element) => {
    productRefs.current[index] = element;
  }, []);

  const focusProduct = useCallback(
    (index) => {
      if (productCount === 0) return;

      const nextIndex = Math.min(Math.max(index, 0), productCount - 1);

      setActiveProductIndex(nextIndex);
      productRefs.current[nextIndex]?.focus();
    },
    [productCount],
  );

  const handleProductFocus = useCallback((index) => {
    setActiveProductIndex(index);
    setFocusedProductIndex(index);
  }, []);

  useEffect(() => {
    const handleSummaryNavigation = (event) => {
      if (event.defaultPrevented) return;

      if (isAltShortcut(event, "n")) {
        if (event.target?.closest?.('[role="dialog"]')) return;

        event.preventDefault();
        event.stopPropagation();
        onNavigateToProductInformation();
        return;
      }

      const isNavigationKey =
        event.key === "ArrowUp" || event.key === "ArrowDown";
      const isDeleteKey =
        event.key === "Delete" || event.key === "Backspace";

      if (!isNavigationKey && !isDeleteKey) return;

      const focusedElement = document.activeElement;
      const focusedIndex = productRefs.current.findIndex(
        (productElement) =>
          productElement &&
          (productElement === focusedElement ||
            productElement.contains(focusedElement)),
      );
      const isDownloadFocused =
        downloadButtonRef.current === focusedElement ||
        downloadButtonRef.current?.contains(focusedElement);

      if (focusedIndex < 0 && !isDownloadFocused) return;

      event.preventDefault();
      event.stopPropagation();

      if (isDownloadFocused) {
        if (event.key === "ArrowUp") {
          focusProduct(productCount - 1);
        } else if (event.key === "ArrowDown") {
          onNavigateToProductInformation();
        }
        return;
      }

      if (isDeleteKey) {
        onDeleteProduct(focusedIndex);
        return;
      }

      if (event.key === "ArrowUp") {
        if (focusedIndex === 0) {
          onNavigateToCompanyInformation();
        } else {
          focusProduct(focusedIndex - 1);
        }
        return;
      }

      if (focusedIndex === productCount - 1) {
        downloadButtonRef.current?.focus();
      } else {
        focusProduct(focusedIndex + 1);
      }
    };

    return addQuotationKeyboardListener(handleSummaryNavigation, {
      capture: true,
    });
  }, [
    focusProduct,
    onDeleteProduct,
    onNavigateToCompanyInformation,
    onNavigateToProductInformation,
    productCount,
  ]);

  const handleProductBlur = useCallback((event) => {
    if (
      event.relatedTarget &&
      event.currentTarget.contains(event.relatedTarget)
    ) {
      return;
    }

    setFocusedProductIndex(null);
  }, []);

  const handleProductKeyDown = useCallback(
    (event, index) => {
      if (event.key === "Enter" && event.target === event.currentTarget) {
        event.preventDefault();
        onEditProduct(index);
        return;
      }

      const shouldFocusDownload =
        index === productCount - 1 &&
        event.target === event.currentTarget &&
        event.key === "Tab" &&
        !event.shiftKey;

      if (shouldFocusDownload) {
        event.preventDefault();
        downloadButtonRef.current?.focus();
        return;
      }

    },
    [onEditProduct, productCount],
  );

  const handleDownloadButtonKeyDown = useCallback(
    (event) => {
      const shouldOpenProductForm =
        event.key === "Tab" && !event.shiftKey;

      if (!shouldOpenProductForm) return;

      event.preventDefault();
      onNavigateToProductInformation();
    },
    [onNavigateToProductInformation],
  );

  const handleProductDeleted = useCallback(
    (index) => {
      const nextIndex = Math.min(index, productCount - 2);

      if (nextIndex < 0) return;

      window.requestAnimationFrame(() => {
        focusProduct(nextIndex);
      });
    },
    [focusProduct, productCount],
  );

  return {
    activeProductIndex,
    downloadButtonRef,
    focusedProductIndex,
    focusProduct,
    handleDownloadButtonKeyDown,
    handleProductDeleted,
    handleProductBlur,
    handleProductFocus,
    handleProductKeyDown,
    setProductRef,
  };
}

export default useProductSummaryKeyboardShortcut;
