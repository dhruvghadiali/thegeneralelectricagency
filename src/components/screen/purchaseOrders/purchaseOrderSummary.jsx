import { PackageCheck, ReceiptIndianRupee, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { selectPurchaseSummary } from "@Redux/purchase/purchase.selector";
import SummaryCard from "@commonComponent/summaryCard";
import {
  formatCurrency,
  formatNumber,
} from "@Tables/product/productTable.utils";
export default function PurchaseOrderSummary() {
  const summary = useSelector(selectPurchaseSummary);
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <SummaryCard
        icon={ShoppingCart}
        iconClassName="bg-primary/10 text-primary"
        value={formatNumber(summary.totalPurchases)}
        label="Total purchases"
      />
      <SummaryCard
        icon={PackageCheck}
        iconClassName="bg-emerald-500/10 text-emerald-600"
        value={formatNumber(summary.totalUnitsReceived)}
        label="Total units received"
      />
      <SummaryCard
        icon={ReceiptIndianRupee}
        iconClassName="bg-sky-500/10 text-sky-600"
        value={formatCurrency(summary.totalReceivedValue)}
        label="Total received value"
      />
    </section>
  );
}
