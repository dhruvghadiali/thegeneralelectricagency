import { useCallback, useEffect } from "react";

import { isAltShortcut } from "@keyboard/keyboard.utils";
import handlePreviousFieldKeyboardNavigation from "@screenComponent/quotations/keyboardShortcuts/shared/handlePreviousFieldKeyboardNavigation";

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

    window.addEventListener("keydown", handleUndoProductDescription, true);

    return () =>
      window.removeEventListener("keydown", handleUndoProductDescription, true);
  }, [enabled, restoreProductDescription]);

  return { handleDescriptionBeforeInput };
}

function useProductDescriptionKeyboardShortcut({
  discountInputRef,
  saveButtonRef,
}) {
  return useCallback(
    (event) => {
      if (handlePreviousFieldKeyboardNavigation(event, discountInputRef)) return;

      if (event.altKey && event.key === "ArrowUp") {
        event.preventDefault();
        discountInputRef.current?.focus();
        return;
      }

      const shouldFocusSave =
        (event.altKey && event.key === "ArrowDown") ||
        (event.altKey && event.key === "Enter") ||
        (event.key === "Tab" && !event.shiftKey);

      if (!shouldFocusSave) return;

      event.preventDefault();
      saveButtonRef.current?.focus();
    },
    [discountInputRef, saveButtonRef],
  );
}

export default useProductDescriptionKeyboardShortcut;
