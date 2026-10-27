import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation, {
  focusNextFormField,
} from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useCompanySaveKeyboardShortcut({ companyInputRef, gstInputRef }) {
  return useCallback(
    (event) => {
      if (
        handlePreviousFieldKeyboardNavigation(event, gstInputRef, {
          requireTabNavigation: true,
        })
      )
        return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        gstInputRef.current?.focus();
        return;
      }

      const shouldFocusCompany =
        (event.altKey && event.key === "ArrowDown") ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusCompany) return;

      event.preventDefault();
      focusNextFormField(event, companyInputRef);
    },
    [companyInputRef, gstInputRef],
  );
}

export default useCompanySaveKeyboardShortcut;
