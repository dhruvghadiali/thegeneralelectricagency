import { Boxes, IndianRupee, PackageCheck, TriangleAlert } from "lucide-react";
import { useSelector } from "react-redux";

import { selectStockSummary } from "@Redux/stock/stock.selector";
import SummaryCard from "@/components/screen/employees/summaryCard";
import { formatCurrency } from "@/components/screen/stocks/stock.utils";

function StockSummary() {
  const summary = useSelector(selectStockSummary);

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        icon={PackageCheck}
        iconClassName="bg-primary/10 text-primary"
        value={summary.availableUnits.toLocaleString("en-IN")}
        label="Available units on this page"
      />
      <SummaryCard
        icon={TriangleAlert}
        iconClassName="bg-amber-500/10 text-amber-600"
        value={summary.lowStockCount}
        label="Low or out-of-stock products"
      />
      <SummaryCard
        icon={Boxes}
        iconClassName="bg-rose-500/10 text-rose-600"
        value={summary.damagedUnits}
        label="Damaged units on this page"
      />
      <SummaryCard
        icon={IndianRupee}
        iconClassName="bg-emerald-500/10 text-emerald-600"
        value={formatCurrency(summary.inventoryValue)}
        label="Available inventory value"
      />
    </section>
  );
}

export default StockSummary;
