import { COLUMN_TYPES, MOBILE_SLOTS } from "@Enums";
import {
  formatPurchaseCurrency,
  formatPurchaseNumber,
  formatPurchasePercentage,
} from "@Tables/purchase/purchaseTable.utils";

const productColumn = (field, header, formatter = (value) => value || "—") => ({
  key: field,
  header,
  type: COLUMN_TYPES.CUSTOM,
  width: field === "productName" ? "280px" : "180px",
  mobile: field === "productName" ? MOBILE_SLOTS.PRIMARY : MOBILE_SLOTS.META,
  render: (purchase) => (
    <div>
      {purchase.receivedProducts.map((product, index) => (
        <div
          key={product.id ?? index}
          className="flex h-12 items-center whitespace-nowrap border-b tabular-nums last:border-b-0"
        >
          {formatter(product[field])}
        </div>
      ))}
      {!purchase.receivedProducts.length && "—"}
    </div>
  ),
});

export const PURCHASE_TABLE_COLUMNS = [
  {
    key: "supplierName",
    header: "Company name",
    field: "supplierName",
    type: COLUMN_TYPES.TEXT,
    width: "260px",
    mobile: MOBILE_SLOTS.SECONDARY,
  },
  productColumn("productCode", "Product code"),
  productColumn("productName", "Product name"),
  productColumn("stock", "Stock", formatPurchaseNumber),
  productColumn("unitPrice", "Unit price", formatPurchaseCurrency),
  productColumn("unitDiscount", "Unit discount", formatPurchaseCurrency),
  productColumn("unitGst", "Unit GST", formatPurchasePercentage),
  productColumn("unitGstAmount", "Unit GST amount", formatPurchaseCurrency),
  productColumn("finalPrice", "Final price", formatPurchaseCurrency),
  {
    key: "receivedAt",
    header: "Received at",
    field: "receivedAt",
    type: COLUMN_TYPES.DATE,
    sortKey: "received_at",
    width: "190px",
    mobile: MOBILE_SLOTS.META,
  },
  {
    key: "receivedBy",
    header: "Received by",
    field: "receivedBy.name",
    type: COLUMN_TYPES.TEXT,
    width: "220px",
    mobile: MOBILE_SLOTS.META,
  },
];

export default PURCHASE_TABLE_COLUMNS;
