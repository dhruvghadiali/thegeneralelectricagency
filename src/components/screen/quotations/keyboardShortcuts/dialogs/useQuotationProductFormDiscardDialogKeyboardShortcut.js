import { useCallback } from "react";

import { isDesktopKeyboardEnabled } from "@keyboard/keyboard.utils";
import useQuotationDialogKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/dialogs/useQuotationDialogKeyboardShortcut";

function useQuotationProductFormDiscardDialogKeyboardShortcut({
  onCancel,
  onConfirm,
}) {
  const keyboard = useQuotationDialogKeyboardShortcut({
    onClose: onCancel,
    initialFocus: "right",
  });
  const handleDialogKeyDown = useCallback(
    (event) => {
      if (!isDesktopKeyboardEnabled()) return;

      if (event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();

        if (document.activeElement === keyboard.leftButtonRef.current) {
          onCancel();
        } else {
          onConfirm();
        }
        return;
      }

      keyboard.handleDialogKeyDown(event);
    },
    [keyboard, onCancel, onConfirm],
  );

  return { ...keyboard, handleDialogKeyDown };
}

export default useQuotationProductFormDiscardDialogKeyboardShortcut;
