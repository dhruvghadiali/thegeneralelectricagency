import { useEffect } from "react";

import { isAltShortcut } from "@keyboard/keyboard.utils";
import { addProductKeyboardListener } from "@screenComponent/products/keyboardShortcuts/shared/productKeyboardListener";

function useProductKeyboardShortcut(newProductButtonRef, { enabled = true } = {}) {
  useEffect(() => {
    if (!enabled) return undefined;

    const handleProductShortcut = (event) => {
      if (!isAltShortcut(event, "n")) return;

      event.preventDefault();
      newProductButtonRef.current?.click();
    };

    return addProductKeyboardListener(handleProductShortcut);
  }, [enabled, newProductButtonRef]);
}

export default useProductKeyboardShortcut;
