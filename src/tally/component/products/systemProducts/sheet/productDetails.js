import { formatCurrency, formatPercentage } from "@Tables/product/productTable.utils";
import { DATE_FORMATS, formatDate } from "@/utils/date.util";

const yesNo = (value) => value == null ? "—" : value ? "Yes" : "No";
const status = (value) => value == null ? "—" : value ? "Active" : "Inactive";
const dateTime = (value) => formatDate(value, DATE_FORMATS.DATE_TIME);

export const PRODUCT_DETAILS = [
  {
    title: "Product information",
    fields: [
      ["Record ID", "_id"],
      ["Product ID", "product_id"],
      ["Product master ID", "product_master_id"],
      ["Product alter ID", "product_alter_id"],
      ["Product name", "name"],
      ["Product code", "product_code"],
      ["Category", "category"],
      ["Agency", "agency"],
      ["Model number", "model_number"],
      ["Description", "description"],
    ],
  },
  {
    title: "Pricing",
    fields: [
      ["Purchase price", "purchase_price", formatCurrency],
      ["Sale price", "sale_price", formatCurrency],
      ["Discount amount", "discount_amount", formatCurrency],
      ["Discount percentage", "discount_percentage", formatPercentage],
    ],
  },
  {
    title: "Tax and stock",
    fields: [
      ["HSN code", "hsn_code"],
      ["GST percentage", "gst_percentage", formatPercentage],
      ["Stock group", "stock_group"],
      ["Base unit", "base_unit"],
      ["GST applicable", "gst_applicable"],
      ["Type of supply", "type_of_supply"],
    ],
  },
  {
    title: "Status and activity",
    fields: [
      ["System generated", "is_system_generated", yesNo],
      ["Status", "is_active", status],
      ["Created at", "created_at", dateTime],
      ["Updated at", "updated_at", dateTime],
    ],
  },
  {
    title: "Created by",
    fields: [
      ["User ID", "created_by._id"],
      ["Employee ID", "created_by.emp_id"],
      ["Username", "created_by.username"],
      ["First name", "created_by.first_name"],
      ["Last name", "created_by.last_name"],
    ],
  },
  {
    title: "Updated by",
    fields: [
      ["User ID", "updated_by._id"],
      ["Employee ID", "updated_by.emp_id"],
      ["Username", "updated_by.username"],
      ["First name", "updated_by.first_name"],
      ["Last name", "updated_by.last_name"],
    ],
  },
];
