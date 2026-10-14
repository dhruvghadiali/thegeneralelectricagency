import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/hooks/handlePreviousFieldKeyboardNavigation";

function useBackButtonKeyboardShortcut({
  finalBillDetailsRef,
  submitButtonRef,
}) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, finalBillDetailsRef))
        return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        finalBillDetailsRef.current?.focus();
        return;
      }

      const shouldFocusSubmit =
        (event.altKey && event.key === "ArrowDown") ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusSubmit) return;

      event.preventDefault();
      submitButtonRef.current?.focus();
    },
    [finalBillDetailsRef, submitButtonRef],
  );
}

export default useBackButtonKeyboardShortcut;
