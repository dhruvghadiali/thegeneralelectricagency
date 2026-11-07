export const PRODUCT_KEYBOARD_SHORTCUTS = Object.freeze({
  productList: [
    { keys: "Alt+N", action: "Add a new product" },
    {
      keys: "Tab",
      context: "Product search",
      action: "Focus the first product row",
    },
    {
      keys: "ArrowUp / ArrowDown",
      context: "Product table row",
      action: "Move between product rows",
    },
    {
      keys: "Enter",
      context: "Product table row",
      action: "Open the product actions dialog",
    },
    {
      keys: "Backspace / Delete",
      context: "Product table row",
      action: "Return to product search",
    },
  ],
  dialogs: [
    { keys: "ArrowLeft / ArrowRight", action: "Move between dialog actions" },
    { keys: "Tab", action: "Cycle between dialog actions" },
    { keys: "Enter", action: "Perform the focused dialog action" },
    { keys: "Escape", action: "Close the product dialog" },
  ],
});
