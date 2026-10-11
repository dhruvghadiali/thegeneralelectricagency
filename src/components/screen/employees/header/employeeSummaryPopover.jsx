import {
  BriefcaseBusiness,
  ChevronDown,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";
import { useSelector } from "react-redux";

import { selectEmployeeSummary } from "@Redux/employee/employee.selector";
import { Button } from "@shadcnComponent/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";
import { Separator } from "@shadcnComponent/separator";
import EmployeeSummaryItem from "@screenComponent/employees/header/employeeSummaryItem";

/** Compact access to the directory-wide summary returned by the list API. */
function EmployeeSummaryPopover() {
  const {
    totalEmployees,
    activeEmployees,
    activeWarehouseManagers,
  } = useSelector(selectEmployeeSummary);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between sm:w-auto">
          <span className="flex items-center gap-2">
            <UsersRound className="size-4 text-primary" />
            User summary
          </span>
          <span className="flex items-center gap-1.5">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-primary">
              {totalEmployees}
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
          <h2 className="text-sm font-semibold">User summary</h2>
          <p className="text-xs text-muted-foreground">
            Directory-wide totals from the latest user list.
          </p>
        </div>
        <Separator />
        <div className="grid gap-2 p-4">
          <EmployeeSummaryItem
            icon={UsersRound}
            label="Total users"
            value={totalEmployees}
          />
          <EmployeeSummaryItem
            icon={UserRoundCheck}
            label="Employees"
            value={activeEmployees}
          />
          <EmployeeSummaryItem
            icon={BriefcaseBusiness}
            label="Warehouse managers"
            value={activeWarehouseManagers}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default EmployeeSummaryPopover;
