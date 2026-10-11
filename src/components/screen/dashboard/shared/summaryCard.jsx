import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@shadcnComponent/card";
import { cn } from "@/lib/utils";

function SummaryCard({ item }) {
  const Icon = item.icon;
  const positive = item.trend === "up";

  return (
    <Card className="gap-4 overflow-hidden py-5 shadow-none">
      <CardContent className="px-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{item.value}</p>
          </div>
          <div className="rounded-xl bg-primary/8 p-2.5 text-primary">
            <Icon className="size-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          <span
            className={cn(
              "flex items-center font-medium",
              positive ? "text-emerald-600" : "text-amber-600",
            )}
          >
            {positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {item.change}
          </span>
          <span className="text-muted-foreground">{item.detail}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
