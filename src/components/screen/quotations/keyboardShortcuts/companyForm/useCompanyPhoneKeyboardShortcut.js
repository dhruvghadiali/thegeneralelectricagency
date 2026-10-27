import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation, {
  focusNextFormField,
} from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useCompanyPhoneKeyboardShortcut({ emailInputRef, gstInputRef }) {
  return useCallback(
    (event) => {
      if (
        handlePreviousFieldKeyboardNavigation(event, emailInputRef, {
          requireTabNavigation: true,
        })
      )
        return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        emailInputRef.current?.focus();
        return;
      }

      const shouldFocusGst =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusGst) return;

      event.preventDefault();
      focusNextFormField(event, gstInputRef);
    },
    [emailInputRef, gstInputRef],
  );
}

export default useCompanyPhoneKeyboardShortcut;
