import { useCallback } from "react";

import { isDesktopKeyboardEnabled } from "@keyboard/keyboard.utils";
import useQuotationDialogKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/dialogs/useQuotationDialogKeyboardShortcut";

const CANCEL_SHORTCUT_KEY = "n";
const PROCEED_SHORTCUT_KEY = "y";

function useQuotationUnsavedCompanyDialogKeyboardShortcut({
  onCancel,
  onProceed,
}) {
  const keyboard = useQuotationDialogKeyboardShortcut({
    onClose: onCancel,
    initialFocus: "right",
  });
  const handleDialogKeyDown = useCallback(
    (event) => {
      if (!isDesktopKeyboardEnabled()) return;

      const key = event.key.toLowerCase();
      const hasModifier = event.altKey || event.ctrlKey || event.metaKey;

      if (!hasModifier && key === CANCEL_SHORTCUT_KEY) {
        event.preventDefault();
        event.stopPropagation();
        onCancel();
        return;
      }

      if (!hasModifier && key === PROCEED_SHORTCUT_KEY) {
        event.preventDefault();
        event.stopPropagation();
        onProceed();
        return;
      }

      keyboard.handleDialogKeyDown(event);
    },
    [keyboard, onCancel, onProceed],
  );

  return { ...keyboard, handleDialogKeyDown };
}

export default useQuotationUnsavedCompanyDialogKeyboardShortcut;
