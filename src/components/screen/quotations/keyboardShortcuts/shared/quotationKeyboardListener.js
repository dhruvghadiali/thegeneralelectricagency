import { addDesktopKeyboardListener } from "@keyboard/keyboard.utils";

export function addQuotationKeyboardListener(
  listener,
  { capture = false } = {},
) {
  return addDesktopKeyboardListener(listener, { capture });
}
