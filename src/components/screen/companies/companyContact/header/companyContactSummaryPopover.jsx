import {
  CheckCircle2,
  ChevronDown,
  ContactRound,
  XCircle,
} from "lucide-react";
import { useSelector } from "react-redux";

import { selectCompanyContactSummary } from "@Redux/companyContact/companyContact.selector";
import { Button } from "@shadcnComponent/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";
import { Separator } from "@shadcnComponent/separator";
import CompanySummaryItem from "@screenComponent/companies/company/header/companySummaryItem";

function CompanyContactSummaryPopover() {
  const { totalContacts, activeContacts, inactiveContacts } = useSelector(
    selectCompanyContactSummary,
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between sm:w-auto">
          <span className="flex items-center gap-2">
            <ContactRound className="size-4 text-primary" />
            Contact summary
          </span>
          <span className="flex items-center gap-1.5">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-primary">
              {totalContacts}
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
          <h2 className="text-sm font-semibold">Contact summary</h2>
          <p className="text-xs text-muted-foreground">
            Directory-wide totals from the latest contact person list.
          </p>
        </div>
        <Separator />
        <div className="grid gap-2 p-4">
          <CompanySummaryItem
            icon={ContactRound}
            iconClassName="bg-primary/10 text-primary"
            label="Total contacts"
            value={totalContacts}
          />
          <CompanySummaryItem
            icon={CheckCircle2}
            iconClassName="bg-emerald-500/10 text-emerald-600"
            label="Active contacts"
            value={activeContacts}
          />
          <CompanySummaryItem
            icon={XCircle}
            iconClassName="bg-destructive/10 text-destructive"
            label="Inactive contacts"
            value={inactiveContacts}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CompanyContactSummaryPopover;
