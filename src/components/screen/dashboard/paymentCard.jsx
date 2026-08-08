import { CalendarCheck, Clock3, FileWarning, IndianRupee, WalletCards } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const _agingBuckets = [
  { label: "Not due", value: "₹15.2L", share: 55, color: "bg-emerald-500" },
  { label: "1–30 days", value: "₹7.8L", share: 28, color: "bg-amber-500" },
  { label: "30+ days", value: "₹4.7L", share: 17, color: "bg-destructive" },
];

function PaymentCard() {
  const received = 78;

  return (
    <Card className="h-full gap-5 shadow-none">
      <CardHeader className="px-5">
        <CardTitle className="text-base">Payment overview</CardTitle>
        <CardDescription>Current financial year</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-5 px-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Total invoiced</p>
            <p className="mt-1 text-2xl font-semibold">₹1.26Cr</p>
          </div>
          <Badge variant="success">+16.2%</Badge>
        </div>

        <div>
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-muted-foreground">Collection progress</span>
            <span className="font-medium">{received}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${received}%` }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t pt-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><IndianRupee className="size-3.5 text-emerald-600" />Received</div>
            <p className="mt-1.5 font-semibold">₹98.3L</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><WalletCards className="size-3.5 text-amber-600" />Pending</div>
            <p className="mt-1.5 font-semibold">₹27.7L</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-y py-2 text-center">
          <div>
            <Clock3 className="mx-auto size-4 text-amber-600" />
            <p className="mt-1.5 text-sm font-semibold">₹9.6L</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Due this week</p>
          </div>
          <div className="border-x">
            <FileWarning className="mx-auto size-4 text-destructive" />
            <p className="mt-1.5 text-sm font-semibold">₹4.7L</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Overdue</p>
          </div>
          <div>
            <CalendarCheck className="mx-auto size-4 text-primary" />
            <p className="mt-1.5 text-sm font-semibold">24 days</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Avg. collection</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentCard;
