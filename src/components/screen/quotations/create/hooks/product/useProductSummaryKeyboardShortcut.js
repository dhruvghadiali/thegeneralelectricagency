import { useCallback, useEffect, useRef, useState } from "react";

import { isAltShortcut } from "@keyboard/keyboard.utils";

function useProductSummaryKeyboardShortcut({
  productCount,
  onDeleteProduct,
  onEditProduct,
  onNavigateToCompanyInformation,
  onNavigateToProductInformation,
  onOpenQuotationSummary,
}) {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [focusedProductIndex, setFocusedProductIndex] = useState(null);
  const productRefs = useRef([]);
  const downloadButtonRef = useRef(null);

  useEffect(() => {
    productRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    const handleQuotationSummaryShortcut = (event) => {
      if (!isAltShortcut(event, "d")) return;

      event.preventDefault();
      onOpenQuotationSummary();
    };

    window.addEventListener("keydown", handleQuotationSummaryShortcut, true);
    return () =>
      window.removeEventListener(
        "keydown",
        handleQuotationSummaryShortcut,
        true,
      );
  }, [onOpenQuotationSummary]);

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

      const isDeleteKey =
        event.key === "Delete" || event.key === "Backspace";

      if (isDeleteKey) {
        event.preventDefault();
        onDeleteProduct(index);
        return;
      }

      const shouldFocusDownload =
        index === productCount - 1 &&
        event.target === event.currentTarget &&
        ((event.altKey && event.key === "ArrowDown") ||
          (event.key === "Tab" && !event.shiftKey));

      if (shouldFocusDownload) {
        event.preventDefault();
        downloadButtonRef.current?.focus();
        return;
      }

      if (!event.altKey) return;

      if (event.key === "ArrowUp") {
        event.preventDefault();

        if (index === 0) {
          onNavigateToCompanyInformation();
          return;
        }

        focusProduct(index - 1);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusProduct(index + 1);
      }
    },
    [
      focusProduct,
      onDeleteProduct,
      onEditProduct,
      onNavigateToCompanyInformation,
      productCount,
    ],
  );

  const handleDownloadButtonKeyDown = useCallback(
    (event) => {
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        focusProduct(productCount - 1);
        return;
      }

      const shouldOpenProductForm =
        (event.altKey && event.key === "ArrowDown") ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldOpenProductForm) return;

      event.preventDefault();
      onNavigateToProductInformation();
    },
    [focusProduct, onNavigateToProductInformation, productCount],
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
