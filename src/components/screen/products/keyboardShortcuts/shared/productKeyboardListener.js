import { addDesktopKeyboardListener } from "@keyboard/keyboard.utils";

export function addProductKeyboardListener(
  listener,
  { capture = false } = {},
) {
  return addDesktopKeyboardListener(listener, { capture });
}
