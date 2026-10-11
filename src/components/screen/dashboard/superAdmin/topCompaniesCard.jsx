import { Building2 } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shadcnComponent/card";
import { topCompanies } from "./dashboard.data";

function TopCompaniesCard() {
  return (
    <Card className="gap-5 shadow-none">
      <CardHeader className="px-5">
        <div className="flex items-center justify-between">
          <div><CardTitle className="text-base">Top companies</CardTitle><CardDescription className="mt-1.5">By order value this year</CardDescription></div>
          <Building2 className="size-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-5">
        {topCompanies.map((company, index) => (
          <div key={company.name}>
            <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
              <div className="min-w-0"><span className="mr-2 text-xs text-muted-foreground">0{index + 1}</span><span className="font-medium">{company.name}</span></div>
              <span className="shrink-0 font-semibold">{company.amount}</span>
            </div>
            <div className="ml-7 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary/70" style={{ width: `${company.share}%` }} /></div>
              <span className="w-14 text-right text-[11px] text-muted-foreground">{company.orders} orders</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default TopCompaniesCard;
