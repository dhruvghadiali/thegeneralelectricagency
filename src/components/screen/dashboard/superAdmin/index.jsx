import { useMemo, useState } from "react";
import {
  Building2,
  ClipboardCheck,
  Clock3,
  Download,
  PackageCheck,
  ShoppingCart,
} from "lucide-react";

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

import SummaryCard from "@screenComponent/dashboard/shared/summaryCard";
import PaymentCard from "./paymentCard";
import PaymentAlerts from "./paymentAlerts";
import InventoryTable from "./inventoryTable";
import TopCompaniesCard from "./topCompaniesCard";
import PerformanceChart from "./performanceChart";
import DamagedStockTable from "./damagedStockTable";
import PageBreadcrumb from "@commonComponent/pageBreadcrumb";

// Remove when API will return the data
import { monthlyPerformance } from "./dashboard.data";

// Remove when API will return the data
const summaryCards = [
  {
    label: "Products sold",
    value: "3,647",
    change: "+12.4%",
    trend: "up",
    detail: "vs last year",
    icon: ShoppingCart,
  },
  {
    label: "Pending orders",
    value: "60",
    change: "+8.2%",
    trend: "down",
    detail: "needs attention",
    icon: Clock3,
  },
  {
    label: "Completed orders",
    value: "3,290",
    change: "+14.8%",
    trend: "up",
    detail: "vs last year",
    icon: ClipboardCheck,
  },
  {
    label: "New companies",
    value: "48",
    change: "+6.7%",
    trend: "up",
    detail: "this year",
    icon: Building2,
  },
];

function Dashboard() {
  const [period, setPeriod] = useState("year");
  const visibleData = useMemo(
    () =>
      period === "half" ? monthlyPerformance.slice(6) : monthlyPerformance,
    [period],
  );

  return (
    <main className="w-full space-y-6 pb-8">
      <PageBreadcrumb items={[{ label: "Dashboard" }]} />
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">
            Operations overview
          </p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Good afternoon, here’s your business at a glance.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sales, payments, customers, and warehouse status for FY 2026.
          </p>
        </div>
        <Button variant="outline" className="self-start">
          <Download className="size-4" />
          Export report
        </Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((item) => (
          <SummaryCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.65fr)_minmax(280px,.75fr)]">
        <div className="min-w-0 space-y-4">
          <Card className="min-w-0 gap-4 shadow-none">
            <CardHeader className="px-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle>Monthly performance</CardTitle>
                  <CardDescription className="mt-1.5">
                    Products sold and order fulfilment
                  </CardDescription>
                </div>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year">Full year</SelectItem>
                    <SelectItem value="half">Last 6 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto px-3 sm:px-5">
              <PerformanceChart data={visibleData} />
            </CardContent>
          </Card>
          <PaymentAlerts />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <PaymentCard />
          <TopCompaniesCard />
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Inventory health</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor stock availability and losses
            </p>
          </div>
          <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
            <PackageCheck className="size-4 text-emerald-600" />
            Last updated 5 min ago
          </div>
        </div>
        <div className="grid gap-4 2xl:grid-cols-[1.35fr_.85fr]">
          <InventoryTable />
          <DamagedStockTable />
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
