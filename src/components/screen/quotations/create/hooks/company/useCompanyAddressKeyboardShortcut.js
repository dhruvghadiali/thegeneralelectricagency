import { useCallback } from "react";

function useCompanyAddressKeyboardShortcut({
  companyInputRef,
  emailInputRef,
}) {
  return useCallback(
    (event) => {
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
      emailInputRef.current?.focus();
    },
    [companyInputRef, emailInputRef],
  );
}

export default useCompanyAddressKeyboardShortcut;
