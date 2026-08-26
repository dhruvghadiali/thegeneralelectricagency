import { Building2, CalendarDays, IndianRupee } from "lucide-react";

import {
  COLUMN_TYPES,
  MOBILE_SLOTS,
} from "@Enums";
import {
  formatCurrency,
  formatNumber,
} from "@Tables/product/productTable.utils";

export const PURCHASE_CREDIT_TABLE_COLUMNS = [
  {
    key: "purchaseAt",
    header: "Purchase date",
    filterLabel: "Purchase date",
    type: COLUMN_TYPES.DATE,
    field: "purchaseAt",
    sortKey: "credited_at",
    filterKey: "credited",
    className: "whitespace-nowrap",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: CalendarDays,
    mobileLabel: "Purchased",
    width: "180px",
  },
  {
    key: "purchaseAmount",
    header: "Purchase amount",
    type: COLUMN_TYPES.CUSTOM,
    field: "purchaseAmount",
    className: "whitespace-nowrap tabular-nums font-medium",
    mobile: MOBILE_SLOTS.META,
    mobileIcon: IndianRupee,
    width: "190px",
    render: (purchaseCredit) => formatCurrency(purchaseCredit.purchaseAmount),
  },
  {
    key: "paymentAmount",
    header: "Payment amount",
    type: COLUMN_TYPES.NUMBER,
    field: "paymentAmount",
    className: "whitespace-nowrap tabular-nums",
    width: "190px",
    render: (purchaseCredit) => formatCurrency(purchaseCredit.paymentAmount),
  },
  {
    key: "plannedAmount",
    header: "Planned amount",
    type: COLUMN_TYPES.NUMBER,
    field: "plannedAmount",
    className: "whitespace-nowrap tabular-nums",
    width: "180px",
    render: (purchaseCredit) => formatCurrency(purchaseCredit.plannedAmount),
  },
  {
    key: "remainingPaymentAmount",
    header: "Remaining amount",
    type: COLUMN_TYPES.CUSTOM,
    field: "availableAmount",
    className: "whitespace-nowrap tabular-nums font-medium",
    width: "230px",
    render: (purchaseCredit) => formatCurrency(purchaseCredit.availableAmount),
  },
  {
    key: "productNames",
    header: "Products",
    filterLabel: "Product name",
    type: COLUMN_TYPES.TEXT,
    field: "productNames",
    filterKey: "product_name",
    className: "min-w-64",
    mobile: MOBILE_SLOTS.SECONDARY,
    width: "500px",
    render: (purchaseCredit) => (
      <div>
        <p className="line-clamp-1">{purchaseCredit.productNames || "—"}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {purchaseCredit.products.length} product
          {purchaseCredit.products.length === 1 ? "" : "s"} ·{" "}
          {formatNumber(purchaseCredit.totalStock)} stock
        </p>
      </div>
    ),
  },
  {
    key: "expectedDeliveryDate",
    header: "Expected delivery",
    filterLabel: "Expected delivery",
    type: COLUMN_TYPES.DATE,
    field: "expectedDeliveryDate",
    sortKey: "expected_delivery_date",
    filterKey: "expected_delivery_date",
    className: "whitespace-nowrap",
    width: "200px",
  },
  {
    key: "supplierName",
    header: "Supplier",
    filterLabel: "Supplier name",
    type: COLUMN_TYPES.TEXT,
    field: "supplierName",
    sortKey: "supplier_name",
    filterKey: "supplier_name",
    className: "min-w-64 font-medium",
    mobile: MOBILE_SLOTS.PRIMARY,
    mobileIcon: Building2,
    width: "500px",
  },
];
