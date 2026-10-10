import { useCallback, useEffect, useRef, useState } from "react";

function useProductSummaryKeyboardShortcut({
  productCount,
  onDeleteProduct,
  onNavigateToCompanyInformation,
  onNavigateToProductInformation,
}) {
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const productRefs = useRef([]);

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
  }, []);

  const handleProductKeyDown = useCallback(
    (event, index) => {
      const isDeleteKey =
        event.key === "Delete" || event.key === "Backspace";

      if (isDeleteKey) {
        event.preventDefault();
        onDeleteProduct(index);
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

        if (index === productCount - 1) {
          onNavigateToProductInformation();
          return;
        }

        focusProduct(index + 1);
      }
    },
    [
      focusProduct,
      onDeleteProduct,
      onNavigateToCompanyInformation,
      onNavigateToProductInformation,
      productCount,
    ],
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
    focusProduct,
    handleProductDeleted,
    handleProductFocus,
    handleProductKeyDown,
    setProductRef,
  };
}

export default useProductSummaryKeyboardShortcut;
