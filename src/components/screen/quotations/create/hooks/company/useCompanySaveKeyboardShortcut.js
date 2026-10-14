import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/hooks/handlePreviousFieldKeyboardNavigation";

function useCompanySaveKeyboardShortcut({ companyInputRef, gstInputRef }) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, gstInputRef)) return;

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
      companyInputRef.current?.focus();
    },
    [companyInputRef, gstInputRef],
  );
}

export default useCompanySaveKeyboardShortcut;
