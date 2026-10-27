import { useCallback } from "react";

import handlePreviousFieldKeyboardNavigation, {
  focusNextFormField,
} from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

function useCompanyEmailKeyboardShortcut({
  addressInputRef,
  phoneInputRef,
}) {
  return useCallback(
    (event) => {
      if (
        handlePreviousFieldKeyboardNavigation(event, addressInputRef, {
          requireTabNavigation: true,
        })
      )
        return;

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
      focusNextFormField(event, phoneInputRef);
    },
    [addressInputRef, phoneInputRef],
  );
}

export default useCompanyEmailKeyboardShortcut;
