import { useCallback, useEffect } from "react";

import { isAltShortcut } from "@keyboard/keyboard.utils";
import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";
import { addQuotationKeyboardListener } from "@screenComponent/quotations/keyboardShortcuts/shared/quotationKeyboardListener";

const OPTION_Z_TEXT_VALUES = new Set(["ˀ", "Ω"]);

export function useProductDescriptionUndoKeyboardShortcut({
  enabled,
  canUndoProductDescription,
  onUndoProductDescription,
}) {
  const restoreProductDescription = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      const activeElement = document.activeElement;

      if (activeElement?.matches?.("input, textarea")) {
        activeElement.blur();
      }

      if (canUndoProductDescription) {
        onUndoProductDescription({ focusDescription: false });
      }

      if (activeElement?.matches?.("input, textarea")) {
        window.requestAnimationFrame(() => activeElement.focus());
      }
    },
    [canUndoProductDescription, onUndoProductDescription],
  );
  const handleDescriptionBeforeInput = useCallback(
    (event) => {
      const insertedText = event.nativeEvent?.data ?? event.data;

      if (!enabled || !OPTION_Z_TEXT_VALUES.has(insertedText)) return;

      restoreProductDescription(event);
    },
    [enabled, restoreProductDescription],
  );

  useEffect(() => {
    if (!enabled) return undefined;

    const handleUndoProductDescription = (event) => {
      if (!isAltShortcut(event, "z")) return;

      restoreProductDescription(event);
    };

    return addQuotationKeyboardListener(handleUndoProductDescription, {
      capture: true,
    });
  }, [enabled, restoreProductDescription]);

  return { handleDescriptionBeforeInput };
}

function useProductDescriptionKeyboardShortcut({
  discountInputRef,
  productDeliveryNotesInputRef,
}) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, discountInputRef)) return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        discountInputRef.current?.focus();
        return;
      }

      const shouldFocusDeliveryNotes =
        (event.altKey && event.key === "ArrowDown") ||
        (event.altKey && event.key === "Enter") ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusDeliveryNotes) return;

      event.preventDefault();
      productDeliveryNotesInputRef.current?.focus();
    },
    [discountInputRef, productDeliveryNotesInputRef],
  );
}

export default useProductDescriptionKeyboardShortcut;
