import { useEffect } from "react";

import { isAltShortcut } from "@keyboard/keyboard.utils";
import { addQuotationKeyboardListener } from "@screenComponent/quotations/keyboardShortcuts/shared/quotationKeyboardListener";

function useOpenQuotationSummaryKeyboardShortcut({ enabled, onOpen }) {
  useEffect(() => {
    if (!enabled) return undefined;

    const handleOpenQuotationSummary = (event) => {
      if (!isAltShortcut(event, "d")) return;

      event.preventDefault();
      onOpen();
    };

    return addQuotationKeyboardListener(handleOpenQuotationSummary, {
      capture: true,
    });
  }, [enabled, onOpen]);
}

export default useOpenQuotationSummaryKeyboardShortcut;
