import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  PackageSearch,
  PhoneCall,
  Plus,
  ShoppingBag,
  Target,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import PageBreadcrumb from "@commonComponent/pageBreadcrumb";
import SummaryCard from "@screenComponent/dashboard/shared/summaryCard";
import { Badge } from "@shadcnComponent/badge";
import { Button } from "@shadcnComponent/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

const employeeSummary = [
  {
    label: "My active leads",
    value: "18",
    change: "+3",
    trend: "up",
    detail: "this week",
    icon: Target,
  },
  {
    label: "Follow-ups today",
    value: "7",
    change: "2 due",
    trend: "down",
    detail: "before noon",
    icon: PhoneCall,
  },
  {
    label: "Orders this month",
    value: "42",
    change: "+11.2%",
    trend: "up",
    detail: "vs last month",
    icon: ShoppingBag,
  },
  {
    label: "Target achieved",
    value: "76%",
    change: "+8%",
    trend: "up",
    detail: "this month",
    icon: CheckCircle2,
  },
];

const tasks = [
  {
    title: "Call Apex Engineering",
    meta: "Renewal discussion · 10:30 AM",
    status: "Due soon",
    variant: "warning",
    icon: PhoneCall,
  },
  {
    title: "Send pump quotation",
    meta: "Shreeji Textiles · 12:00 PM",
    status: "In progress",
    variant: "secondary",
    icon: PackageSearch,
  },
  {
    title: "Company site visit",
    meta: "Orbit Industries · 3:30 PM",
    status: "Scheduled",
    variant: "outline",
    icon: CalendarDays,
  },
  {
    title: "Update order notes",
    meta: "Mahavir Automation · End of day",
    status: "Pending",
    variant: "outline",
    icon: Clock3,
  },
];

const pipeline = [
  { label: "New", value: 8, width: "32%", color: "bg-sky-500" },
  { label: "Contacted", value: 6, width: "24%", color: "bg-indigo-500" },
  { label: "Proposal", value: 7, width: "28%", color: "bg-amber-500" },
  { label: "Won", value: 4, width: "16%", color: "bg-emerald-500" },
];

function EmployeeDashboard() {
  const username = useSelector((state) => state.auth.username);
  const displayName = username?.split(/[.@_-]/)[0] || "there";

  return (
    <main className="w-full space-y-6 pb-8">
      <PageBreadcrumb items={[{ label: "Dashboard" }]} />

      <section className="overflow-hidden rounded-2xl bg-primary px-5 py-6 text-primary-foreground sm:px-7">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-primary-foreground/70">My workspace</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome back, <span className="capitalize">{displayName}</span>.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-primary-foreground/75">
              You have 7 follow-ups and 2 priority customer requests on your list today.
            </p>
          </div>
          <Button asChild variant="secondary" className="self-start bg-white text-primary hover:bg-white/90">
            <Link to="/companies/new">
              <Plus className="size-4" />
              Add company
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {employeeSummary.map((item) => (
          <SummaryCard key={item.label} item={item} />
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,.85fr)]">
        <Card className="gap-4 shadow-none">
          <CardHeader className="flex-row items-start justify-between px-5">
            <div>
              <CardTitle>Today&apos;s priorities</CardTitle>
              <CardDescription className="mt-1.5">Your scheduled customer work</CardDescription>
            </div>
            <Badge variant="outline">4 tasks</Badge>
          </CardHeader>
          <CardContent className="space-y-1 px-3 sm:px-5">
            {tasks.map((task) => {
              const Icon = task.icon;
              return (
                <div
                  key={task.title}
                  className="flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-muted/70"
                >
                  <div className="rounded-lg bg-primary/8 p-2 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{task.title}</p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">{task.meta}</p>
                  </div>
                  <Badge variant={task.variant} className="hidden sm:inline-flex">{task.status}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="gap-4 shadow-none">
          <CardHeader className="px-5">
            <CardTitle>My sales pipeline</CardTitle>
            <CardDescription className="mt-1.5">25 opportunities this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 px-5">
            {pipeline.map((stage) => (
              <div key={stage.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{stage.label}</span>
                  <span className="font-semibold">{stage.value}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full ${stage.color}`} style={{ width: stage.width }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <Link to="/companies" className="group rounded-xl border bg-card p-5 transition-colors hover:border-primary/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/8 p-2.5 text-primary"><Building2 className="size-5" /></div>
              <div><p className="font-medium">Manage companies</p><p className="mt-0.5 text-sm text-muted-foreground">View customers and add follow-ups</p></div>
            </div>
            <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
        <Link to="/products" className="group rounded-xl border bg-card p-5 transition-colors hover:border-primary/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-500/10 p-2.5 text-amber-700"><CircleAlert className="size-5" /></div>
              <div><p className="font-medium">Check product availability</p><p className="mt-0.5 text-sm text-muted-foreground">3 requested items have low stock</p></div>
            </div>
            <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </div>
        </Link>
      </section>
    </main>
  );
}

export default EmployeeDashboard;
