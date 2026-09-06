import {
  PURCHASE_QUANTITY_MAX,
  PURCHASE_QUANTITY_MIN,
} from "@Forms/purchaseOrder/purchaseOrder.validation.constants";

export const PURCHASE_ORDER_VALIDATION_MESSAGES = Object.freeze({
  PRODUCT_REQUIRED: "Select a product.",
  PRODUCTS_REQUIRED: "Add at least one product.",
  PRODUCTS_UNIQUE: "Each product can only be selected once.",
  STANDALONE_STOCK_REQUIRED:
    "Standalone stock count is unavailable. Select the product again.",
  SUPPLIER_REQUIRED: "Select a supplier.",
  QUANTITY_NUMBER: "Quantity must be a whole number.",
  QUANTITY_INTEGER: "Quantity must be a whole number.",
  QUANTITY_MIN: `Quantity must be at least ${PURCHASE_QUANTITY_MIN}.`,
  QUANTITY_MAX: `Quantity cannot exceed ${PURCHASE_QUANTITY_MAX.toLocaleString("en-IN")}.`,
  QUANTITY_REQUIRED: "Quantity is required.",
  QUANTITY_STANDALONE_MAX:
    "Quantity purchased cannot exceed available standalone stock.",
});
