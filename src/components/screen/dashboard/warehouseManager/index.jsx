import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpFromLine,
  Boxes,
  CheckCircle2,
  ClipboardList,
  PackageCheck,
  PackageOpen,
  ScanLine,
  Truck,
} from "lucide-react";
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

const warehouseSummary = [
  { label: "Units in stock", value: "8,420", change: "+186", trend: "up", detail: "received today", icon: Boxes },
  { label: "Orders to dispatch", value: "34", change: "8 urgent", trend: "down", detail: "before 2 PM", icon: Truck },
  { label: "Low-stock items", value: "12", change: "3 new", trend: "down", detail: "need reorder", icon: AlertTriangle },
  { label: "Completed today", value: "68", change: "+18%", trend: "up", detail: "vs yesterday", icon: PackageCheck },
];

const dispatchQueue = [
  { id: "ORD-2481", company: "Apex Engineering", items: "8 items", time: "10:30 AM", status: "Picking", variant: "secondary" },
  { id: "ORD-2478", company: "Shreeji Textiles", items: "3 items", time: "11:15 AM", status: "Packed", variant: "success" },
  { id: "ORD-2475", company: "Orbit Industries", items: "12 items", time: "12:00 PM", status: "Pending", variant: "warning" },
  { id: "ORD-2472", company: "Mahavir Automation", items: "5 items", time: "1:30 PM", status: "Pending", variant: "outline" },
];

const zones = [
  { name: "Motors", code: "Zone A", used: 84, note: "1,284 units", tone: "bg-amber-500" },
  { name: "Pumps", code: "Zone B", used: 62, note: "946 units", tone: "bg-sky-500" },
  { name: "Drives", code: "Zone C", used: 47, note: "512 units", tone: "bg-indigo-500" },
  { name: "Spares", code: "Zone D", used: 71, note: "2,106 units", tone: "bg-emerald-500" },
];

const movements = [
  { title: "CG DMB Pump", detail: "24 units received · PO-1098", time: "12 min ago", type: "in", icon: ArrowDownToLine },
  { title: "Premium Gearbox", detail: "8 units dispatched · ORD-2469", time: "28 min ago", type: "out", icon: ArrowUpFromLine },
  { title: "CG Drives", detail: "16 units moved to Zone C", time: "45 min ago", type: "move", icon: ScanLine },
];

function WarehouseDashboard() {
  return (
    <main className="w-full space-y-6 pb-8">
      <PageBreadcrumb items={[{ label: "Dashboard" }]} />

      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
            <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-emerald-600" /></span>
            Warehouse operations live
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Today&apos;s inventory flow</h2>
          <p className="mt-2 text-sm text-muted-foreground">Monitor receiving, picking, packing, and dispatch from one workspace.</p>
        </div>
        <Button asChild className="self-start">
          <Link to="/stocks"><ScanLine className="size-4" />Open stock register</Link>
        </Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {warehouseSummary.map((item) => <SummaryCard key={item.label} item={item} />)}
      </section>

      <section className="grid gap-4 2xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,.8fr)]">
        <Card className="gap-4 shadow-none">
          <CardHeader className="flex-row items-start justify-between px-5">
            <div><CardTitle>Dispatch queue</CardTitle><CardDescription className="mt-1.5">Orders scheduled for today</CardDescription></div>
            <Badge variant="warning">8 urgent</Badge>
          </CardHeader>
          <CardContent className="px-3 sm:px-5">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-sm">
                <thead><tr className="border-b text-left text-xs text-muted-foreground"><th className="px-2 pb-3 font-medium">Order</th><th className="px-2 pb-3 font-medium">Company</th><th className="px-2 pb-3 font-medium">Quantity</th><th className="px-2 pb-3 font-medium">Dispatch by</th><th className="px-2 pb-3 text-right font-medium">Status</th></tr></thead>
                <tbody>{dispatchQueue.map((order) => <tr key={order.id} className="border-b last:border-0"><td className="px-2 py-4 font-medium">{order.id}</td><td className="px-2 py-4">{order.company}</td><td className="px-2 py-4 text-muted-foreground">{order.items}</td><td className="px-2 py-4 text-muted-foreground">{order.time}</td><td className="px-2 py-4 text-right"><Badge variant={order.variant}>{order.status}</Badge></td></tr>)}</tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="gap-4 shadow-none">
          <CardHeader className="px-5"><CardTitle>Storage capacity</CardTitle><CardDescription className="mt-1.5">Utilisation by warehouse zone</CardDescription></CardHeader>
          <CardContent className="space-y-5 px-5">
            {zones.map((zone) => <div key={zone.code}><div className="mb-2 flex items-end justify-between gap-3"><div><p className="text-sm font-medium">{zone.name} <span className="ml-1 text-xs font-normal text-muted-foreground">{zone.code}</span></p><p className="mt-0.5 text-xs text-muted-foreground">{zone.note}</p></div><span className="text-sm font-semibold">{zone.used}%</span></div><div className="h-2 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${zone.tone}`} style={{ width: `${zone.used}%` }} /></div></div>)}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(300px,.65fr)]">
        <Card className="gap-4 shadow-none">
          <CardHeader className="px-5"><CardTitle>Recent stock movement</CardTitle><CardDescription className="mt-1.5">Latest activity across all zones</CardDescription></CardHeader>
          <CardContent className="space-y-1 px-3 sm:px-5">
            {movements.map((movement) => { const Icon = movement.icon; return <div key={movement.title} className="flex items-center gap-3 rounded-xl px-2 py-3 hover:bg-muted/70"><div className={`rounded-lg p-2 ${movement.type === "in" ? "bg-emerald-500/10 text-emerald-700" : movement.type === "out" ? "bg-amber-500/10 text-amber-700" : "bg-primary/8 text-primary"}`}><Icon className="size-4" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{movement.title}</p><p className="mt-0.5 truncate text-xs text-muted-foreground">{movement.detail}</p></div><span className="hidden text-xs text-muted-foreground sm:block">{movement.time}</span></div>; })}
          </CardContent>
        </Card>

        <Card className="gap-4 border-amber-300/70 bg-amber-50/50 shadow-none">
          <CardHeader className="px-5"><div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-700"><PackageOpen className="size-5" /></div><CardTitle>Reorder attention</CardTitle><CardDescription className="mt-1.5">12 products are below their minimum stock level.</CardDescription></CardHeader>
          <CardContent className="px-5"><div className="mb-5 flex items-center gap-2 text-sm text-amber-800"><CheckCircle2 className="size-4" />3 purchase requests already raised</div><Button asChild variant="outline" className="w-full bg-white"><Link to="/stocks"><ClipboardList className="size-4" />Review low stock<ArrowRight className="ml-auto size-4" /></Link></Button></CardContent>
        </Card>
      </section>
    </main>
  );
}

export default WarehouseDashboard;
