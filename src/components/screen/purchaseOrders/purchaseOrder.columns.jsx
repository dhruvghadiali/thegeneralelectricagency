import {
  COLUMN_TYPES,
  MOBILE_SLOTS,
  PAYMENT_STATUS_OPTIONS,
  PAYMENT_STATUSES,
} from "@Enums";
import { Badge } from "@shadcnComponent/badge";
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
} from "@screenComponent/products/product.utils";

const PAYMENT_STATUS_VARIANTS = {
  [PAYMENT_STATUSES.PAID]: "success",
  [PAYMENT_STATUSES.FAILED]: "destructive",
  [PAYMENT_STATUSES.CANCELLED]: "destructive",
  [PAYMENT_STATUSES.REFUNDED]: "secondary",
  [PAYMENT_STATUSES.PENDING]: "outline",
};

const paymentStatusLabel = (value) =>
  PAYMENT_STATUS_OPTIONS.find((option) => option.value === value)?.label ??
  "Pending";

export const PURCHASE_ORDER_COLUMNS = [
  {
    key: "id",
    header: "Purchase ID",
    filterLabel: "Purchase ID",
    type: COLUMN_TYPES.TEXT,
    field: "id",
    sortKey: "_id",
    filterKey: "_id",
    className: "whitespace-nowrap font-medium",
    mobile: MOBILE_SLOTS.SECONDARY,
    width: "190px",
    render: (purchase) => purchase.id ?? "—",
  },
  {
    key: "productName",
    header: "Product",
    filterLabel: "Product name",
    type: COLUMN_TYPES.TEXT,
    field: "productName",
    sortKey: "product_name",
    filterKey: "product",
    className: "min-w-56 font-medium",
    mobile: MOBILE_SLOTS.PRIMARY,
    width: "280px",
  },
  {
    key: "supplierName",
    header: "Supplier",
    filterLabel: "Supplier name",
    type: COLUMN_TYPES.TEXT,
    field: "supplierName",
    sortKey: "supplier_name",
    filterKey: "supplier",
    className: "min-w-56",
    mobile: MOBILE_SLOTS.META,
    width: "280px",
  },
  {
    key: "purchaseDate",
    header: "Purchase date",
    filterLabel: "Purchase date",
    type: COLUMN_TYPES.DATE,
    field: "purchaseDate",
    sortKey: "purchase_date",
    filterKey: "purchase_date",
    className: "whitespace-nowrap",
    mobile: MOBILE_SLOTS.META,
    mobileLabel: "Purchased",
    width: "180px",
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
    key: "quantityPurchased",
    header: "Quantity",
    filterLabel: "Quantity",
    type: COLUMN_TYPES.NUMBER,
    field: "quantityPurchased",
    sortKey: "quantity_purchased",
    filterKey: "quantity_purchased",
    className: "whitespace-nowrap tabular-nums",
    width: "150px",
    render: (purchase) => formatNumber(purchase.quantityPurchased),
  },
  {
    key: "billAmount",
    header: "Bill amount",
    filterLabel: "Bill amount",
    type: COLUMN_TYPES.NUMBER,
    field: "billAmount",
    sortKey: "bill_amount",
    filterKey: "bill_amount",
    className: "whitespace-nowrap tabular-nums",
    mobile: MOBILE_SLOTS.META,
    width: "170px",
    render: (purchase) => formatCurrency(purchase.billAmount),
  },
  {
    key: "actualPaidAmount",
    header: "Amount paid",
    filterLabel: "Amount paid",
    type: COLUMN_TYPES.NUMBER,
    field: "actualPaidAmount",
    sortKey: "actual_paid_amount",
    filterKey: "actual_paid_amount",
    className: "whitespace-nowrap tabular-nums",
    width: "170px",
    render: (purchase) => formatCurrency(purchase.actualPaidAmount),
  },
  {
    key: "gstPercentage",
    header: "GST",
    filterLabel: "GST percentage",
    type: COLUMN_TYPES.NUMBER,
    field: "gstPercentage",
    sortKey: "gst_percentage",
    filterKey: "gst_percentage",
    className: "whitespace-nowrap tabular-nums",
    width: "130px",
    render: (purchase) => formatPercentage(purchase.gstPercentage),
  },
  {
    key: "paymentStatus",
    header: "Payment status",
    filterLabel: "Payment status",
    type: COLUMN_TYPES.SELECT,
    field: "paymentStatus",
    filterKey: "payment_status",
    options: PAYMENT_STATUS_OPTIONS,
    allOptionLabel: "All payment statuses",
    mobile: MOBILE_SLOTS.BADGE,
    width: "180px",
    render: (purchase) => {
      const status = purchase.paymentStatus ?? PAYMENT_STATUSES.PENDING;

      return (
        <Badge variant={PAYMENT_STATUS_VARIANTS[status] ?? "outline"}>
          {paymentStatusLabel(status)}
        </Badge>
      );
    },
  },
];
