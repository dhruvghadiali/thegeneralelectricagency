import { useCallback } from "react";

import { isDesktopKeyboardEnabled } from "@keyboard/keyboard.utils";
import useQuotationDialogKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/dialogs/useQuotationDialogKeyboardShortcut";

const NO_SHORTCUT_KEY = "n";
const YES_SHORTCUT_KEY = "y";

function useQuotationPdfDiscountDialogKeyboardShortcut({
  onCancel,
  onNo,
  onYes,
}) {
  const keyboard = useQuotationDialogKeyboardShortcut({ onClose: onCancel });
  const handleDialogKeyDown = useCallback(
    (event) => {
      if (!isDesktopKeyboardEnabled()) return;

      const key = event.key.toLowerCase();
      const hasModifier = event.altKey || event.ctrlKey || event.metaKey;

      if (!hasModifier && key === NO_SHORTCUT_KEY) {
        event.preventDefault();
        event.stopPropagation();
        onNo();
        return;
      }

      if (!hasModifier && key === YES_SHORTCUT_KEY) {
        event.preventDefault();
        event.stopPropagation();
        onYes();
        return;
      }

      keyboard.handleDialogKeyDown(event);
    },
    [keyboard, onNo, onYes],
  );

  return { ...keyboard, handleDialogKeyDown };
}

export default useQuotationPdfDiscountDialogKeyboardShortcut;
