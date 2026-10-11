import {
  PURCHASE_PRODUCT_AMOUNT_DECIMAL_PLACES,
  PURCHASE_PRODUCT_AMOUNT_MAX,
  PURCHASE_PRODUCT_NOTES_MAX_LENGTH,
  PURCHASE_QUANTITY_MAX,
  PURCHASE_QUANTITY_MIN,
} from "@Forms/purchaseOrder/purchaseOrder.validation.constants";

const formattedMaximumAmount =
  PURCHASE_PRODUCT_AMOUNT_MAX.toLocaleString("en-IN");

export const PURCHASE_ORDER_VALIDATION_MESSAGES = Object.freeze({
  BILLS_PDF_ONLY: "Only PDF files can be uploaded as bills.",
  RECEIVED_OR_COLLECTED_BY_REQUIRED:
    "Select the employee who received or collected the products.",
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
  UNIT_PRICE_NUMBER: "Unit price must be a number.",
  UNIT_PRICE_MIN: "Unit price cannot be negative.",
  UNIT_PRICE_MAX: `Unit price cannot exceed ₹${formattedMaximumAmount}.`,
  UNIT_PRICE_DECIMALS: `Unit price can have up to ${PURCHASE_PRODUCT_AMOUNT_DECIMAL_PLACES} decimal places.`,
  UNIT_PRICE_REQUIRED: "Unit price is required.",
  UNIT_DISCOUNT_NUMBER: "Unit discount must be a number.",
  UNIT_DISCOUNT_MIN: "Unit discount cannot be negative.",
  UNIT_DISCOUNT_MAX: `Unit discount cannot exceed ₹${formattedMaximumAmount}.`,
  UNIT_DISCOUNT_DECIMALS: `Unit discount can have up to ${PURCHASE_PRODUCT_AMOUNT_DECIMAL_PLACES} decimal places.`,
  UNIT_DISCOUNT_PRICE_MAX: "Unit discount cannot exceed unit price.",
  UNIT_DISCOUNT_REQUIRED: "Unit discount is required.",
  UNIT_GST_INVALID: "Select a valid unit GST rate.",
  UNIT_GST_REQUIRED: "Unit GST is required.",
  UNIT_GST_AMOUNT_REQUIRED: "Unit GST amount is required.",
  FINAL_PRICE_REQUIRED: "Final price is required.",
  NOTES_MAX: `Notes must be ${PURCHASE_PRODUCT_NOTES_MAX_LENGTH.toLocaleString("en-IN")} characters or fewer.`,
});
