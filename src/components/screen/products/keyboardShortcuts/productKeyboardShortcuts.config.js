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
      keys: "Backspace / Delete",
      context: "Product table row",
      action: "Return to product search",
    },
  ],
});
