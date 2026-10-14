import { useCallback, useRef } from "react";

function useQuotationDialogKeyboardShortcut({ onClose }) {
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);
  const previouslyFocusedElementRef = useRef(null);
  const shouldRestoreFocusRef = useRef(true);

  const handleOpenAutoFocus = useCallback((event) => {
    event.preventDefault();
    previouslyFocusedElementRef.current = document.activeElement;
    shouldRestoreFocusRef.current = true;
    leftButtonRef.current?.focus();
  }, []);

  const handleCloseAutoFocus = useCallback((event) => {
    if (!shouldRestoreFocusRef.current) return;

    event.preventDefault();
    const previouslyFocusedElement = previouslyFocusedElementRef.current;

    window.requestAnimationFrame(() => {
      if (previouslyFocusedElement?.isConnected) {
        previouslyFocusedElement.focus();
      }
    });
  }, []);

  const skipFocusRestore = useCallback(() => {
    shouldRestoreFocusRef.current = false;
  }, []);

  const handleDialogKeyDown = useCallback((event) => {
    const leftButton = leftButtonRef.current ?? rightButtonRef.current;
    const rightButton = rightButtonRef.current ?? leftButtonRef.current;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      leftButton?.focus();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      rightButton?.focus();
      return;
    }

    if (event.key !== "Tab") return;

    event.preventDefault();
    if (leftButton === rightButton) {
      leftButton?.focus();
      return;
    }

    const isRightButtonFocused = document.activeElement === rightButton;

    if (isRightButtonFocused) {
      leftButton?.focus();
    } else {
      rightButton?.focus();
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
    handleCloseAutoFocus,
    handleDialogKeyDown,
    handleEscapeKeyDown,
    handleOpenAutoFocus,
    leftButtonRef,
    rightButtonRef,
    skipFocusRestore,
  };
}

export default useQuotationDialogKeyboardShortcut;
