export const QUOTATION_KEYBOARD_SHORTCUTS = Object.freeze({
  quotationList: [
    { keys: "Alt+N", action: "Open a new quotation" },
    { keys: "Escape", action: "Return to the dashboard" },
  ],
  quotationPage: [
    {
      keys: "Escape",
      action: "Return to products from summary, or exit the quotation page",
    },
  ],
  companyForm: [
    {
      keys: "ArrowUp / ArrowDown",
      context: "Company name",
      action: "Focus the selected or first company directory option",
    },
    {
      keys: "Alt+ArrowRight",
      context: "Company name",
      action: "Focus the company directory",
    },
    {
      keys: "ArrowLeft",
      context: "Company directory",
      action: "Return to the company name field",
    },
    {
      keys: "ArrowUp / ArrowDown",
      context: "Company directory",
      action: "Move between company options",
    },
    {
      keys: "Alt+ArrowUp / Alt+ArrowDown / Enter / Tab",
      action: "Move between company form fields",
    },
    {
      keys: "Backspace / Delete",
      action: "Move to the previous company field before editing",
    },
  ],
  productForm: [
    {
      keys: "ArrowUp / ArrowDown",
      context: "Product name",
      action: "Focus the selected or first product directory option",
    },
    {
      keys: "Alt+ArrowRight",
      context: "Product name",
      action: "Focus the product directory",
    },
    {
      keys: "ArrowLeft",
      context: "Product directory",
      action: "Return to the product name field",
    },
    {
      keys: "ArrowUp / ArrowDown",
      context: "Product directory",
      action: "Move between product options",
    },
    {
      keys: "Alt+ArrowUp / Alt+ArrowDown / Enter / Tab",
      action: "Move between product form fields",
    },
    {
      keys: "Backspace / Delete",
      action: "Move to the previous product field before editing",
    },
  ],
  productSummary: [
    { keys: "ArrowUp / ArrowDown", action: "Move through summary products" },
    { keys: "Enter", action: "Edit the focused product" },
    {
      keys: "Delete / Backspace",
      action: "Request deletion of the focused product",
    },
    { keys: "Alt+D", action: "Open the quotation summary" },
    {
      keys: "Tab",
      action: "Move from the final product to summary, then to product form",
    },
  ],
  quotationSummary: [
    {
      keys: "Alt+ArrowUp / Alt+ArrowDown / Enter / Tab",
      action: "Move through quotation summary sections and actions",
    },
    {
      keys: "Backspace / Delete",
      action: "Move to the previous summary field before editing",
    },
    { keys: "Escape", action: "Return to product information" },
  ],
  dialogs: [
    { keys: "ArrowLeft / ArrowRight", action: "Move between dialog actions" },
    { keys: "Tab", action: "Cycle between dialog actions" },
    { keys: "Escape", action: "Close the active dialog" },
  ],
});
