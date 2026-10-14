import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/hooks/handlePreviousFieldKeyboardNavigation";

function useCompanyPhoneKeyboardShortcut({ emailInputRef, gstInputRef }) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, emailInputRef)) return;

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
      gstInputRef.current?.focus();
    },
    [emailInputRef, gstInputRef],
  );
}

export default useCompanyPhoneKeyboardShortcut;
