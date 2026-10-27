import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation, {
  focusNextFormField,
} from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useCompanyGstKeyboardShortcut({ phoneInputRef, saveButtonRef }) {
  return useCallback(
    (event) => {
      if (
        handlePreviousFieldKeyboardNavigation(event, phoneInputRef, {
          requireTabNavigation: true,
        })
      )
        return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        phoneInputRef.current?.focus();
        return;
      }

      if (event.altKey && event.key === "ArrowDown") {
        event.preventDefault();
        saveButtonRef.current?.focus();
        return;
      }

      const shouldFocusSave =
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusSave) return;

      event.preventDefault();
      focusNextFormField(event, saveButtonRef);
    },
    [phoneInputRef, saveButtonRef],
  );
}

export default useCompanyGstKeyboardShortcut;
