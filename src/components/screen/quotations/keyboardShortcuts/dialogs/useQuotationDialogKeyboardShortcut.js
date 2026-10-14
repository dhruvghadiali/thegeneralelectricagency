import { useCallback, useRef } from "react";

function useQuotationDialogKeyboardShortcut({ onClose }) {
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);

  const handleOpenAutoFocus = useCallback((event) => {
    event.preventDefault();
    leftButtonRef.current?.focus();
  }, []);

  const handleDialogKeyDown = useCallback((event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      leftButtonRef.current?.focus();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      rightButtonRef.current?.focus();
      return;
    }

    if (event.key !== "Tab") return;

    event.preventDefault();
    const isRightButtonFocused =
      document.activeElement === rightButtonRef.current;

    if (isRightButtonFocused) {
      leftButtonRef.current?.focus();
    } else {
      rightButtonRef.current?.focus();
    }
  }, []);

  const handleEscapeKeyDown = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClose();
    },
    [onClose],
  );

  return {
    handleDialogKeyDown,
    handleEscapeKeyDown,
    handleOpenAutoFocus,
    leftButtonRef,
    rightButtonRef,
  };
}

export default useQuotationDialogKeyboardShortcut;
