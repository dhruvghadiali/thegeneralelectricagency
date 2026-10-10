import { useCallback } from "react";

function useCompanySaveKeyboardShortcut({ companyInputRef, gstInputRef }) {
  return useCallback(
    (event) => {
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
