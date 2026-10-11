import { Building2, CheckCircle2, ChevronDown, XCircle } from "lucide-react";
import { useSelector } from "react-redux";

import { selectCompanySummary } from "@Redux/company/company.selector";
import { Button } from "@shadcnComponent/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";
import { Separator } from "@shadcnComponent/separator";
import CompanySummaryItem from "@screenComponent/companies/company/header/companySummaryItem";

function CompanySummaryPopover() {
  const { totalCompanies, activeCompanies, inactiveCompanies } = useSelector(
    selectCompanySummary,
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between sm:w-auto">
          <span className="flex items-center gap-2">
            <Building2 className="size-4 text-primary" />
            Company summary
          </span>
          <span className="flex items-center gap-1.5">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-primary">
              {totalCompanies}
            </span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[min(22rem,calc(100vw-2rem))] p-0"
      >
        <div className="space-y-1 p-4">
          <h2 className="text-sm font-semibold">Company summary</h2>
          <p className="text-xs text-muted-foreground">
            Directory-wide totals from the latest company list.
          </p>
        </div>
        <Separator />
        <div className="grid gap-2 p-4">
          <CompanySummaryItem
            icon={Building2}
            iconClassName="bg-primary/10 text-primary"
            label="Total companies"
            value={totalCompanies}
          />
          <CompanySummaryItem
            icon={CheckCircle2}
            iconClassName="bg-emerald-500/10 text-emerald-600"
            label="Active companies"
            value={activeCompanies}
          />
          <CompanySummaryItem
            icon={XCircle}
            iconClassName="bg-destructive/10 text-destructive"
            label="Inactive companies"
            value={inactiveCompanies}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CompanySummaryPopover;
