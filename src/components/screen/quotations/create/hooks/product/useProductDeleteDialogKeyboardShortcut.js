import { useCallback, useRef } from "react";

function useProductDeleteDialogKeyboardShortcut({ onCancel }) {
  const cancelButtonRef = useRef(null);
  const confirmButtonRef = useRef(null);

  const handleOpenAutoFocus = useCallback((event) => {
    event.preventDefault();
    cancelButtonRef.current?.focus();
  }, []);

  const handleDialogKeyDown = useCallback((event) => {
    if (event.altKey && event.key === "ArrowLeft") {
      event.preventDefault();
      cancelButtonRef.current?.focus();
      return;
    }

    if (event.altKey && event.key === "ArrowRight") {
      event.preventDefault();
      confirmButtonRef.current?.focus();
      return;
    }

    if (event.key !== "Tab") return;

    event.preventDefault();
    const isConfirmFocused =
      document.activeElement === confirmButtonRef.current;

    if (isConfirmFocused) {
      cancelButtonRef.current?.focus();
    } else {
      confirmButtonRef.current?.focus();
    }
  }, []);

  const handleEscapeKeyDown = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      onCancel();
    },
    [onCancel],
  );

  return {
    cancelButtonRef,
    confirmButtonRef,
    handleDialogKeyDown,
    handleEscapeKeyDown,
    handleOpenAutoFocus,
  };
}

export default useProductDeleteDialogKeyboardShortcut;
