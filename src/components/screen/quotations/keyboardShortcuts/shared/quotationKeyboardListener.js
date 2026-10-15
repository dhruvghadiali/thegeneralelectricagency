export function addQuotationKeyboardListener(
  listener,
  { capture = false } = {},
) {
  window.addEventListener("keydown", listener, capture);

  return () => {
    window.removeEventListener("keydown", listener, capture);
  };
}
