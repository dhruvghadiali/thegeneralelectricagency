import { useCallback } from "react";

function useCompanyEmailKeyboardShortcut({
  addressInputRef,
  phoneInputRef,
}) {
  return useCallback(
    (event) => {
      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        addressInputRef.current?.focus();
        return;
      }

      const shouldFocusPhone =
        (event.altKey && event.key === "ArrowDown") ||
        event.key === "Enter" ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusPhone) return;

      event.preventDefault();
      phoneInputRef.current?.focus();
    },
    [addressInputRef, phoneInputRef],
  );
}

export default useCompanyEmailKeyboardShortcut;
