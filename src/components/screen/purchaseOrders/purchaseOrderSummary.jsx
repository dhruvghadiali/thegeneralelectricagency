import {
  CircleDollarSign,
  Clock3,
  IndianRupee,
  ReceiptIndianRupee,
  ShoppingCart,
} from "lucide-react";
import { useSelector } from "react-redux";

import { selectPurchaseSummary } from "@Redux/purchase/purchase.selector";
import SummaryCard from "@commonComponent/summaryCard";
import { formatCurrency } from "@Tables/product/productTable.utils";

function PurchaseOrderSummary() {
  const summary = useSelector(selectPurchaseSummary);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <SummaryCard
        icon={ShoppingCart}
        iconClassName="bg-primary/10 text-primary"
        value={summary.totalPurchases.toLocaleString("en-IN")}
        label="Total purchases"
      />
      <SummaryCard
        icon={Clock3}
        iconClassName="bg-amber-500/10 text-amber-600"
        value={summary.pendingDeliveries.toLocaleString("en-IN")}
        label="Pending deliveries"
      />
      <SummaryCard
        icon={ReceiptIndianRupee}
        iconClassName="bg-sky-500/10 text-sky-600"
        value={formatCurrency(summary.totalBillAmount)}
        label="Total bill amount"
      />
      <SummaryCard
        icon={IndianRupee}
        iconClassName="bg-emerald-500/10 text-emerald-600"
        value={formatCurrency(summary.totalPaidAmount)}
        label="Total paid"
      />
      <SummaryCard
        icon={CircleDollarSign}
        iconClassName="bg-destructive/10 text-destructive"
        value={formatCurrency(summary.outstandingAmount)}
        label="Outstanding"
      />
    </section>
  );
}

export default PurchaseOrderSummary;
