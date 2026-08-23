import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarRange,
  CircleDollarSign,
  IndianRupee,
  ReceiptIndianRupee,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@shadcnComponent/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";
import SummaryCard from "@commonComponent/summaryCard";
import { formatCurrency } from "@Tables/product/productTable.utils";
import {
  MonthlyPurchaseChart,
  PaymentAllocationChart,
} from "@screenComponent/purchaseFinancialSummary/purchaseFinancialCharts";
import {
  FINANCIAL_YEAR_OPTIONS,
  getFinancialSummaryData,
} from "@screenComponent/purchaseFinancialSummary/purchaseFinancialSummary.data";
import {
  CategorySpendTable,
  SupplierSpendTable,
} from "@screenComponent/purchaseFinancialSummary/purchaseFinancialTables";

function PurchaseFinancialSummary() {
  const navigate = useNavigate();
  const [financialYear, setFinancialYear] = useState("2026-27");
  const data = useMemo(
    () => getFinancialSummaryData(financialYear),
    [financialYear],
  );
  const { summary } = data;

  return (
    <main className="w-full space-y-6 pb-8">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => navigate("/purchases")}
            className="-ml-3 mb-2 text-muted-foreground"
          >
            <ArrowLeft className="size-4" />
            Purchase orders
          </Button>
          <p className="text-sm font-medium text-primary">Purchase analytics</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Financial summary
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Track purchase spending, payments, and supplier performance across
            the selected financial year.
          </p>
        </div>

        <div className="w-full rounded-xl border bg-card p-3 lg:w-auto">
          <label
            htmlFor="financial-year"
            className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground"
          >
            <CalendarRange className="size-3.5" />
            Financial year
          </label>
          <Select value={financialYear} onValueChange={setFinancialYear}>
            <SelectTrigger id="financial-year" className="w-full lg:w-[190px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FINANCIAL_YEAR_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <SummaryCard
          icon={ShoppingCart}
          iconClassName="bg-primary/10 text-primary"
          value={summary.totalPurchases.toLocaleString("en-IN")}
          label="Purchase orders"
        />
        <SummaryCard
          icon={ReceiptIndianRupee}
          iconClassName="bg-sky-500/10 text-sky-600"
          value={formatCurrency(summary.totalBill)}
          label="Total billed"
        />
        <SummaryCard
          icon={IndianRupee}
          iconClassName="bg-emerald-500/10 text-emerald-600"
          value={formatCurrency(summary.totalPaid)}
          label="Total paid"
        />
        <SummaryCard
          icon={CircleDollarSign}
          iconClassName="bg-amber-500/10 text-amber-600"
          value={formatCurrency(summary.outstanding)}
          label="Outstanding"
        />
        <SummaryCard
          icon={TrendingUp}
          iconClassName="bg-violet-500/10 text-violet-600"
          value={formatCurrency(summary.averageOrderValue)}
          label="Average order value"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,.7fr)]">
        <Card className="min-w-0 gap-4 shadow-none">
          <CardHeader>
            <CardTitle>Monthly purchase movement</CardTitle>
            <CardDescription>
              Bill amount, payments, and outstanding balance from April to March.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto px-3 sm:px-6">
            <MonthlyPurchaseChart data={data.months} />
          </CardContent>
        </Card>

        <Card className="gap-4 shadow-none">
          <CardHeader>
            <CardTitle>Payment allocation</CardTitle>
            <CardDescription>
              {summary.paymentProgress.toFixed(1)}% of billed purchases paid.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentAllocationChart data={data.paymentAllocation} />
            <div className="mt-2 rounded-xl bg-muted/40 p-4 text-center">
              <p className="text-xs text-muted-foreground">Outstanding balance</p>
              <p className="mt-1 text-xl font-semibold text-amber-700">
                {formatCurrency(summary.outstanding)}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,.75fr)]">
        <Card className="gap-3 overflow-hidden shadow-none">
          <CardHeader>
            <CardTitle>Top suppliers by spend</CardTitle>
            <CardDescription>
              Suppliers contributing the highest purchase value in this year.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <SupplierSpendTable suppliers={data.suppliers} />
          </CardContent>
        </Card>

        <Card className="gap-4 shadow-none">
          <CardHeader>
            <CardTitle>Category breakdown</CardTitle>
            <CardDescription>
              Share of purchase value across product categories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CategorySpendTable
              categories={data.categories}
              total={summary.totalBill}
            />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default PurchaseFinancialSummary;
