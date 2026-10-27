import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation, {
  focusNextFormField,
} from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useCompanyAddressKeyboardShortcut({
  companyInputRef,
  emailInputRef,
}) {
  return useCallback(
    (event) => {
      if (
        handlePreviousFieldKeyboardNavigation(event, companyInputRef, {
          requireTabNavigation: true,
        })
      )
        return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        companyInputRef.current?.focus();
        return;
      }

      const shouldFocusEmail =
        (event.altKey && event.key === "ArrowDown") ||
        (event.altKey && event.key === "Enter") ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusEmail) return;

      event.preventDefault();
      focusNextFormField(event, emailInputRef);
    },
    [companyInputRef, emailInputRef],
  );
}

export default useCompanyAddressKeyboardShortcut;
