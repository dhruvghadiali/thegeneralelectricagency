import { useCallback, useRef } from "react";

function useProductAddAnotherDialogKeyboardShortcut({ onNo }) {
  const noButtonRef = useRef(null);
  const yesButtonRef = useRef(null);

  const handleOpenAutoFocus = useCallback((event) => {
    event.preventDefault();
    noButtonRef.current?.focus();
  }, []);

  const handleDialogKeyDown = useCallback((event) => {
    if (event.altKey && event.key === "ArrowLeft") {
      event.preventDefault();
      noButtonRef.current?.focus();
      return;
    }

    if (event.altKey && event.key === "ArrowRight") {
      event.preventDefault();
      yesButtonRef.current?.focus();
      return;
    }

    if (event.key !== "Tab") return;

    event.preventDefault();
    const isYesFocused = document.activeElement === yesButtonRef.current;

    if (isYesFocused) {
      noButtonRef.current?.focus();
    } else {
      yesButtonRef.current?.focus();
    }
  }, []);

  const handleEscapeKeyDown = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onNo();
    },
    [onNo],
  );

  return {
    noButtonRef,
    yesButtonRef,
    handleDialogKeyDown,
    handleEscapeKeyDown,
    handleOpenAutoFocus,
  };
}

export default useProductAddAnotherDialogKeyboardShortcut;
